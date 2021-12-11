const crypto = require('crypto');
const algorithm = 'aes256';
const salt = '900150983cd24fb0d6963f7d28e17f72';
const cryptoEncoding = 'base64';


const cipher = crypto.createCipher(algorithm, salt);
const encryptedText = cipher.update(text, 'utf8', cryptoEncoding) + cipher.final(cryptoEncoding);


const decipher = crypto.createDecipher(algorithm, salt);
const decryptedText = decipher.update(encryptedText, cryptoEncoding, 'utf8') + decipher.final('utf8');