const router = require('express').Router();
const contactService = require('../contact-list.service')
const Contact = require('../models/contact.model')
const Vendor = require('../models/vendor.model');
const mongodb = require('../mongodb.utils');

mongodb.createEventListeners();
mongodb.connect();

router.get('/', (req, res) => {
  res.status(200).send('Healthcheck!');
});


router.get('/allContacts', (req,res) => {
  contactService.fetchAllContacts().then((contactsFetched) => {
    res.status(200).send(contactsFetched);
  }).catch((error) => {
    res.status(500).send(error);
  })
})

router.get('/allVendors', (req,res) => {
  contactService.fetchAllVendors().then((vendorsFetched) => {
    res.status(200).send(vendorsFetched);
  }).catch((error) => {
    res.status(500).send(error);
  })
})

router.get('/dept/:dept', (req, res) => {
  contactService.fetchDept(req.params.dept).then((deptFetched) => {
    res.status(200).send(deptFetched);
  }).catch((error) => {
    res.status(500).send(error);
  })
});


router.post('/contact', (req, res) => {

  let contactData = req.body;

  contactService.saveContact(contactData).then((contactSaved) => {
    res.status(200).send(contactSaved)
  }).catch((error) => {
    res.status(500).send(error)
  })
});

router.post('/vendor', (req, res) => {
  var vendorData = req.body;
  contactService.saveVendor(vendorData).then((vendorSaved) => {
    res.status(200).send(vendorSaved)
  }).catch((error) => {
    res.status(500).send(error)
  })
});

router.put('/updateContact', (req, res) => {
  let contactData = req.body;

  contactService.updateContact(contactData)
  .then((contactUpdated) => {
    res.status(200).send(contactUpdated);
  })
  .catch((err) => {
    res.status(500).send(err);
  });
});

router.put('/updateVendor', (req, res) => {
  let vendorData = req.body;

  contactService.updateVendor(vendorData)
  .then((vendorUpdated) => {
    res.status(200).send(vendorUpdated);
  })
  .catch((err) => {
    res.status(500).send(err);
  });
});

module.exports = router;
