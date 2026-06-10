import mongoose, { Schema, models } from 'mongoose'

const PortfolioSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },

    image: { type: String, default: '' },

    client: { type: String, default: '' },
    company: { type: String, default: '' },
    projectUrl: { type: String, default: '' },

    content: { type: String, required: true },

    tags: [{ type: String }],

    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
  },
  { timestamps: true }
)

export default models.Portfolio ||
  mongoose.model('Portfolio', PortfolioSchema)