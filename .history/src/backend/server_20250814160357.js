const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./db");

const Announcement = require("./models/Announcement");
const HomeAndGarden = require("./models/HomeAndGarden");
const Electronika = require("./models/Electronika");
const Accessory = require("./models/Acsesuar");
const RealEstate = require("./models/RealEstate");
const HouseHold = require("./models/Household");
const Phone = require("./models/Phone");
const Clothing = require("./models/Clothing");
const Jewelry = require("./models/Jewelry");

const app = express();
// const PORT = 5000;



const PORT = process.env.PORT || 5000;

connectDB(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log("Server running on", PORT)))
  .catch((e) => {
    console.error("DB error", e);
    process.exit(1);
  });

// 🔌 MongoDB-ə qoşu
connectDB();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

// const upload = multer({ storage });

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024, files: 20 },
});

app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/auth", require("../backend/routes/auth"));
app.use("/api/announcements", require("../backend/routes/announcements"));



async function idGenerator() {
  let unique = false;
  let newId;

  while(!unique) {
    newId = Math.floor(10000 + Math.random() * 90000);
    const exists = await Announcement.findOne({ id: newId });
    if (!exists) unique = true;
  }
  return newId;
}


app.get("/api/cars/:id", async (req, res) => {
  try {
    const car = await Announcement.findOne({ id: Number(req.params.id) });
    if (!car) return res.status(404).json({ message: "Elan tapılmadı" });
    res.json(car); // 200 status ilə qaytarır
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server xətası" });
  }
});

