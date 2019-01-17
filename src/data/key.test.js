import chai from 'chai';
import {
  isPrefixedKey,
  isPrefixedKeyGenerator,
  prefixedKey,
  prefixedKeyGenerator,
  prefixOfKey,
} from './key';

chai.expect();
const expect = chai.expect;

describe('Generating a prefixed key', () => {
  describe('when you pass nothing', () => {
    it('should throw an error', () => {
      expect(() => prefixedKey()).to.throw();
    });
  });
  describe('when you pass an empty string', () => {
    it('should throw an error', () => {
      expect(() => prefixedKey('')).to.throw();
    });
  });
  describe('when you pass a prefix', () => {
    it('should return a key with the prefix', () => {
      expect(prefixedKey('TeST')).to.match(/^TeST_[0-9a-z]{32}$/);
    });
  });
  describe('when you use special characters', () => {
    it('should throw an error', () => {
      expect(() => prefixedKey('$dollars')).to.throw();
    });
  });
  describe('when you use a space', () => {
    it('should throw an error', () => {
      expect(() => prefixedKey('dol lars')).to.throw();
    });
  });
});

describe('Checking isPrefixedKey', () => {
  describe('when you pass nothing', () => {
    it('should be false', () => {
      expect(isPrefixedKey()).to.be.false;
    });
  });
  describe('when you pass an empty string', () => {
    it('should be false', () => {
      expect(isPrefixedKey(undefined, '')).to.be.false;
    });
  });
  describe('when you pass a valid key with the wrong prefix', () => {
    let key = prefixedKey('right');
    it('should be false', () => {
      expect(isPrefixedKey('wrong', key)).to.be.false;
    });
  });
  describe('when you pass a valid key and no prefix', () => {
    let key = prefixedKey('test');
    it('should be true', () => {
      expect(isPrefixedKey(undefined, key)).to.be.true;
    });
  });
  describe('when you pass a valid key and the correct prefix', () => {
    let prefix = 'test';
    let key = prefixedKey(prefix);
    it('should be true', () => {
      expect(isPrefixedKey(prefix, key)).to.be.true;
    });
  });
});

describe('Using a prefixedKey generator', () => {
  describe('when generating keys', () => {
    let prefix = 'test';
    let generator = prefixedKeyGenerator(prefix);
    let keyA = generator();
    let keyB = generator();

    it('should produce valid keys', () => {
      expect(isPrefixedKey(prefix, keyA)).to.be.true;
      expect(isPrefixedKey(prefix, keyB)).to.be.true;
    });

    it('should produce different keys', () => {
      expect(keyA).to.not.equal(keyB);
    });
  });
});

describe('Using an isPrefixedKey generator', () => {
  let prefix = 'test';
  let prefixedChecker = isPrefixedKeyGenerator(prefix);
  let wildcardChecker = isPrefixedKeyGenerator();

  describe('when testing keys with the same prefix', () => {
    let key = prefixedKey(prefix);

    it('should be true for the prefixedChecker', () => {
      expect(prefixedChecker(key)).to.be.true;
    });

    it('should be true for the wildcardChecker', () => {
      expect(wildcardChecker(key)).to.be.true;
    });
  });

  describe('when testing keys with a different prefix', () => {
    let key = prefixedKey('other');

    it('should be false for the prefixedChecker', () => {
      expect(prefixedChecker(key)).to.be.false;
    });

    it('should be true for the wildcardChecker', () => {
      expect(wildcardChecker(key)).to.be.true;
    });
  });
});

describe('Using prefixOfKey', () => {
  let prefix = 'test';
  let key = prefixedKey(prefix);

  it('should pull the prefix on a valid key', () => {
    expect(prefixOfKey(key)).to.equal(prefix);
  });

  it('should return undefined for invalid an invalid key', () => {
    let noPrefix = key.replace(prefix, '');
    expect(prefixOfKey(noPrefix)).to.not.exist;
    expect(prefixOfKey('somethi_lkjasdlkfj')).to.not.exist;
    expect(prefixOfKey('')).to.not.exist;
    expect(prefixOfKey(undefined)).to.not.exist;
  });
});
