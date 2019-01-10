"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _key = require("./key");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai.default.expect();

var expect = _chai.default.expect;
describe('Generating a prefixed key', function () {
  describe('when you pass nothing', function () {
    it('should throw an error', function () {
      expect(function () {
        return (0, _key.prefixedKey)();
      }).to.throw();
    });
  });
  describe('when you pass an empty string', function () {
    it('should throw an error', function () {
      expect(function () {
        return (0, _key.prefixedKey)('');
      }).to.throw();
    });
  });
  describe('when you pass a prefix', function () {
    it('should return a key with the prefix', function () {
      expect((0, _key.prefixedKey)('TeST')).to.match(/^TeST_[0-9a-z]{32}$/);
    });
  });
  describe('when you use special characters', function () {
    it('should throw an error', function () {
      expect(function () {
        return (0, _key.prefixedKey)('$dollars');
      }).to.throw();
    });
  });
  describe('when you use a space', function () {
    it('should throw an error', function () {
      expect(function () {
        return (0, _key.prefixedKey)('dol lars');
      }).to.throw();
    });
  });
});
describe('Checking isPrefixedKey', function () {
  describe('when you pass nothing', function () {
    it('should be false', function () {
      expect((0, _key.isPrefixedKey)()).to.be.false;
    });
  });
  describe('when you pass an empty string', function () {
    it('should be false', function () {
      expect((0, _key.isPrefixedKey)(undefined, '')).to.be.false;
    });
  });
  describe('when you pass a valid key with the wrong prefix', function () {
    var key = (0, _key.prefixedKey)('right');
    it('should be false', function () {
      expect((0, _key.isPrefixedKey)('wrong', key)).to.be.false;
    });
  });
  describe('when you pass a valid key and no prefix', function () {
    var key = (0, _key.prefixedKey)('test');
    it('should be true', function () {
      expect((0, _key.isPrefixedKey)(undefined, key)).to.be.true;
    });
  });
  describe('when you pass a valid key and the correct prefix', function () {
    var prefix = 'test';
    var key = (0, _key.prefixedKey)(prefix);
    it('should be true', function () {
      expect((0, _key.isPrefixedKey)(prefix, key)).to.be.true;
    });
  });
});
describe('Using a prefixedKey generator', function () {
  describe('when generating keys', function () {
    var prefix = 'test';
    var generator = (0, _key.prefixedKeyGenerator)(prefix);
    var keyA = generator();
    var keyB = generator();
    it('should produce valid keys', function () {
      expect((0, _key.isPrefixedKey)(prefix, keyA)).to.be.true;
      expect((0, _key.isPrefixedKey)(prefix, keyB)).to.be.true;
    });
    it('should produce different keys', function () {
      expect(keyA).to.not.equal(keyB);
    });
  });
});
describe('Using an isPrefixedKey generator', function () {
  var prefix = 'test';
  var prefixedChecker = (0, _key.isPrefixedKeyGenerator)(prefix);
  var wildcardChecker = (0, _key.isPrefixedKeyGenerator)();
  describe('when testing keys with the same prefix', function () {
    var key = (0, _key.prefixedKey)(prefix);
    it('should be true for the prefixedChecker', function () {
      expect(prefixedChecker(key)).to.be.true;
    });
    it('should be true for the wildcardChecker', function () {
      expect(wildcardChecker(key)).to.be.true;
    });
  });
  describe('when testing keys with a different prefix', function () {
    var key = (0, _key.prefixedKey)('other');
    it('should be false for the prefixedChecker', function () {
      expect(prefixedChecker(key)).to.be.false;
    });
    it('should be true for the wildcardChecker', function () {
      expect(wildcardChecker(key)).to.be.true;
    });
  });
});