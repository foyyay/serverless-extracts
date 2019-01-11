import chai from 'chai';
import { isValidEmail } from './email';

chai.expect();
const expect = chai.expect;

describe('Checking valid emails', () => {
  describe('A valid email', () => {
    it('should be valid', () => {
      expect(isValidEmail('test@domain.com')).to.be.true;
    });
  });
  describe('No args', () => {
    it('should not be valid', () => {
      expect(isValidEmail()).to.be.false;
    });
  });
  describe('An empty string', () => {
    it('should not be valid', () => {
      expect(isValidEmail('')).to.be.false;
    });
  });
  describe('An email without an @', () => {
    it('should not be valid', () => {
      expect(isValidEmail('test_domain.com')).to.be.false;
    });
  });
  describe('An email with a single letter tld', () => {
    it('should not be valid', () => {
      expect(isValidEmail('test@domain.c')).to.be.false;
    });
  });
  describe('An email with spaces', () => {
    it('should not be valid with a space in the id portion', () => {
      expect(isValidEmail('te st@domain.com')).to.be.false;
    });
    it('should not be valid with a space in the domain portion', () => {
      expect(isValidEmail('test@dom ain.com')).to.be.false;
    });
    it('should not be valid with a space in the tld portion', () => {
      expect(isValidEmail('test@domain.c om')).to.be.false;
    });
  });
  describe('An email with special characters', () => {
    it('should be valid with a +', () => {
      expect(isValidEmail('te+st@domain.com')).to.be.true;
    });
    it('should be valid with a .', () => {
      expect(isValidEmail('te.st@domain.com')).to.be.true;
    });
    it('should be valid with a -', () => {
      expect(isValidEmail('te-st@domain.com')).to.be.true;
    });
  });
});
