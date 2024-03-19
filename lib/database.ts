import { MongoClient } from 'mongodb'

const url =
  'mongodb+srv://ckm0728wash:QsNasozTHxE2vIg4@my-own-blog.1nd5me2.mongodb.net/?retryWrites=true&w=majority&appName=my-own-blog'
const options: any = { useNewUrlParser: true }
let connectDB: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
  // 개발 중 재실행을 막음
  if (!global._mongo) {
    global._mongo = new MongoClient(url, options).connect()
  }
  connectDB = global._mongo
} else {
  connectDB = new MongoClient(url, options).connect()
}

export { connectDB }