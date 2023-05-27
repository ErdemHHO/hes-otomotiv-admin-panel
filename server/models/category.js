import mongoose from 'mongoose';
import slugify from 'slugify';

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    unique: true,
    sparse: true,
  },
}, { timestamps: true, versionKey: false });

CategorySchema.pre("save", async function (next) {
  if (this.isModified("name") || this.isNew) {
    const nameSlug = slugify(this.name, { lower: true, remove: /[*+~.()'"!:@]/g });
    const slug = nameSlug.replace(/\s+/g, "-");
    this.slug = slug;

    const similarSlugCount = await this.constructor.countDocuments({ slug: this.slug });
    if (similarSlugCount > 0) {
      const error = new Error("Bu kategori zaten var.");
      return next(error);
    }
  }

  next();
});

const CategoryModel = mongoose.model('Category', CategorySchema);

export default CategoryModel;
