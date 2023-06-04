import mongoose from 'mongoose';
import slugify from 'slugify';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  oemNumber: {
    type: String,
    required: true
  },
  stockCode: {
    type: String,
    required: true,
    unique: true
  },
  car_id: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'car'
    }],
    required: true
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
    required: true
  },
  status: {
    type: Boolean,
    default: true,
    required: true
  },
  brand_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'brand',
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  costPrice: {
    type: Number,
    required: true
  },
  oldPrice: {
    type: Number,
    required: true
  },
  sellingPrice: {
    type: Number,
    required: true
  },
  salesFormat: {
    type: Boolean,
    default: true,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true,
    required: true
  },
  image_urls: [
    {
      type: String
    }
  ],
  slug: {
    type: String,
    unique: true,
    validate: {
      validator: async function (value) {
        const product = await this.constructor.findOne({ slug: value });
        return !product;
      },
      message: 'Bu ürün zaten var.'
    }
  }
}, { timestamps: true, versionKey: false });

// Pre-save hook to generate slug
ProductSchema.pre('save', async function (next) {
  const nameSlug = slugify(this.title, { lower: true, remove: /[*+~.()'"!:@]/g });
  const slug = nameSlug.replace(/\s+/g, '-');
  this.slug = `${slug}-${this.stockCode}`;

  const similarSlugCount = await this.constructor.countDocuments({ slug: this.slug });
  if (similarSlugCount > 0) {
    const error = new Error('Bu ürün zaten var.');
    return next(error);
  }

  next();
});

const ProductModel = mongoose.model('Product', ProductSchema);

export default ProductModel;
