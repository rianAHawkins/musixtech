var aes256 = require('aes256');

var key = 'FireFlyPleaseDontLie26';
var plaintext = '';//FreeMyDon
// var buffer = Buffer.from(plaintext);

var cipher = aes256.createCipher(key);

// var encryptedPlainText = cipher.encrypt(plaintext);
// log(encryptedPlainText)
// var decryptedPlainText = cipher.decrypt(encryptedPlainText);
// log(decryptedPlainText)
// // plaintext === decryptedPlainText
// log(buffer)
// var encryptedBuffer = cipher.encrypt(buffer);
// log(encryptedBuffer)
// var decryptedBuffer = cipher.decrypt(encryptedBuffer);
// log(decryptedBuffer.toString('utf8'));
// plaintext === decryptedBuffer.toString('utf8)

function encrypt(ptext){
    return cipher.encrypt(ptext);
}

function decrypt(ptext){
    return cipher.decrypt(ptext);
}

//console log replacment
function log(x)
{
  console.log(x);
}


module.exports = {encrypt,decrypt}
