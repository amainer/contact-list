const mongoose = require('mongoose');

const vendorSchema = mongoose.Schema({
  deptNbr: Number,
  vendorRecord: Number,
  vendorName: String,
  catNbr: Number,
  catName: String,
  rmID: String,
  buyerID: String,
  contacts: [{type : mongoose.Schema.Types.ObjectId, ref: 'Contact'}]
});

module.exports = mongoose.model('Vendor', vendorSchema);
