import mongoose from 'mongoose';

const BrandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image_urls: [
    {
      type: String
    }
  ]
}, { timestamps: true, versionKey: false });

const BrandModel = mongoose.model('Brand', BrandSchema);

export default BrandModel;