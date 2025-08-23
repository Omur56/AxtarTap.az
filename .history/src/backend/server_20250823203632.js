import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import dotenv from "dotenv";
import connectDB from "./db.js";
import Announcement from "./models/Announcement";
import HomeAndGarden from "./models/HomeAndGarden";
import Electronika from "./models/Electronika";
import Accessory from "./models/Acsesuar";
import RealEstate from "./models/RealEstate";
import HouseHold from "./models/Household";
import Phone from "./models/Phone";
import Clothing from "./models/Clothing";
import Jewelry from "./models/Jewelry";
import User from "./models/user";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { verifyToken } from "./middleware/verifyToken";
import nodemailer from "nodemailer";
import authRoutes from "./routes/auth";
import Ad from "./models/Ad"
// .env faylını oxu
dotenv.config();
connectDB();
// Əgər __dirname lazımdırsa:

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();


// const PORT = 5000;



const PORT = process.env.PORT || 5000;



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


dotenv.config({ path: path.resolve("../.env") });

// Routes



app.use(cors());
app.use(express.json()); 
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api", authRoutes);


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
     
   images: imageUrls,
      // image: req.file ? `http://localhost:${PORT}/uploads/${req.file.filename}` : "",
})

await newAnn.save();
res.status(201).json(newAnn);
} catch (err) {
  res.status(500).json({error: err.message});
}
});



// Multer upload və verifyToken middleware əvvəlcədən əlavə olunub


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


