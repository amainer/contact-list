const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../index');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Routes', () => {
  describe('Test All GET Routes', () => {
    it('/ should respond && return Healthcheck! ', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.be.html;
          expect(res.text).to.equal('Healthcheck!')
          expect(res).to.have.status(200);
          done();
        });
    });

    it('allVendors should respond && return vendor model object', (done) => {
      chai.request(app)
        .get('/allVendors')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          for (i = 0; i < res.body.length; i++){
            expect(res.body[i]).to.deep.to.include.all.keys('deptNbr', 'vendorRecord', 'vendorName');
            expect(res.body[i]).to.deep.to.not.include.any.keys('hello');
          }
          done();
        });
    });

    it('allContacts should respond && return contact model object', (done) => {
      chai.request(app)
        .get('/allContacts')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          for (i = 0; i < res.body.length; i++){
            expect(res.body[i]).to.deep.to.include.all.keys('firstName');
            expect(res.body[i]).to.deep.to.not.include.any.keys('hello');
          }
          done();
        });
    });
  });

  describe('Test All POST Routes', () => {
    it('Vendor should respond && return sent object', (done) => {

      let vendorObject = {
        deptNbr: 92,
        vendorRecord: '123456789',
        vendorName: 'Test',
        catNbr: 1234,
        catName: 'Test Cat',
        rmID: 'testRM',
        buyerID: 'testBuyer'
      }

      chai.request(app)
        .post('/vendor')
        .send(vendorObject)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.deptNbr).to.deep.equal(vendorObject.deptNbr);
          done();
        });
    });

    it('Contacts should respond && return sent object', (done) => {

      let contactObject = {
        firstName: 'Test firstName',
        lastName: 'Test lastName',
        email: 'Test email',
        phoneNbr: '555-555-5555',
        jobTitle: 'test Job',
        vendor: {
          deptNbr: '92',
            vendorRecord: '123456789',
            vendorName: 'Test Vendor',
            catNbr: '1234',
            catName: 'Test Category',
            rmID: 'testRM',
            buyerID: 'testBuyer'
          }

      }

      chai.request(app)
        .post('/contact')
        .send(contactObject)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.contact.firstName).to.deep.equal(contactObject.firstName);
          done();
        });
    });
  })

  describe('Test All PUT Routes', () => {
    it('Vendor should respond && return sent object', (done) => {

      let randomDept = Math.floor(Math.random()*100) + 1

      let vendorObjectPut = {
        _id: '5a3b15a57821525d38b1fc26',
        deptNbr: randomDept,
        vendorRecord: '123456789',
        vendorName: 'Test',
        catNbr: 1234,
        catName: 'Test Cat',
        rmID: 'testRM',
        buyerID: 'testBuyer'
      }

      chai.request(app)
        .put('/updateVendor')
        .send(vendorObjectPut)
        .end((err, res) => {
          console.log(err);
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.deptNbr).to.deep.equal(vendorObjectPut.deptNbr);
          done();
        });
    });

    it('Contacts should respond && return sent object', (done) => {

      let contactObjectPut = {
        _id: "5a3b20ec91699855d09fb734",
        firstName: 'New firstName',
        lastName: 'Test lastName',
        email: 'Test email',
        phoneNbr: '555-555-5555',
        jobTitle: 'test Job'
      }

      chai.request(app)
        .put('/updateContact')
        .send(contactObjectPut)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.firstName).to.deep.equal(contactObjectPut.firstName);
          done();
        });
    });
  })

});
