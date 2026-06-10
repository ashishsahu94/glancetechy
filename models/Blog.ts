import mongoose, { Schema, models } from 'mongoose'

const BlogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    content: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: '',
    },

    author: {
      type: String,
      default: 'Admin',
    },

    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
    metaTitle: {
      type: String,
      default: '',
    },

    metaDescription: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
)

export default models.Blog || mongoose.model('Blog', BlogSchema)