const mongodb = require('./mongodb.utils');
const Contact = require('./models/contact.model')
const Vendor = require('./models/vendor.model');

module.exports = {
  fetchAllContacts,
  fetchAllVendors,
  fetchDept,
  saveContact,
  saveVendor,
  updateContact,
  updateVendor
}

function fetchAllContacts() {
  return Contact.find({}).populate('vendor').exec();
}

function fetchAllVendors() {
  return Vendor.find({}).populate('contacts').exec();
}

function fetchDept(dept) {
  return Vendor.find({deptNbr: dept}).populate('contacts').exec();
}

function saveContact(contactToSave) {
  let vendorInfo
  let contactInfo
  return Vendor.find({
      deptNbr: contactToSave.vendor.deptNbr,
      vendorRecord: contactToSave.vendor.vendorRecord,
      vendorName: contactToSave.vendor.vendorName,
      catNbr: contactToSave.vendor.catNbr,
      catName: contactToSave.vendor.catName,
      rmID: contactToSave.vendor.rmID,
      buyerID: contactToSave.vendor.buyerID
    }).exec().then((vendorSearchResult) => {

    if (vendorSearchResult && vendorSearchResult.length > 0) {
      return vendorSearchResult[0];
    } else {
      let vendor = new Vendor({
        deptNbr: contactToSave.vendor.deptNbr,
        vendorRecord: contactToSave.vendor.vendorRecord,
        vendorName: contactToSave.vendor.vendorName,
        catNbr: contactToSave.vendor.catNbr,
        catName: contactToSave.vendor.catName,
        rmID: contactToSave.vendor.rmID,
        buyerID: contactToSave.vendor.buyerID
      });
      return vendor.save();
    }
  }).then((vendorSaved) => {

    vendorInfo = vendorSaved;

    let contact = new Contact({
      firstName: contactToSave.firstName,
      lastName: contactToSave.lastName,
      email: contactToSave.email,
      phoneNbr: contactToSave.phoneNbr,
      jobTitle: contactToSave.jobTitle,
      vendor: vendorInfo._id
    });

    return contact.save();

  }).then ((contactSaved) => {
    contactInfo = contactSaved;
    vendorInfo.contacts = vendorInfo.contacts.concat([contactInfo._id]);

    return vendorInfo.save();
  }).then((updatedInfo) => {
    const infoToReturn = {
      vendor: vendorInfo,
      contact: contactInfo
    }
    return infoToReturn
  })
}

function saveVendor(vendorToSave) {
  let vendorInfo;
  let contactInfo;
  return Vendor.find({
      deptNbr: vendorToSave.deptNbr,
      vendorRecord: vendorToSave.vendorRecord,
      vendorName: vendorToSave.vendorName,
      catNbr: vendorToSave.catNbr,
      catName: vendorToSave.catName,
      rmID: vendorToSave.rmID,
      buyerID: vendorToSave.buyerID
    }).exec().then((vendorSearchResult) => {
    if (vendorSearchResult && vendorSearchResult.length > 0) {
      return vendorSearchResult[0];
    } else {
      let vendor = new Vendor({
        deptNbr: vendorToSave.deptNbr,
        vendorRecord: vendorToSave.vendorRecord,
        vendorName: vendorToSave.vendorName,
        catNbr: vendorToSave.catNbr,
        catName: vendorToSave.catName,
        rmID: vendorToSave.rmID,
        buyerID: vendorToSave.buyerID
      });
      return vendor.save();
    }
  })
}

function updateContact(contactToUpdate) {
 return Contact.findById(contactToUpdate._id)
 .then((contactFetched) => {
   contactFetched.firstName = contactToUpdate.firstName;
   contactFetched.lastName = contactToUpdate.lastName;
   contactFetched.email = contactToUpdate.email;
   contactFetched.phoneNbr = contactToUpdate.phoneNbr;
   contactFetched.jobTitle = contactToUpdate.jobTitle;
   return contactFetched.save();
 });
}

function updateVendor(vendorToUpdate) {
 return Vendor.findById(vendorToUpdate._id)
 .then((vendorFetched) => {

   vendorFetched.deptNbr = vendorToUpdate.deptNbr;
   vendorFetched.vendorRecord = vendorToUpdate.vendorRecord;
   vendorFetched.vendorName = vendorToUpdate.vendorName;
   vendorFetched.catNbr = vendorToUpdate.catNbr;
   vendorFetched.catName = vendorToUpdate.catName;
   vendorFetched.rmID = vendorToUpdate.rmID;
   vendorFetched.buyerID = vendorToUpdate.buyerID;
   return vendorFetched.save();
 });
}
