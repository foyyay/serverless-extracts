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

export function returnAsJSON() {
  return function returnAsJSONWrapper(func) {
    return async function returnAsJSONWrapped(event, context) {
      console.log('returnAsJSON received event:', JSON.stringify(event, null, 2));
      let result = await func(event, context);
      console.log('returnAsJSON received result:', JSON.stringify(result, null, 2));

      return {
        isBase64Encoded: false,
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result),
      };
    };
  };
}
