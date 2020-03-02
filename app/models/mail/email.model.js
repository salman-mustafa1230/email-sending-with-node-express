// const db = require('../../../common/db.js');
class EmailModel {
    constructor() {}
    getTemplate (emailTemplate) {
        // get template from db using unique key
        return new Promise( (resolve, reject) => { 
           
            console.log('ffff');
            resolve(false);
        });
    }
}
module.exports = new EmailModel();
