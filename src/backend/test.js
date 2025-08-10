// const express = require("express");
// const cors = require("cors");
// const multer = require("multer");
// const path = require("path");
// const mongoose = require("mongoose");


// const Announcement = require("./models/Announcement");
// const HomeAndGarden = require("./models/HomeAndGarden");
// const Electronika = require("./models/Electronika")
// const Accessory = require("./models/Acsesuar")
// const RealEstate = require("./models/RealEstate")

// const app = express(); // 🟢 BURADA APP İLK ÖNCƏ TƏYİN OLUNMALIDIR

// const PORT = 5000;

// // 🔌 MongoDB bağlantısı
// mongoose
//   .connect("mongodb+srv://Omur9696:<səninŞifrən>@cluster0.pyjgrvq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.error("MongoDB Error:", err));

// // 🌐 Middleware-lər
// app.use(cors());
// app.use(express.json());
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// // 🔗 Router-lar
// app.use("/api/homGarden",HomeAndGarden); // 🟢 indi işləyəcək
// app.use("/api/announcement",Announcement);
// app.use("/api/cars",Announcement);
// app.use("/api/electronika",Electronika);
// app.use("api/acsessories", Accessory);
// app.use("/api/realEstate",RealEstate)




// // 📁 Multer şəkil yükləmə
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + "-" + file.originalname);
//   },
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 } 
// });


// // 🔽 Elan əlavə et (POST)
// app.post("/api/homGarden", upload.single("image"), async (req, res) => {
//   try {
//     const { category, title, description, brand, price, location, liked, favorite, data } = req.body;
//     const contact = {
//       name: req.body["contact.name"],
//       email: req.body["contact.email"],
//       phone: req.body["contact.phone"],
//     };

//     const newHome = new HomeAndGarden({
//       category,
//       title,
//       description,
//       brand,
//       price,
//       location,
//       contact,
//       liked: liked === "true",
//       favorite: favorite === "true",
//       data: data ? new Date(data) : new Date(),
//       image: req.file ? `http://localhost:${PORT}/uploads/${req.file.filename}` : "",
//     });

//     await newHome.save();
//     res.status(201).json(newHome);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // ✏️ Elan yenilə (PUT)
// app.put("/api/homGarden/:id", upload.single("image", 10), async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { category, title, description, brand, price, location, liked, favorite, data } = req.body;
//     const contact = {
//       name: req.body["contact.name"],
//       email: req.body["contact.email"],
//       phone: req.body["contact.phone"],
//     };

//     const updatedFields = {
//       category,
//       title,
//       description,
//       brand,
//       price,
//       location,
//       contact,
//       liked: liked === "true",
//       favorite: favorite === "true",
//       data: data ? new Date(data) : new Date(),
//       description,
//     };

//     if (req.file) {
//       updatedFields.image = `http://localhost:${PORT}/uploads/${req.file.filename}`;
//     }

//     const updated = await HomeAndGarden.findByIdAndUpdate(id, updatedFields, { new: true });
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // ❌ Elan sil (DELETE)
// app.delete("/api/homGarden/:id", async (req, res) => {
//   try {
//     const deleted = await HomeAndGarden.findByIdAndDelete(req.params.id);
//     res.json({ message: "Deleted", deleted });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // ❤️ Like dəyiş (PATCH)
// app.patch("/api/homGarden/:id/like", async (req, res) => {
//   try {
//     const item = await HomeAndGarden.findById(req.params.id);
//     item.liked = !item.liked;
//     await item.save();
//     res.json(item);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // ⭐ Favorite dəyiş (PATCH)
// app.patch("/api/homGarden/:id/favorite", async (req, res) => {
//   try {
//     const item = await HomeAndGarden.findById(req.params.id);
//     item.favorite = !item.favorite;
//     await item.save();
//     res.json(item);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 📄 Bütün elanları al (GET)
// app.get("/api/homGarden", async (req, res) => {
//   try {
//     const items = await HomeAndGarden.find().sort({ data: -1 });
//     res.json(items);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


// // 📄 GET tək elan
// app.get("/api/homGarden/:id", async (req, res) => {
//   try {
//     const item = await HomeAndGarden.findById(req.params.id);
//     if (!item) return res.status(404).json({ message: "Elan tapılmadı" });
//     res.json(item);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });




