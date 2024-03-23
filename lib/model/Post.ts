import mongoose, { Schema, Types, models, Model, InferSchemaType } from "mongoose";


export const PostSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  create_dt: {
    type: Date,
    required: true,
  },
  update_dt: {
    type: Date,
  },
  delete_dt: {
    type: Date,
  },
  is_deleted: {
    type: Boolean,
  },
  description: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  thumbnailUrl: {
    type: String,
  },
});

type IPost = InferSchemaType<typeof PostSchema>;

export const Post = models?.Post || mongoose.model("Post", PostSchema);

export type PostDetail = IPost & { content: string };
export type PostBannerDto = IPost;
