export function compose(...functions) {
  return function(data) {
    return functions.reduceRight((value, func) => func(value), data);
  };
}

export function pipe(...functions) {
  return function(data) {
    return functions.reduce((value, func) => func(value), data);
  };
}
