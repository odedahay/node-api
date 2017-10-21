const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  //collections
    title: {
      type: String,
      require: true
    },
    description: {
      type: String,
    },
    duration: {
      type: String
    }
});
//documents
module.exports = mongoose.model('Job', jobSchema);
