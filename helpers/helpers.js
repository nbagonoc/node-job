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
  isEqual: (a, b, option) => {
    if (a == b) {
      return option.fn(this);
    } else {
      return option.inverse(this);
    }
  },

  // beautify the date format thanks to moment
  formatDate: (date, format) => {
    return moment(date).format(format);
  }
};
