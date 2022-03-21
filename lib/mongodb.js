import mongoose from "mongoose";

const { MONGODB_URI } = process.env;

let clientPromise;

mongoose.set("debug", true);

if (!process.env.MONGODB_URI)
{
  throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development')
{
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise)
  {
    mongoose.connect(MONGODB_URI);
    global._mongoClientPromise = mongoose.connection;
  }

  clientPromise = global._mongoClientPromise;
}
else
{
  mongoose.connect(MONGODB_URI);
  clientPromise = mongoose.connection;
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
