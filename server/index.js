import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from 'cookie-parser';

// import sellingRoutes from './routes/selling.js';
// import paymentRoutes from './routes/payment.js';
import brandRoutes from './routes/brand.js';
import categoryRoutes from './routes/category.js';
import carRoutes from './routes/car.js';
import seriRoutes from './routes/seri.js';
import productRoutes from './routes/product.js';
import adminRoutes from './routes/admin.js';


const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ limit: "50mb", extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static("public"));

// app.use('/api/selling', sellingRoutes);
// app.use('/api/payment', paymentRoutes);
app.use('/api/brand', brandRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/car', carRoutes);
app.use('/api/seri', seriRoutes);
app.use('/api/product', productRoutes);
app.use("/api/admin", adminRoutes);

app.use((req, res) => {
  res.json({ success: false, message: "Geçersiz endpoint" });
});

const PORT = process.env.PORT || 4000;

mongoose.set("strictQuery", false)
  .connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Port ${PORT} dinleniyor.`);
      console.log("Veritabanına başarıyla bağlandı.");
    });
  })
  .catch((error) => {
    console.error("Veritabanına bağlanırken hata oluştu:", error);
  });
