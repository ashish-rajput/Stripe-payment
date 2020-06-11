const mongoose = require('mongoose');

const URL = process.env.MONGO_DB_URL;

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    retryWrites: true,
    useCreateIndex: true,
    useFindAndModify: false,
    w: 'majority'
};

exports.connectToDb = async function(){
  try {
    mongoose.connect(`${URL}`,options)
    console.log(`Database connected..`);
  } catch (e) {
      console.log(e);
      process.exit(1);
  }
}


