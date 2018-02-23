/* global describe, it, before */

import chai from 'chai';
import { prefixedKey, validEmail } from '../src';

chai.expect();
const expect = chai.expect;

describe('Generating a prefixed key', () => {
  describe('when I pass nothing', () => {
    it('should return a key with no prefix', () => {
      expect(prefixedKey()).to.match(/^[0-9a-z]{32}$/);
    });
  });
  describe('when I pass a prefix', () => {
    it('should return a key with the prefix', () => {
      expect(prefixedKey('TeST')).to.match(/^TeST_[0-9a-z]{32}$/);
    });
  });
  describe('when I pass a prefix and join char', () => {
    it('should return a key with the prefix', () => {
      expect(prefixedKey('TeST', '@')).to.match(/^TeST@[0-9a-z]{32}$/);
    });
  });
});

describe('Checking valid emails', () => {
  describe('A valid email', () => {
    expect(validEmail('test@domain.com')).to.be.true;
  });
  describe('No args', () => {
    it('should not be valid', () => {
      expect(validEmail()).to.be.false;
    });
  });
  describe('An empty string', () => {
    it('should not be valid', () => {
      expect(validEmail('')).to.be.false;
    });
  });
  describe('An email without an @', () => {
    it('should not be valid', () => {
      expect(validEmail('test_domain.com')).to.be.false;
    });
  });
  describe('An email with a single letter tld', () => {
    it('should not be valid', () => {
      expect(validEmail('test@domain.c')).to.be.false;
    });
  });
  describe('An email with spaces', () => {
    it('should not be valid with a space in the id portion', () => {
      expect(validEmail('te st@domain.com')).to.be.false;
    });
    it('should not be valid with a space in the domain portion', () => {
      expect(validEmail('test@dom ain.com')).to.be.false;
    });
    it('should not be valid with a space in the tld portion', () => {
      expect(validEmail('test@domain.c om')).to.be.false;
    });
  });
  describe('An email with special characters', () => {
    it('should be valid with a +', () => {
      expect(validEmail('te+st@domain.com')).to.be.true;
    });
    it('should be valid with a .', () => {
      expect(validEmail('te.st@domain.com')).to.be.true;
    });
    it('should be valid with a -', () => {
      expect(validEmail('te-st@domain.com')).to.be.true;
    });
  });
});
