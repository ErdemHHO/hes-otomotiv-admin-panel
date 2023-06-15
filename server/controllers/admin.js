import AdminModel from '../models/admin.js';
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await AdminModel.findOne({ email });

    if (!admin) return res.status(404).json({ success: false, message: "Bu mail adresinde bir kullanıcı yok" });

    const parolaKontrol = await bcrypt.compare(password, admin.password);

    if (!parolaKontrol) return res.status(400).json({ success: false, message: "Şifre Yanlış" });

    const token = jwt.sign({ email: admin.email }, "secret-key", {
      expiresIn: "3h",
    });
    const results = {
      adminId: admin._id,
      adminName: admin.name,
      adminSurname: admin.surname,
      isSuperAdmin: admin.isSuperAdmin,
    };

    res.status(200).json({ success: true, result: results, token, message: "Giriş Başarılı" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Sunucu hatası", error: error.message });
  }
};

const signup = async (req, res) => {
  const { email, password, confirmPassword, name, surname,isSuperAdmin } = req.body;
  try {
    const admin = await AdminModel.findOne({ email });
    if (admin) return res.status(400).json({ success: false, message: "Bu Admin Zaten Kayıtlı" });

    if (password !== confirmPassword) return res.status(400).json({ success: false, message: "Parolalar Aynı Değil" });

    // Şifre uzunluğu kontrolü
    if (password.length < 8) return res.status(400).json({ success: false, message: "Parola en az 8 karakter uzunluğunda olmalıdır" });

    // Şifre özellik kontrolü (büyük harf, küçük harf, sayı, özel karakter)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,_-])[A-Za-z\d@$!%*?&.,_-]+$/;
    if (!passwordRegex.test(password))
      return res.status(400).json({
        success: false,
        message: "Parola en az bir büyük harf, bir küçük harf, bir sayı ve bir özel karakter içermelidir",
      });

    const sifrelenmisParola = await bcrypt.hash(password, 12);

    const newAdmin = await AdminModel.create({
      email,
      password: sifrelenmisParola,
      name,
      surname,
      isSuperAdmin
    });

    res.status(200).json({ success: true, message: "Kayıt Başarılı", newAdmin });
  } catch (error) {
    res.status(500).json({ success: false, message: "Sunucu hatası", error: error.message });
  }
};

const getAllAdmins = async (req, res) => {
  try {
    const admins = await AdminModel.find();
    if (admins.length === 0) return res.status(400).json({ success: false, message: "Admin bulunamadi" });
    res.status(200).json({ success: true, admins });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
const getAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Hatalı işlem" });
    }
    const admin = await AdminModel.findById(id);
    if (!admin || admin.length === 0) return res.status(400).json({ success: false, message: "Admin bulunamadı" });

    res.status(200).json({ success: true, admin });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
const deleteAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Hatalı işlem" });
    }
    const admin = await AdminModel.findByIdAndDelete(req.params.id);
    if (!admin) return res.status(400).json({ success: false, message: "Admin bulunamadi" });
    res.status(200).json({ success: true, message: "Admin basariyla silindi" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const updateAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const { old_password, new_password, newConfirmPassword, isSuperAdmin } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Hatalı işlem" });
    }
    const updateAdmin = await AdminModel.findById(id);
    if (!updateAdmin) {
      return res.status(400).json({ success: false, message: "Admin bulunamadı" });
    }

    if (new_password !== newConfirmPassword) {
      return res.status(400).json({ success: false, message: "Parolalar Aynı Değil" });
    }
    if (new_password == old_password) {
      return res.status(400).json({ success: false, message: "Yeni Şifre Eski Şifre İle Aynı Olamaz" });
    }

    const parolaKontrol = await bcrypt.compare(old_password, updateAdmin.password);

    if (!parolaKontrol) return res.status(400).json({ success: false, message: "Eski Şifre Yanlış" });

    // Şifre uzunluğu kontrolü
    if (new_password.length < 8) return res.status(400).json({ success: false, message: "Parola en az 8 karakter uzunluğunda olmalıdır" });

    // Şifre özellik kontrolü (büyük harf, küçük harf, sayı, özel karakter)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,_-])[A-Za-z\d@$!%*?&.,_-]+$/;
    if (!passwordRegex.test(new_password))
      return res.status(400).json({
        success: false,
        message: "Parola en az bir büyük harf, bir küçük harf, bir sayı ve bir özel karakter içermelidir",
      });

    const hashlenmisPassword = await bcrypt.hash(new_password, 12);

    const newAdmin = await AdminModel.findByIdAndUpdate(
      id,
      {
        password: hashlenmisPassword,
        isSuperAdmin,
      },
      { new: true }
    );
    return res.status(200).json({ success: true, message: "Şifre başarı ile güncellendi", newAdmin });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};


export {
  signin,
  signup,
  getAllAdmins,
  getAdmin,
  deleteAdmin,
  updateAdmin
};
