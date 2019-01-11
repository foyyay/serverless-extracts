import deepFilter from 'deep-filter';

export * from './date';
export * from './email';
export * from './key';
export * from './shape';

function notEmpty(value) {
  var key;

  if (Array.isArray(value)) {
    return value.length > 0;
  } else if (!!value && typeof value === 'object' && value.constructor === Object) {
    for (key in value) {
      return true;
    }
    return false;
  } else if (typeof value === 'string') {
    return value.length > 0;
  } else {
    return value != null;
  }
}

export function deepFilterNotEmpty(data) {
  return deepFilter(data, notEmpty);
}

export function readable(obj) {
  if (typeof obj === 'string') {
    return obj;
  }

  try {
    return JSON.stringify(obj, null, 2);
  } catch (err) {
    return String(obj);
  }
}
