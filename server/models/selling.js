import mongoose from 'mongoose';

const SellingSchema = new mongoose.Schema({
  email:{
    type: String,
    required: true,
    unique:true
  },
  password:{
      type: String,
      required: true
  },
  name:{
      type: String,
      required: true
  },
  surname:{
      type: String,
      required: true
  },
  isSuperAdmin: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true, versionKey: false });

const AdminModel = mongoose.model('Selling', SellingSchema);

export default AdminModel;