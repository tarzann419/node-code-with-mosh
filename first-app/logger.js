const EventEmmitter = require('events');

var url = 'http://mylogger.io/log';

class Logger extends EventEmmitter {
    log(message) {
        // send a HTTP req
        console.log(message);

        // raise an event
        this.emit('messageLogged', { id: 1, url: 'http://' });
    }
}


module.exports = Logger;