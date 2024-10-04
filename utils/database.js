import mongoose from "mongoose";
let isConnected = false;
export const connectToDB = async()=>
{
 mongoose.set('strictQuery',true);
  if(isConnected)
  {
    console.log('MongoDB is already connected')
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL,{
        dbName:'share_prompt',
        serverSelectionTimeoutMS: 5000,
    })
    isConnected=true;
    console.log('MangoDB Connected')
    
  } catch (error) {
    console.log(error);
  }

}