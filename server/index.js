import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import cors from "cors";
import cookieParser from 'cookie-parser';

import categoryRoutes from './routes/category.js';
import carRoutes from './routes/car.js';
import seriRoutes from './routes/seri.js';

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ limit: "50mb", extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static("public"));

app.use('/api/category', categoryRoutes);
app.use('/api/car', carRoutes);
app.use('/api/seri', seriRoutes);

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