// app.get("/api/cars/:id", async (req, res) => {
//   try {
//     const car = await Announcement.findById(req.params.id);
//     if (!car) return res.status(404).json({ message: "Elan tapılmadı" });
//     res.json(car);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// app.post("/api/cars", upload.single("image"), async (req, res) => {
//   try {
//     const {id,
//     category,
//     brand,
//     model,
//     year,
//     price,
//     location,
//     images,
//     km,
//     motor,
//     transmission,
//     liked,
//     favorite,
//     engine,
//     data,
//     description } = req.body;
//     const contact = {
//       name: req.body["contact.name"],
//       email: req.body["contact.email"],
//       phone: req.body["contact.phone"],
//     };

//     const newAnn = new Announcement({
//       id,
//       category,
//       brand,
//       model,
//       year,
//       price,
//       location,
//       images,
//       km,
//       motor,
//       transmission,
//       engine,
//       contact,
//       liked: liked === "true",
//       favorite: favorite === "true",
//       data : data ? new Date(data) : new Date(),
//       description,
//       contact,
//       image: req.file ? `http://localhost:${PORT}/uploads/${req.file.filename}` : "",
//     });

//     await newAnn.save();
//     res.status(201).json(newAnn);
//   } catch (err) {
//     res.status(500).json({ error: err.message }); 
//   }
// })




// app.put("/api/cars/:id", upload.single("image",  10), async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { 
//     category,
//     brand,
//     model,
//     year,
//     price,
//     location,
//     images,
//     km,
//     motor,
//     transmission,
//     liked,
//     favorite,
//     engine,
//     data,
//     description

//    } = req.body;
//     const contact = {
//       name: req.body["contact.name"],
//       email: req.body["contact.email"],
//       phone: req.body["contact.phone"],
//     };

//     const updatedFields = {
//       category,
//       brand,
//       price,
//       location,
//       images,
//       km,
//       motor,
//       transmission,
//       engine,
//       contact,
//       liked: liked === "true",
//       favorite: favorite === "true",
//       data: data ? new Date(data) : new Date(),
//     };

//     if (req.file) {
//       updatedFields.image = `http://localhost:${PORT}/uploads/${req.file.filename}`;
//     }

//     const updated = await Announcement.findByIdAndUpdate(id, updatedFields, { new: true });
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });





// app.delete("/api/cars/:id", async (req, res) => {
//   try {
//     const deleted = await Announcement.findByIdAndDelete(req.params.id);
//     res.json({ message: "Deleted", deleted });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });



// app.patch("/api/cars/:id/like", async (req, res) => {
//   try {
//     const car = await Announcement.findById(req.params.id);
//     car.liked = !car.liked;
//     await car.save();
//     res.json(car);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });









// // ⭐ Favorite dəyiş (PATCH)
// app.patch("/api/cars/:id/favorite", async (req, res) => {
//   try {
//     const car = await Announcement.findById(req.params.id);
//     car.favorite = !car.favorite;
//     await car.save();
//     res.json(car);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 📄 Bütün elanları al (GET)
// app.get("/api/cars", async (req, res) => {
//   try {
//     const car = await Announcement.find().sort({ data: -1 });
//     res.json(car);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


// // 📄 GET tək elan
// app.get("/api/cars/:id", async (req, res) => {
//   try {
//     const car = await Announcement.findById(req.params.id);
//     if (!car) return res.status(404).json({ message: "Elan tapılmadı" });
//     res.json(car);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


// app.get("/api/cars/:id", async (req, res) => {
//   try {
//     const car = await Announcement.findById(req.params.id);
//     if (!car) return res.status(404).json({ message: "Car not found" });
//     res.json(car);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });








// // Bütün elanları götür
// app.get("/api/electronika", async (req, res) => {
//   try {
//     const items = await Electronika.find();
//     res.json(items);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Yeni elan əlavə et
// // `images` field-lə çoxlu fayl qəbul edir
// app.post("/api/electronika", upload.array("images", 10), async (req, res) => {
//   try {
//     // Yüklənmiş şəkillərin server URL-lərini qur
//     const imageUrls = req.files.map((file) => `http://localhost:${PORT}/uploads/${file.filename}`);

//     // Contact datanı formdan gələn contact.*-dən qur
//     const contact = {
//       name: req.body["contact.name"] || "",
//       email: req.body["contact.email"] || "",
//       phone: req.body["contact.phone"] || "",
//     };

