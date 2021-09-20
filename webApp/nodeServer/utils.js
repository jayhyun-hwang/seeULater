const moment = require('moment');

module.exports = {
    getDatetime: function() {
        return moment().format('YYYY-MM-DD HH:mm:ss');
    }
}