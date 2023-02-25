const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

function once(fn) {
  var returnValue,
    called = false;
  return function () {
    if (!called) {
      called = true;
      returnValue = fn.apply(this, arguments);
    }
    return returnValue;
  };
}

describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      expect([1, 2, 3].indexOf(4)).equal(-1);
    });

    it("calls the original function", function () {
      var callback = sinon.fake();
      var proxy = once(callback);

      proxy();

      expect(callback.called);
    });
  });
});