// Bütün elanları gətir
app.get("/api/cars", async (req, res) => {

  try {
    const cars = await Announcement.find().sort({ data: -1 });
    res.json(cars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});





app.post("/api/cars", upload.array("images", 20 ), async (req, res) => {
  const newId = await idGenerator();
  try {
     const { id } = req.params;
    const {
    category,
    ban_type,
    brand,
    model,
    year,
    price,
    location,
    images,
    km,
    motor,
    transmission,
    liked,
    favorite,
    engine,
    data,
    description, } = req.body;
    const contact = {
      name: req.body["contact.name"],
      email: req.body["contact.email"],
      phone: req.body["contact.phone"],
  }
 const imageUrls = req.files.map(file => `http://localhost:${PORT}/uploads/${file.filename}`);

  const newAnn = new Announcement({
      id: newId,
      ban_type,
      category,
      brand,
      model,
      year,
      price,
      location,
      images,
      km,
      motor,
      transmission,
      engine,
      contact,
      liked: liked === "true",
      favorite: favorite === "true",
      data : data ? new Date(data) : new Date(),
      description,
      contact: {
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
      },
   images: imageUrls,
      // image: req.file ? `http://localhost:${PORT}/uploads/${req.file.filename}` : "",
})

await newAnn.save();
res.status(201).json(newAnn);
} catch (err) {
  res.status(500).json({error: err.message});
}
});

app.put("/api/cars/:id", upload.array("images", 20), async (req, res) => {
   try {
    const { id } = req.params;
    const {
         category,
         ban_type,
    brand,
    model,
    year,
    price,
    location,
    images,
    km,
    motor,
    transmission,
    liked,
    favorite,
    engine,
    data,
    description,
    } = req.body;
    const contact = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    };
 let imageUrls = [];

    if (req.files && req.files.length > 0) {
      imageUrls = req.files.map(file => `http://localhost:${PORT}/uploads/${file.filename}`);
    }

    const updatedFields = {
      id:  Date.now(), 
        category,
      model,
      ban_type,
      year,
      brand,
      price,
      location,
      images,
      km,
      motor,
      transmission,
      description,
      engine,
      contact: {
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
      },
      liked: liked === "true",
      favorite: favorite === "true",
      data: data ? new Date(data) : new Date(),
         images: req.files
    ? req.files.map(file => `http://localhost:${PORT}/uploads/${file.filename}`)
    : [],
    };





  
     if (imageUrls.length > 0) {
      updatedFields.images = imageUrls; // şəkilləri yenilə
    }

    

    if (req.file) {
      updatedFields.images = `http://localhost:${PORT}/uploads/${req.files.filename}`;
    }
    const update = await Announcement.findByIdAndUpdate(id, updatedFields, { new: true});
    res.json(update);
  } catch (err) {
    res.status(500).json({ error: err.message})
  }
});


app.delete("/api/cars/:id", async (req, res) => {
  try {

    const { id } = req.params;
  await Announcement.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch  (err){
    res.status(500).json({ error: err.message})
  }
});



app.patch("/api/cars/:id/like", async (req, res) => {
  try {
      const car = await Announcement.findById(req.params.id);
      car.liked = !car.liked;
      await car.save();
      res.json(car);
  } catch (err) {
    res.status(500).json({ error: err.message})
  }
});


app.patch("/api/cars/:id/favorite", async (req, res) => {
  try {
    const car = await Announcement.findById(req.params.id); 
    car.favorite = !car.favorite;
    await car.save();
    res.json(car);
  }catch (err) {
    res.status(500).json({error: err.message})
  }
});







app.post("/api/homGarden", upload.array("images", 20), async (req, res) => {
    const newId = await idGenerator();
  try {
     const { id } = req.params;
    const {
      model,
      category,
      title,
      description,
      brand,
      price,
      location,
      liked,
      favorite,
      data,
      images,
    } = req.body;
    const contact = {
      name: req.body["contact.name"],
      email: req.body["contact.email"],
      phone: req.body["contact.phone"],
    };
  const imageUrls = req.files.map(file => `http://localhost:${PORT}/uploads/${file.filename}`);
    
    const newHome = new HomeAndGarden({
      id: newId,
      model,
      category,
      title,
      description,
      brand,
      price,
      location,
      contact,
      liked: liked === "true",
      favorite: favorite === "true",
      data: data ? new Date(data) : new Date(),
       images: imageUrls,
    });

    await newHome.save();
    res.status(201).json(newHome);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✏️ Elan yenilə (PUT)
app.put("/api/homGarden/:id", upload.array("images", 20), async (req, res) => {
  try {
    const { id } = req.params;
    const {
      model,
      category,
      title,
      description,
      brand,
      price,
      location,
      liked,
      favorite,
      data,
    } = req.body;
    const contact = {
      name: req.body["contact.name"],
      email: req.body["contact.email"],
      phone: req.body["contact.phone"],


    };

     let imageUrls = [];

    if (req.files && req.files.length > 0) {
      imageUrls = req.files.map(file => `http://localhost:${PORT}/uploads/${file.filename}`);
    }

    const updatedFields = {
      id: Date.now(),
      model,
      category,
      title,
      description,
      brand,
      price,
      location,
      contact,
      liked: liked === "true",
      favorite: favorite === "true",
      data: data ? new Date(data) : new Date(),
      images: req.files
  ? req.files.map(file => `http://localhost:${PORT}/uploads/${file.filename}`)
  : [],
    };
     if (imageUrls.length > 0) {
      updatedFields.images = imageUrls; // şəkilləri yenilə
    }

    

    if (req.file) {
      updatedFields.images = `http://localhost:${PORT}/uploads/${req.files.filename}`;
    }

    const updated = await HomeAndGarden.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/homGarden", async (req, res) => {
  try {
     const { id } = req.params;
    const items = await HomeAndGarden.find().sort({ data: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/homGarden/:id", async (req, res) => {
  try {
     const { id } = req.params;
    const item = await HomeAndGarden.findById(req.params.id);
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/homGarden/:id", async (req, res) => {
  try {
     const { id } = req.params;
    await HomeAndGarden.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch("/api/homGarden/:id/like", async (req, res) => {
  try {
     const { id } = req.params;
    const item = await HomeAndGarden.findById(req.params.id);
    item.liked = !item.liked;
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch("/api/homGarden/:id/favorite", async (req, res) => {
  try {
     const { id } = req.params;
    const item = await HomeAndGarden.findById(req.params.id);
    item.favorite = !item.favorite;
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Bütün elanları götür
app.get("/api/electronika", async (req, res) => {
  try {
    const items = await Electronika.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Yeni elan əlavə et
// `images` field-lə çoxlu fayl qəbul edir
app.post("/api/electronika", upload.array("images", 10), async (req, res) => {
    const newId = await idGenerator();
  try {
    // Yüklənmiş şəkillərin server URL-lərini qur
    const imageUrls = req.files.map(
      (file) => `http://localhost:${PORT}/uploads/${file.filename}`
    );

    // Contact datanı formdan gələn contact.*-dən qur
    const contact = {
      name: req.body["contact.name"] || "",
      email: req.body["contact.email"] || "",
      phone: req.body["contact.phone"] || "",
    };

    // Yeni elan
    const newPost = new Electronika({
      id: newId,
      category: req.body.category,
      title: req.body.title,
      brand: req.body.brand,
      model: req.body.model,
      price: req.body.price,
      location: req.body.location,
      description: req.body.description,
      images: imageUrls,
      contact,
      liked: false,
      favorite: false,
      data: req.body.data ? new Date(req.body.data) : Date.now(),
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Elanı redaktə et (PUT)
// Şəkilləri yeniləmək üçün eyni post ilə şəkillər də göndərilə bilər
app.put(
  "/api/electronika/:id",
  upload.array("images", 10),
  async (req, res) => {
    try {
      const post = await Electronika.findById(req.params.id);
      if (!post) return res.status(404).json({ message: "Post tapılmadı" });

      // Yüklənmiş yeni şəkillər varsa əlavə et
      if (req.files.length > 0) {
        const imageUrls = req.files.map(
          (file) => `http://localhost:${PORT}/uploads/${file.filename}`
        );
        post.images = imageUrls;
      }

      post.title = req.body.title || post.title;
      post.brand = req.body.brand || post.brand;
      post.model = req.body.model || post.model;
      post.price = req.body.price || post.price;
      post.location = req.body.location || post.location;
      post.description = req.body.description || post.description;

      post.contact = {
        name: req.body["contact.name"] || post.contact.name,
        email: req.body["contact.email"] || post.contact.email,
        phone: req.body["contact.phone"] || post.contact.phone,
      };

      post.data = req.body.data ? new Date(req.body.data) : post.data;

      await post.save();
      res.json(post);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

// Elanı sil
app.delete("/api/electronika/:id", async (req, res) => {
  try {
    const post = await Electronika.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post tapılmadı" });

    // Burada istəsən faylları serverdən silə bilərsən (isteğe bağlı)

    await post.remove();
    res.json({ message: "Post silindi" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Like toggle
app.patch("/api/electronika/:id/like", async (req, res) => {
  try {
    const post = await Electronika.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post tapılmadı" });

    post.liked = !post.liked;
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Favorite toggle
app.patch("/api/electronika/:id/favorite", async (req, res) => {
  try {
    const post = await Electronika.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post tapılmadı" });

    post.favorite = !post.favorite;
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/electronika/:id", async (req, res) => {
  try {
    const item = await Electronika.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Elan tapılmadı" });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 📌 Bütün elanları gətir
app.get("/api/accessories", async (req, res) => {
  try {
    const accessories = await Accessory.find();
    res.json(accessories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/accessories/:id", async (req, res) => {
  try {
    const accessory = await Accessory.findById(req.params.id);
    if (!accessory) return res.status(404).json({ message: "Elan tapılmadı" });
    res.json(accessory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Yeni elan əlavə et
app.post("/api/accessories", upload.array("images", 10), async (req, res) => {
    const newId = await idGenerator();
  try {
    const images = req.files.map(
      (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
    );
    const accessory = new Accessory({
      id: newId,
      ...req.body,
      images,
      contact: {
        name: req.body["contact.name"],
        email: req.body["contact.email"],
        phone: req.body["contact.phone"],
      },
    });
    await accessory.save();
    res.status(201).json(accessory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 📌 Elanı yenilə
app.put(
  "/api/accessories/:id",
  upload.array("images", 10),
  async (req, res) => {
    try {
      let images = [];
      if (req.files.length > 0) {
        images = req.files.map(
          (file) =>
            `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
        );
      }

      const updated = await Accessory.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
          ...(images.length > 0 && { images }),
          contact: {
            name: req.body["contact.name"],
            email: req.body["contact.email"],
            phone: req.body["contact.phone"],
          },
        },
        { new: true }
      );
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

// 📌 Elanı sil
app.delete("/api/accessories/:id", async (req, res) => {
  try {
    await Accessory.findByIdAndDelete(req.params.id);
    res.json({ message: "Accessory silindi" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Favorit dəyiş
app.patch("/api/accessories/:id/favorite", async (req, res) => {
  try {
    const accessory = await Accessory.findById(req.params.id);
    accessory.favorite = !accessory.favorite;
    await accessory.save();
    res.json(accessory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Like dəyiş
app.patch("/api/accessories/:id/like", async (req, res) => {
  try {
    const accessory = await Accessory.findById(req.params.id);
    accessory.liked = !accessory.liked;
    await accessory.save();
    res.json(accessory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Yüklənmiş şəkili silmək
app.delete("/api/accessories/images/:imageName", async (req, res) => {
  try {
    const imageName = req.params.imageName;
    await Accessory.updateMany(
      {},
      { $pull: { images: { $regex: imageName } } }
    );
    res.json({ message: "Şəkil silindi" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});












// Like toggle
app.patch("/api/realEstate/:id/like", async (req, res) => {
  try {
    const post = await RealEstate.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post tapılmadı" });

    post.liked = !post.liked;
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Favorite toggle
app.patch("/api/realEstate/:id/favorite", async (req, res) => {
  try {
    const post = await RealEstate.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post tapılmadı" });

    post.favorite = !post.favorite;
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/realEstate/:id", async (req, res) => {
  try {
    const item = await RealEstate.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Elan tapılmadı" });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 📌 Bütün elanları gətir
app.get("/api/realEstate", async (req, res) => {
  try {
    const realEstatePost = await RealEstate.find();
    res.json(realEstatePost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Yeni elan əlavə et
app.post("/api/realEstate", upload.array("images", 20), async (req, res) => {
    const newId = await idGenerator();
  try {
    const images = req.files.map(
      (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
    );
    const realEstatePost = new RealEstate({
      id: newId,
      ...req.body,
      images,
      contact: {
        name: req.body["contact.name"],
        email: req.body["contact.email"],
        phone: req.body["contact.phone"],
      },
    });
    await realEstatePost.save();
    res.status(201).json(realEstatePost);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 📌 Elanı yenilə
app.put(
  "/api/RealEstate/:id",
  upload.array("images", 10),
  async (req, res) => {
    try {
      let images = [];
      if (req.files.length > 0) {
        images = req.files.map(
          (file) =>
            `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
        );
      }

      const updated = await RealEstate.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
          ...(images.length > 0 && { images }),
          contact: {
            name: req.body["contact.name"],
            email: req.body["contact.email"],
            phone: req.body["contact.phone"],
          },
        },
        { new: true }
      );
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

// 📌 Elanı sil
app.delete("/api/realEstate/:id", async (req, res) => {
  try {
    await RealEstate.findByIdAndDelete(req.params.id);
    res.json({ message: "Elan silindi" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Favorit dəyiş
app.patch("/api/RealEstate/:id/favorite", async (req, res) => {
  try {
    const realEstatePost = await RealEstate.findById(req.params.id);
    realEstatePost.favorite = !realEstatePost.favorite;
    await realEstatePost.save();
    res.json(realEstatePost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Like dəyiş
app.patch("/api/RealEstate/:id/like", async (req, res) => {
  try {
    const realEstatePost = await RealEstate.findById(req.params.id);
    realEstatePost.liked = !realEstatePost.liked;
    await realEstatePost.save();
    res.json(realEstatePost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Yüklənmiş şəkili silmək
app.delete("/api/realEstatePost/images/:imageName", async (req, res) => {
  try {
    const imageName = req.params.imageName;
    await RealEstate.updateMany(
      {},
      { $pull: { images: { $regex: imageName } } }
    );
    res.json({ message: "Şəkil silindi" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});





app.get("/api/Household", async (req, res) => {
  try {
    const householdPosts = await HouseHold.find();
    res.json(householdPosts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ID-yə görə elan gətir
app.get("/api/Household/:id", async (req, res) => {
  try {
    const item = await HouseHold.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Elan tapılmadı" });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Yeni elan əlavə et
app.post("/api/Household", upload.array("images", 10), async (req, res) => {
    const newId = await idGenerator();
  try {
    const images = req.files.map(
      (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
    );

    // contact sahəsini req.body-dən ayrıca götür
    const contact = {
      name: req.body["contact.name"] || "",
      email: req.body["contact.email"] || "",
      phone: req.body["contact.phone"] || "",
    };

    const newHouseHold = new HouseHold({
      id: newId,
      ...req.body,
      images,
      contact,
      data: req.body.data ? new Date(req.body.data) : new Date(),
    });

    await newHouseHold.save();
    res.status(201).json(newHouseHold);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Elanı yenilə
app.put("/api/Household/:id", upload.array("images", 10), async (req, res) => {
  try {
    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map(
        (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
      );
    }

    const contact = {
      name: req.body["contact.name"] || "",
      email: req.body["contact.email"] || "",
      phone: req.body["contact.phone"] || "",
    };

    const updated = await HouseHold.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        ...(images.length > 0 && { images }),
        contact,
        data: req.body.data ? new Date(req.body.data) : new Date(),
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Elan tapılmadı" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Elanı sil
app.delete("/api/Household/:id", async (req, res) => {
  try {
    const deleted = await HouseHold.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Elan tapılmadı" });

    // Lazım gələrsə burada əlaqəli şəkilləri də serverdən silə bilərsən

    res.json({ message: "Elan silindi" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Like toggle
app.patch("/api/Household/:id/like", async (req, res) => {
  try {
    const post = await HouseHold.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Elan tapılmadı" });

    post.liked = !post.liked;
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Favorite toggle
app.patch("/api/Household/:id/favorite", async (req, res) => {
  try {
    const post = await HouseHold.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Elan tapılmadı" });

    post.favorite = !post.favorite;
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Şəkil silmək (hem DB-dən images massivindən, hem serverdən faylı silir)
app.delete("/api/Household/images/:imageName", async (req, res) => {
  try {
    const imageName = req.params.imageName;

    // 1. DB-də images massivindən URL-ə uyğun şəkili sil
    await HouseHold.updateMany(
      { images: { $regex: imageName } },
      { $pull: { images: { $regex: imageName } } }
    );

   
  
    res.json({ message: "Şəkil silindi" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});








// -----------------------------------------

app.get("/api/Phone", async (req, res) => {
  try {
    const PhonePosts = await Phone.find();
    res.json(PhonePosts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ID-yə görə elan gətir
app.get("/api/Phone/:id", async (req, res) => {
  try {
    const item = await Phone.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Elan tapılmadı" });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Yeni elan əlavə et
app.post("/api/Phone", upload.array("images", 10), async (req, res) => {
    const newId = await idGenerator();
  try {
    const images = req.files.map(
      (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
    );

    // contact sahəsini req.body-dən ayrıca götür
    const contact = {
      name: req.body["contact.name"] || "",
      email: req.body["contact.email"] || "",
      phone: req.body["contact.phone"] || "",
    };

    const newPhone = new Phone({
      id: newId,
      ...req.body,
      images,
      contact,
      data: req.body.data ? new Date(req.body.data) : new Date(),
    });

    await newPhone.save();
    res.status(201).json(newPhone);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Elanı yenilə
app.put("/api/Phone/:id", upload.array("images", 10), async (req, res) => {
  try {
    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map(
        (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
      );
    }

    const contact = {
      name: req.body["contact.name"] || "",
      email: req.body["contact.email"] || "",
      phone: req.body["contact.phone"] || "",
    };

    const updated = await Phone.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        ...(images.length > 0 && { images }),
        contact,
        data: req.body.data ? new Date(req.body.data) : new Date(),
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Elan tapılmadı" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Elanı sil
app.delete("/api/Phone/:id", async (req, res) => {
  try {
    const deleted = await Phone.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Elan tapılmadı" });

    // Lazım gələrsə burada əlaqəli şəkilləri də serverdən silə bilərsən

    res.json({ message: "Elan silindi" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Like toggle
app.patch("/api/Phone/:id/like", async (req, res) => {
  try {
    const post = await Phone.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Elan tapılmadı" });

    post.liked = !post.liked;
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Favorite toggle
app.patch("/api/Phone/:id/favorite", async (req, res) => {
  try {
    const post = await Phone.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Elan tapılmadı" });

    post.favorite = !post.favorite;
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Şəkil silmək (hem DB-dən images massivindən, hem serverdən faylı silir)
app.delete("/api/Phone/images/:imageName", async (req, res) => {
  try {
    const imageName = req.params.imageName;

    // 1. DB-də images massivindən URL-ə uyğun şəkili sil
    await Phone.updateMany(
      { images: { $regex: imageName } },
      { $pull: { images: { $regex: imageName } } }
    );

   
  
    res.json({ message: "Şəkil silindi" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ---------------------------------------




app.get("/api/Clothing", async (req, res) => {
  try {
    const ClothingPosts = await Clothing.find();
    res.json(ClothingPosts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ID-yə görə elan gətir
app.get("/api/Clothing/:id", async (req, res) => {
  try {
    const item = await Clothing.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Elan tapılmadı" });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Yeni elan əlavə et
app.post("/api/Clothing", upload.array("images", 10), async (req, res) => {
    const newId = await idGenerator();
  try {
    const images = req.files.map(
      (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
    );

    // contact sahəsini req.body-dən ayrıca götür
    const contact = {
      name: req.body["contact.name"] || "",
      email: req.body["contact.email"] || "",
      phone: req.body["contact.phone"] || "",
    };

    const newClothing = new Clothing({
      id: newId,
      ...req.body,
      images,
      contact,
      data: req.body.data ? new Date(req.body.data) : new Date(),
    });

    await newClothing.save();
    res.status(201).json(newClothing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Elanı yenilə
app.put("/api/Clothing/:id", upload.array("images", 10), async (req, res) => {
  try {
    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map(
        (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
      );
    }

    const contact = {
      name: req.body["contact.name"] || "",
      email: req.body["contact.email"] || "",
      phone: req.body["contact.phone"] || "",
    };

    const updated = await Clothing.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        ...(images.length > 0 && { images }),
        contact,
        data: req.body.data ? new Date(req.body.data) : new Date(),
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Elan tapılmadı" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Elanı sil
app.delete("/api/Clothing/:id", async (req, res) => {
  try {
    const deleted = await Clothing.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Elan tapılmadı" });

    // Lazım gələrsə burada əlaqəli şəkilləri də serverdən silə bilərsən

    res.json({ message: "Elan silindi" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Like toggle
app.patch("/api/Clothing/:id/like", async (req, res) => {
  try {
    const post = await Clothing.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Elan tapılmadı" });

    post.liked = !post.liked;
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Favorite toggle
app.patch("/api/Clothing/:id/favorite", async (req, res) => {
  try {
    const post = await Clothing.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Elan tapılmadı" });

    post.favorite = !post.favorite;
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Şəkil silmək (hem DB-dən images massivindən, hem serverdən faylı silir)
app.delete("/api/Clothing/images/:imageName", async (req, res) => {
  try {
    const imageName = req.params.imageName;

    // 1. DB-də images massivindən URL-ə uyğun şəkili sil
    await Clothing.updateMany(
      { images: { $regex: imageName } },
      { $pull: { images: { $regex: imageName } } }
    );

   
  
    res.json({ message: "Şəkil silindi" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ------------------------------------





app.get("/api/Jewelry", async (req, res) => {
  try {
    const JewelryPosts = await Jewelry.find();
    res.json(JewelryPosts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ID-yə görə elan gətir
app.get("/api/Jewelry/:id", async (req, res) => {
  try {
    const item = await Jewelry.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Elan tapılmadı" });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Yeni elan əlavə et
app.post("/api/Jewelry", upload.array("images", 10), async (req, res) => {
    const newId = await idGenerator();
  try {
    const images = req.files.map(
      (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
    );

    // contact sahəsini req.body-dən ayrıca götür
    const contact = {
      name: req.body["contact.name"] || "",
      email: req.body["contact.email"] || "",
      phone: req.body["contact.phone"] || "",
    };

    const newJewelry = new Jewelry({
      id: newId,
      ...req.body,
      images,
      contact,
      data: req.body.data ? new Date(req.body.data) : new Date(),
    });

    await newJewelry.save();
    res.status(201).json(newJewelry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Elanı yenilə
app.put("/api/Jewelry/:id", upload.array("images", 10), async (req, res) => {
  try {
    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map(
        (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
      );
    }

    const contact = {
      name: req.body["contact.name"] || "",
      email: req.body["contact.email"] || "",
      phone: req.body["contact.phone"] || "",
    };

    const updated = await Jewelry.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        ...(images.length > 0 && { images }),
        contact,
        data: req.body.data ? new Date(req.body.data) : new Date(),
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Elan tapılmadı" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Elanı sil
app.delete("/api/Jewelry/:id", async (req, res) => {
  try {
    const deleted = await Jewelry.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Elan tapılmadı" });

    // Lazım gələrsə burada əlaqəli şəkilləri də serverdən silə bilərsən

    res.json({ message: "Elan silindi" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Like toggle
app.patch("/api/Jewelry/:id/like", async (req, res) => {
  try {
    const post = await Jewelry.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Elan tapılmadı" });

    post.liked = !post.liked;
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Favorite toggle
app.patch("/api/Jewelry/:id/favorite", async (req, res) => {
  try {
    const post = await Clothing.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Elan tapılmadı" });

    post.favorite = !post.favorite;
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Şəkil silmək (hem DB-dən images massivindən, hem serverdən faylı silir)
app.delete("/api/Jewelry/images/:imageName", async (req, res) => {
  try {
    const imageName = req.params.imageName;

    // 1. DB-də images massivindən URL-ə uyğun şəkili sil
    await Clothing.updateMany(
      { images: { $regex: imageName } },
      { $pull: { images: { $regex: imageName } } }
    );

   
  
    res.json({ message: "Şəkil silindi" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




app.post("/api/banner", upload.single("banner"), (req, res) => {
  res.json({ imageUrl: `/uploads/${req.file.filename}` });
});






app.listen(PORT, () => {
  console.log(`🚀 Server işə düşdü: http://localhost:${PORT}`);
  // npx nodemon src/backend/cateqory.js serveri ise salmaq ucun
});