//     // Yeni elan
//     const newPost = new Electronika({
//       title: req.body.title,
//       brand: req.body.brand,
//       model: req.body.model,
//       price: req.body.price,
//       location: req.body.location,
//       description: req.body.description,
//       images: imageUrls,
//       contact,
//       liked: false,
//       favorite: false,
//       data: req.body.data ? new Date(req.body.data) : Date.now(),
//     });

//     await newPost.save();
//     res.status(201).json(newPost);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // Elanı redaktə et (PUT)
// // Şəkilləri yeniləmək üçün eyni post ilə şəkillər də göndərilə bilər
// app.put("/api/electronika/:id", upload.array("images", 10), async (req, res) => {
//   try {
//     const post = await Electronika.findById(req.params.id);
//     if (!post) return res.status(404).json({ message: "Post tapılmadı" });

//     // Yüklənmiş yeni şəkillər varsa əlavə et
//     if (req.files.length > 0) {
//       const imageUrls = req.files.map((file) => `http://localhost:${PORT}/uploads/${file.filename}`);
//       post.images = imageUrls;
//     }

//     post.title = req.body.title || post.title;
//     post.brand = req.body.brand || post.brand;
//     post.model = req.body.model || post.model;
//     post.price = req.body.price || post.price;
//     post.location = req.body.location || post.location;
//     post.description = req.body.description || post.description;

//     post.contact = {
//       name: req.body["contact.name"] || post.contact.name,
//       email: req.body["contact.email"] || post.contact.email,
//       phone: req.body["contact.phone"] || post.contact.phone,
//     };

//     post.data = req.body.data ? new Date(req.body.data) : post.data;

//     await post.save();
//     res.json(post);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // Elanı sil
// app.delete("/api/electronika/:id", async (req, res) => {
//   try {
//     const post = await Electronika.findById(req.params.id);
//     if (!post) return res.status(404).json({ message: "Post tapılmadı" });

//     // Burada istəsən faylları serverdən silə bilərsən (isteğe bağlı)

//     await post.remove();
//     res.json({ message: "Post silindi" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Like toggle
// app.patch("/api/electronika/:id/like", async (req, res) => {
//   try {
//     const post = await Electronika.findById(req.params.id);
//     if (!post) return res.status(404).json({ message: "Post tapılmadı" });

//     post.liked = !post.liked;
//     await post.save();
//     res.json(post);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Favorite toggle
// app.patch("/api/electronika/:id/favorite", async (req, res) => {
//   try {
//     const post = await Electronika.findById(req.params.id);
//     if (!post) return res.status(404).json({ message: "Post tapılmadı" });

//     post.favorite = !post.favorite;
//     await post.save();
//     res.json(post);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// app.get("/api/electronika/:id", async (req, res) => {
//   try {
//     const item = await Electronika.findById(req.params.id);
//     if (!item) return res.status(404).json({ message: "Elan tapılmadı" });
//     res.json(item);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });












// // 📌 Bütün elanları gətir
// app.get("/accessories", async (req, res) => {
//   try {
//     const accessories = await Accessory.find();
//     res.json(accessories);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 📌 Yeni elan əlavə et
// app.post("/accessories", upload.array("images",  10), async (req, res) => {
//   try {
//     const images = req.files.map(file => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`);
//     const accessory = new Accessory({
//       ...req.body,
//       images,
//       contact: {
//         name: req.body["contact.name"],
//         email: req.body["contact.email"],
//         phone: req.body["contact.phone"]
//       }
//     });
//     await accessory.save();
//     res.status(201).json(accessory);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // 📌 Elanı yenilə
// app.put("/accessories/:id", upload.array("images", 10), async (req, res) => {
//   try {
//     let images = [];
//     if (req.files.length > 0) {
//       images = req.files.map(file => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`);
//     }

//     const updated = await Accessory.findByIdAndUpdate(
//       req.params.id,
//       {
//         ...req.body,
//         ...(images.length > 0 && { images }),
//         contact: {
//           name: req.body["contact.name"],
//           email: req.body["contact.email"],
//           phone: req.body["contact.phone"]
//         }
//       },
//       { new: true }
//     );
//     res.json(updated);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // 📌 Elanı sil
// app.delete("/accessories/:id", async (req, res) => {
//   try {
//     await Accessory.findByIdAndDelete(req.params.id);
//     res.json({ message: "Accessory silindi" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 📌 Favorit dəyiş
// app.patch("/api/accessories/:id/favorite", async (req, res) => {
//   try {
//     const accessory = await Accessory.findById(req.params.id);
//     accessory.favorite = !accessory.favorite;
//     await accessory.save();
//     res.json(accessory);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 📌 Like dəyiş
// app.patch("/api/accessories/:id/like", async (req, res) => {
//   try {
//     const accessory = await Accessory.findById(req.params.id);
//     accessory.liked = !accessory.liked;
//     await accessory.save();
//     res.json(accessory);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 📌 Yüklənmiş şəkili silmək
// app.delete("/api/accessories/images/:imageName", async (req, res) => {
//   try {
//     const imageName = req.params.imageName;
//     await Accessory.updateMany({}, { $pull: { images: { $regex: imageName } } });
//     res.json({ message: "Şəkil silindi" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });












