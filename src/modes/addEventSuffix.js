
const ConstantEvents = require('../constants').events;
module.exports = function (suffix) {
    let events = {};
    if (suffix) {
        for (const event in ConstantEvents) {
          events[event] = ConstantEvents[event] + '.' + suffix;
        }
      } else {
        events = ConstantEvents;
      }
      return events;
}