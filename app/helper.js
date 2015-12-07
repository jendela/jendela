var assign = require('object.assign').getPolyfill();
module.exports = {

  // helper function to merge multiple styles
  m() {
    var res = {};
    for (var i = 0; i < arguments.length; ++i) {
      if (arguments[i]) {
        assign(res, arguments[i])
      }
    }
    return res
  },

  numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }


};