// // Like toggle
// app.patch("/api/realEstatePost/:id/like", async (req, res) => {
//   try {
//     const post = await RealEstate.findById(req.params.id);
//     if (!post) return res.status(404).json({ message: "Post tapılmadı" });

//     post.liked = !post.liked;
//     await post.save();
//     res.json(post);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Favorite toggle
// app.patch("/api/realEstatePost/:id/favorite", async (req, res) => {
//   try {
//     const post = await RealEstate.findById(req.params.id);
//     if (!post) return res.status(404).json({ message: "Post tapılmadı" });

//     post.favorite = !post.favorite;
//     await post.save();
//     res.json(post);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// app.get("/api/realEstatePost/:id", async (req, res) => {
//   try {
//     const item = await RealEstate.findById(req.params.id);
//     if (!item) return res.status(404).json({ message: "Elan tapılmadı" });
//     res.json(item);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // 📌 Bütün elanları gətir
// app.get("/api/realEstatePost", async (req, res) => {
//   try {
//     const realEstatePost = await RealEstate.find();
//     res.json(realEstatePost);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 📌 Yeni elan əlavə et
// app.post("/api/realEstatePost", upload.array("images", 10), async (req, res) => {
//   try {
//     const images = req.files.map(
//       (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
//     );
//     const realEstatePost = new RealEstate({
//       ...req.body,
//       images,
//       contact: {
//         name: req.body["contact.name"],
//         email: req.body["contact.email"],
//         phone: req.body["contact.phone"],
//       },
//     });
//     await realEstatePost.save();
//     res.status(201).json(realEstatePost);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // 📌 Elanı yenilə
// app.put(
//   "/api/realEstatePost/:id",
//   upload.array("images", 10),
//   async (req, res) => {
//     try {
//       let images = [];
//       if (req.files.length > 0) {
//         images = req.files.map(
//           (file) =>
//             `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
//         );
//       }

//       const updated = await RealEstate.findByIdAndUpdate(
//         req.params.id,
//         {
//           ...req.body,
//           ...(images.length > 0 && { images }),
//           contact: {
//             name: req.body["contact.name"],
//             email: req.body["contact.email"],
//             phone: req.body["contact.phone"],
//           },
//         },
//         { new: true }
//       );
//       res.json(updated);
//     } catch (err) {
//       res.status(400).json({ error: err.message });
//     }
//   }
// );

// // 📌 Elanı sil
// app.delete("/api/realEstatePost/:id", async (req, res) => {
//   try {
//     await RealEstate.findByIdAndDelete(req.params.id);
//     res.json({ message: "Elan silindi" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 📌 Favorit dəyiş
// app.patch("/api/realEstatePost/:id/favorite", async (req, res) => {
//   try {
//     const realEstatePost = await RealEstate.findById(req.params.id);
//     realEstatePost.favorite = !realEstatePost.favorite;
//     await realEstatePost.save();
//     res.json(realEstatePost);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 📌 Like dəyiş
// app.patch("/api/realEstatePost/:id/like", async (req, res) => {
//   try {
//     const realEstatePost = await RealEstate.findById(req.params.id);
//     realEstatePost.liked = !realEstatePost.liked;
//     await realEstatePost.save();
//     res.json(realEstatePost);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 📌 Yüklənmiş şəkili silmək
// app.delete("/api/realEstatePost/images/:imageName", async (req, res) => {
//   try {
//     const imageName = req.params.imageName;
//     await RealEstate.updateMany(
//       {},
//       { $pull: { images: { $regex: imageName } } }
//     );
//     res.json({ message: "Şəkil silindi" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 🚀 Server başlat
// app.listen(PORT, () => {
//   console.log(`Server http://localhost:${PORT} ünvanında işləyir`);
// });











