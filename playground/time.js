const moment = require('moment');

// var date = new Date();
// var months = ['Jan', 'Feb', 'Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
// console.log(months[date.getMonth()]);

var createdAt = moment().valueOf();

var date = moment(createdAt);
//date.add(100, 'years').subtract(9, 'months');
console.log(date.format('MMM Do, YYYY'));
console.log(date.format('h:mm a'));