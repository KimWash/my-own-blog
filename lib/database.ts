import mongoose, { Mongoose } from "mongoose";
let connectDB: Promise<Mongoose>;

if (process.env.NODE_ENV === "development") {
  // 개발 중 재실행을 막음
  if (!global._mongo) {
    global._mongo = mongoose
    .set({ debug: true, strictQuery: false })
    .connect(process.env.NEXT_MONGO_URL)
    .then((mongoose) => mongoose);
  }
  connectDB = global._mongo;
} else {
  connectDB = mongoose
    .set({ debug: true, strictQuery: false })
    .connect(process.env.NEXT_MONGO_URL)
    .then((mongoose) => mongoose);
}

export { connectDB };
