"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compose = compose;
exports.pipe = pipe;
exports.returnAsJSON = returnAsJSON;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function compose() {
  for (var _len = arguments.length, functions = new Array(_len), _key = 0; _key < _len; _key++) {
    functions[_key] = arguments[_key];
  }

  return function (data) {
    return functions.reduceRight(function (value, func) {
      return func(value);
    }, data);
  };
}

function pipe() {
  for (var _len2 = arguments.length, functions = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    functions[_key2] = arguments[_key2];
  }

  return function (data) {
    return functions.reduce(function (value, func) {
      return func(value);
    }, data);
  };
}

function returnAsJSON() {
  return function returnAsJSONWrapper(func) {
    return (
      /*#__PURE__*/
      function () {
        var _returnAsJSONWrapped = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee(event, context) {
          var result;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  console.log('returnAsJSON received event:', JSON.stringify(event, null, 2));
                  _context.next = 3;
                  return func(event, context);

                case 3:
                  result = _context.sent;
                  console.log('returnAsJSON received result:', JSON.stringify(result, null, 2));
                  return _context.abrupt("return", {
                    isBase64Encoded: false,
                    statusCode: 200,
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(result)
                  });

                case 6:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function returnAsJSONWrapped(_x, _x2) {
          return _returnAsJSONWrapped.apply(this, arguments);
        }

        return returnAsJSONWrapped;
      }()
    );
  };
}