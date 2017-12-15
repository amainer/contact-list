const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNbr: String,
  jobTitle: String,
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor'}
})

module.exports = mongoose.model('Contact', contactSchema);
