import mongoose from 'mongoose';
import slugify from 'slugify';

const CarSchema = new mongoose.Schema({
  series_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'series',
    required: true
  },
  name: {
    type: String,
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
    sparse: true
  }
}, { timestamps: true, versionKey: false });

CarSchema.pre('save', async function (next) {
  if (this.isModified('name') || this.isNew) {
    const nameSlug = slugify(this.name, { lower: true, remove: /[*+~.()'"!:@]/g });
    const slug = nameSlug.replace(/\s+/g, '-');
    this.slug = slug;

    const similarSlugCount = await this.constructor.countDocuments({ slug: this.slug });
    if (similarSlugCount > 0) {
      const error = new Error('Bu araba zaten var.');
      return next(error);
    }
  }

  next();
});

const CarModel = mongoose.model('Car', CarSchema);

export default CarModel;
