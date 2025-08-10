// // app.post("/api/cars", upload.single("image"), async (req, res) => {
// //     try {
// //         const {id,
// //         category,
// //         brand,
// //         model,
// //         year,
// //         price,
// //         location,
// //         images,
// //         km,
// //         motor,
// //         transmission,
// //         liked,
// //         favorite,
// //         engine,
// //         data,
// //         description } = req.body;
// //         const contact = {
// //             name: req.body["contact.name"],
// //             email: req.body["contact.email"],
// //             phone: req.body["contact.phone"],
// //         };

// const RealEstate = require("./models/RealEstate");

// //         const newCar = new Car({
// //             id,
// //             category,
// //             brand,
// //             model,
// //             year,
// //             price,
// //             location,
// //             images,
// //             km,
// //             motor,
// //             transmission,
// //             contact,
// //             liked: liked === "true",
// //             favorite: favorite === "true",
// //             engine,
// //             data: data ? new Date(data) : new Date(),
// //             description,
// //         });

// //         await newCar.save();
// //         res.status(201).json(newCar);
// //     } catch (err) {
// //         res.status(500).json({ error: err.message });
// //     }
// // });





// // Bütün elanları götür
// app.get("/api/electronika", async (req, res) => {
//   try {
//     const items = await RealEstate.find();
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
//     const imageUrls = req.files.map(
//       (file) => `http://localhost:${PORT}/uploads/${file.filename}`
//     );

//     // Contact datanı formdan gələn contact.*-dən qur
//     const contact = {
//       name: req.body["contact.name"] || "",
//       email: req.body["contact.email"] || "",
//       phone: req.body["contact.phone"] || "",
//     };

//     // Yeni elan
//     const newPost = new RealEstate ({
//       title_type: req.body.title_type,
//       type_building: req.body.type_building,
//       field: req.body.field,
//       price: req.body.price,
//       location: req.body.location,
//       description: req.body.description,
//       images: imageUrls,
//       contact: {
//         name: contact.name,
//         email: contact.email,
//         phone: contact.phone,
//       },
//       liked: false,
//       favorite: false,
//       data: req.body.data ? new Date(req.body.data) : Date.now(),
//       number_of_rooms: req.body.number_of_rooms,
//       city: req.body.city,
      
//     });

//     await newPost.save();
//     res.status(201).json(newPost);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // Elanı redaktə et (PUT)
// // Şəkilləri yeniləmək üçün eyni post ilə şəkillər də göndərilə bilər
// app.put(
//   "/api/electronika/:id",
//   upload.array("images", 10),
//   async (req, res) => {
//     try {
//       const post = await  RealEstate.findById(req.params.id);
//       if (!post) return res.status(404).json({ message: "Post tapılmadı" });

//       // Yüklənmiş yeni şəkillər varsa əlavə et
//       if (req.files.length > 0) {
//         const imageUrls = req.files.map(
//           (file) => `http://localhost:${PORT}/uploads/${file.filename}`
//         );
//         post.images = imageUrls;
//       }

//       post.title_type = req.body.title_type || post.title_type;
//       post.type_building = req.body.brand || post.type_building;
//       post.field = req.body.field || post.field;
//       post.price = req.body.price || post.price;
//       post.location = req.body.location || post.location;
//       post.description = req.body.description || post.description;
//       post.number_of_rooms = req.body.number_of_rooms || post.number_of_rooms;
//       post.city = req.body.city || post.city;

//       post.contact = {
//         name: req.body["contact.name"] || post.contact.name,
//         email: req.body["contact.email"] || post.contact.email,
//         phone: req.body["contact.phone"] || post.contact.phone,
//       };

//       post.data = req.body.data ? new Date(req.body.data) : post.data;

//       await post.save();
//       res.json(post);
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   }
// );

// // Elanı sil
// app.delete("/api/electronika/:id", async (req, res) => {
//   try {
//     const post = await RealEstate.findById(req.params.id);
//     if (!post) return res.status(404).json({ message: "Post tapılmadı" });

//     // Burada istəsən faylları serverdən silə bilərsən (isteğe bağlı)

//     await post.remove();
//     res.json({ message: "Post silindi" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
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
