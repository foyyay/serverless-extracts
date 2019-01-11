"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _email = require("./email");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai.default.expect();

var expect = _chai.default.expect;
describe('Checking valid emails', function () {
  describe('A valid email', function () {
    it('should be valid', function () {
      expect((0, _email.isValidEmail)('test@domain.com')).to.be.true;
    });
  });
  describe('No args', function () {
    it('should not be valid', function () {
      expect((0, _email.isValidEmail)()).to.be.false;
    });
  });
  describe('An empty string', function () {
    it('should not be valid', function () {
      expect((0, _email.isValidEmail)('')).to.be.false;
    });
  });
  describe('An email without an @', function () {
    it('should not be valid', function () {
      expect((0, _email.isValidEmail)('test_domain.com')).to.be.false;
    });
  });
  describe('An email with a single letter tld', function () {
    it('should not be valid', function () {
      expect((0, _email.isValidEmail)('test@domain.c')).to.be.false;
    });
  });
  describe('An email with spaces', function () {
    it('should not be valid with a space in the id portion', function () {
      expect((0, _email.isValidEmail)('te st@domain.com')).to.be.false;
    });
    it('should not be valid with a space in the domain portion', function () {
      expect((0, _email.isValidEmail)('test@dom ain.com')).to.be.false;
    });
    it('should not be valid with a space in the tld portion', function () {
      expect((0, _email.isValidEmail)('test@domain.c om')).to.be.false;
    });
  });
  describe('An email with special characters', function () {
    it('should be valid with a +', function () {
      expect((0, _email.isValidEmail)('te+st@domain.com')).to.be.true;
    });
    it('should be valid with a .', function () {
      expect((0, _email.isValidEmail)('te.st@domain.com')).to.be.true;
    });
    it('should be valid with a -', function () {
      expect((0, _email.isValidEmail)('te-st@domain.com')).to.be.true;
    });
  });
});