const crypto = require('crypto');

module.exports={
    secret: 'abcdefg_@@&jijoi',
    sha: function(str){
        const hash = crypto.createHmac('sha256', this.secret)
            .update(str)
            .digest('hex');
        return hash
    }
}