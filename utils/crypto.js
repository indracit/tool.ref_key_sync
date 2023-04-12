//Checking the crypto module
const crypto = require('crypto');
const algorithm = 'aes-128-cbc'; //Using AES encryption
const key = 'indracit1234';
const iv = Buffer.alloc(16);


//Encrypting text
    function encrypt(text) {
    let cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
    let encrypted = cipher.update(text,'utf8','base64');
    encrypted += cipher.final('base64')
    return encrypted
    }

// Decrypting text
function decrypt(text) {
    let decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
    let decrypted = decipher.update(text,'base64','utf-8');
    decrypted += decipher.final('utf-8')
    return decrypted;
}

// var res = encrypt('ij')
// console.log(decrypt(res));


module.exports={encrypt,decrypt}
