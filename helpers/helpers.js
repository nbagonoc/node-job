const moment = require("moment");

module.exports = {
  // to get the value of the selected option used for edit page view
  select: function(selected, options) {
    return options
      .fn(this)
      .replace(
        new RegExp(' value="' + selected + '"'),
        '$&selected="selected"'
      );
  },

  // compare value
  isEqual: function(a, b, options) {
    if (a == b) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  },

  // compare value. USE THIS ISTEAD! FUCK ARROWFUNCTIONS!!!!
  isEqual2: function(a, b, options) {
    if (a == b) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  },

  // beautify the date format thanks to moment
  formatDate: (date, format) => {
    return moment(date).format(format);
  }
};
