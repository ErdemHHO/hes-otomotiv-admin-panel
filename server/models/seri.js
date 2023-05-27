import mongoose from 'mongoose';
import slugify from 'slugify';

const SeriSchema = new mongoose.Schema({
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

SeriSchema.pre('save', async function (next) {
  if (this.isModified('name') || this.isNew) {
    const nameSlug = slugify(this.name, { lower: true, remove: /[*+~.()'"!:@]/g });
    const slug = nameSlug.replace(/\s+/g, '-');
    this.slug = slug;

    const similarSlugCount = await this.constructor.countDocuments({ slug: this.slug });
    if (similarSlugCount > 0) {
      const error = new Error('Bu seri zaten var.');
      return next(error);
    }
  }

  next();
});

const SeriModel = mongoose.model('Seri', SeriSchema);

export default SeriModel;