app.put(
  "/api/electronika/:id",
  upload.array("images", 10),
  async (req, res) => {
    try {
      const post = await Electronika.findById(req.params.id);
      if (!post) return res.status(404).json({ message: "Post tapılmadı" });

   
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

app.delete("/api/electronika/:id", async (req, res) => {
  try {
    const post = await Electronika.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post tapılmadı" });

 
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


app.delete("/api/accessories/:id", async (req, res) => {
  try {
    await Accessory.findByIdAndDelete(req.params.id);
    res.json({ message: "Accessory silindi" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


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
app.patch("/api/RealEstate/:id/like", async (req, res) => {
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
app.patch("/api/RealEstate/:id/favorite", async (req, res) => {
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

app.get("/api/RealEstate/:id", async (req, res) => {
  try {
    const item = await RealEstate.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Elan tapılmadı" });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.get("/api/RealEstate", async (req, res) => {
  try {
    const realEstatePost = await RealEstate.find();
    res.json(realEstatePost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});





app.post("/api/RealEstate", upload.array("images", 20), async (req, res) => {
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


app.put(
  "/api/RealEstate/:id",
  upload.array("images", 20),
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


app.delete("/api/RealEstate/:id", async (req, res) => {
  try {
    await RealEstate.findByIdAndDelete(req.params.id);
    res.json({ message: "Elan silindi" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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

app.delete("/api/RealEstatePost/images/:imageName", async (req, res) => {
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


app.get("/api/Household/:id", async (req, res) => {
  try {
    const item = await HouseHold.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Elan tapılmadı" });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.post("/api/Household", upload.array("images", 20), async (req, res) => {
    const newId = await idGenerator();
  try {
    const images = req.files.map(
      (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
    );


    const contact = {
      name: req.body["contact.name"] || "",
      email: req.body["contact.email"] || "",
      phone: req.body["contact.phone"] || "",
    };

    const newHouseHold = new HouseHold({
      id: newId,
      ...req.body,
      images,
      contact: {
        name: req.body["contact.name"],
        email: req.body["contact.email"],
        phone: req.body["contact.phone"],
      },
      data: req.body.data ? new Date(req.body.data) : new Date(),
    });

    await newHouseHold.save();
    res.status(201).json(newHouseHold);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


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
        contact: {
        name: req.body["contact.name"],
        email: req.body["contact.email"],
        phone: req.body["contact.phone"],
      },
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


app.delete("/api/Household/images/:imageName", async (req, res) => {
  try {
    const imageName = req.params.imageName;

    // 1. DB-də images massivindən URL-ə uyğun şəkili silir
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



app.post("/api/Phone", upload.array("images", 20), async (req, res) => {
  try {

    const newId = await idGenerator();

    const images = req.files.map(
      (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
    );

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
    console.error("❌ Xəta:", err.message);
    res.status(400).json({ error: err.message });
  }
});
// Elanı yenilə
app.put("/api/Phone/:id", upload.array("images", 20), async (req, res) => {
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











// VERIFY TOKEN


app.post("/api/announcements", verifyToken, async (req, res) => {
  try {
    const newAnn = new Announcement({
      ...req.body,
      owner: req.userId,
    });
    await newAnn.save();
    res.status(201).json(newAnn);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ROUTES
// REGISTER
// server.js və ya app.js
app.post("/api/reqister", async (req, res) => {
  try {
    // password hash-lə
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      username: req.body.username,
      phone: req.body.phone,
      email: req.body.email,
      password: hashedPassword,
      
       // hash-lənmiş password saxlanır
    });

    await newUser.save();
    res.status(201).json("User created successfully!");
  } catch (err) {
    res.status(500).json(err);
  }
});


// LOGIN
app.post("/api/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json("User not found");

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json("Wrong password");

    const token = jwt.sign({ id: user._id }, "SECRET_KEY", { expiresIn: "1d" });
    res.json({ token, userId: user._id, username: user.username });
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE ANNOUNCEMENT
app.post("/api/announcements", verifyToken, async (req, res) => {
  try {
    const newAnn = new Announcement({
      ...req.body,
      owner: req.userId,
    });
    await newAnn.save();
    res.status(201).json(newAnn);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE ANNOUNCEMENT
app.put("/api/announcements/:id", verifyToken, async (req, res) => {
  try {
    const ann = await Announcement.findById(req.params.id);
    if (!ann) return res.status(404).json("Not found");

    if (ann.owner.toString() !== req.userId) {
      return res.status(403).json("You can only edit your own announcements");
    }

    const updated = await Announcement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
});



// profil üçün
app.get("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password"); // password göndərmə
    if (!user) return res.status(404).json("User not found");
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});


app.get("/api/announcements",verifyToken, async (req, res) => {
  try {
    const announcements = await Announcement.find().populate("owner", "username");
    res.json(announcements);
  } catch (err) {
    res.status(500).json(err);
  }
});



app.put("/api/announcements/:id", verifyToken, async (req, res) => {
  try {
    const ann = await Announcement.findById(req.params.id);
    if (!ann) return res.status(404).json("Not found");

    if (ann.owner.toString() !== req.userId)
      return res.status(403).json("You can only edit your own announcements");

    const updated = await Announcement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Elanı sil
app.delete("/api/announcements/:id", verifyToken, async (req, res) => {
  try {
    const ann = await Announcement.findById(req.params.id);
    if (!ann) return res.status(404).json("Not found");

    if (ann.owner.toString() !== req.userId)
      return res.status(403).json("You can only delete your own announcements");

    await Announcement.findByIdAndDelete(req.params.id);
    res.json("Deleted successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});


app.get("/api/users/:id", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password"); // password göndərmə
    if (!user) return res.status(404).json("User not found");
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});



const router = express.Router();





// Yeni reklam əlavə
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const ad = new Ad({
      title: req.body.title,
      link: req.body.link,
      image: req.file.path,
    });
    await ad.save();
    res.json(ad);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Reklamları gətir
router.get("/", async (req, res) => {
  const ads = await Ad.find();
  res.json(ads);
});

// Reklam sil
router.delete("/:id", async (req, res) => {
  await Ad.findByIdAndDelete(req.params.id);
  res.json({ message: "Reklam silindi" });
});



app.listen(PORT, () => {
  console.log(`🚀 Server işə düşdü: http://localhost:${PORT}`);
  // npx nodemon src/backend/cateqory.js serveri ise salmaq ucun
});
