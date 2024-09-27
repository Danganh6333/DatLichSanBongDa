import mongoose from 'mongoose';
import uri from '../COMMON.js'

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connect Successfully");
  })
  .catch((err) => {
    console.error("Failed to connect " + err);
  });

module.exports = mongoose;