const crypto = require('crypto');

exports.generateHash = (input) => crypto.createHash('sha256').update(input, 'utf8').digest('hex');
