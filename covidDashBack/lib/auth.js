/*
* @author: Marcos Martin Davila
*/

let crypto = require('crypto');
let scrt = '';
class Auth {
    constructor(secret){ scrt = secret; }

    async testKey(key){ console.log('key',key);
        return new Promise((resolve,reject) => {
            try { const decipher = crypto.createDecipheriv('aes-192-cbc', crypto.scryptSync(scrt, 'salt', 24), Buffer.alloc(16, 0));
                  /*const cipher   = crypto.createCipheriv('aes-192-cbc', crypto.scryptSync(scrt, 'salt', 24), Buffer.alloc(16, 0));
                  let encrypted = cipher.update(process.env.SECRET,'utf8','hex');
                  encrypted += cipher.final('hex');
                  console.log('apiKey',encrypted);*/
                  let decrypted = decipher.update(key, 'hex', 'utf8');
                  decrypted += decipher.final('utf8');console.error((decrypted === scrt)); (decrypted === scrt)? resolve(): reject();
            } catch (e) { console.error('Error on lib.auth.testKey',e); reject({code:401,msg:e}); }
        });
    }
} module.exports = Auth;
