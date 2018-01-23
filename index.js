const request = require('request');

function validateParams(casURL, tgt, callback){
    validateURL(casURL);
    if(typeof callback !== 'function' || !callback){
        var err = new Error("Invalid or no callback function supplied");
        console.log(err.stack);
        return false;
    }
    if(!tgt || tgt.length == 0){
        var err = new Error("No or empty TGT value supplied");
        console.log(err.stack);
        return false;
    }
}

function validateURL(casURL, callback){
    var message = "Invalid URL supplied: Check the following examples for reference:\n";
    var examples = "https://example.com/cas\nhttp://www.example.com/cas\nhttp://192.168.0.10:80/path/to/cas\n";
    var pattern = new RegExp('^(https?:\/\/)'+ // protocol
    '((([a-z0-9]([a-z0-9-]*[a-z0-9])*)\.)+[a-z]{2,}|'+ // domain name
    '(([0-9]{1,3}\.){3}[0-9]{1,3}))'+ // OR ip (v4) address
    '(\:[0-9]+)?(\/[-a-z[0-9]%_.~+]*)*');
    if(!pattern.test(casURL))
        return callback(Error(message + examples));
    return true;
}

exports.validateTGT = function(casURL, tgt, callback){
    validateParams(casURL, tgt, callback);
    return;
    request(casURL + '/v1/tickets/' + tgt, (error, response, body) => {
        if(error){
            return callback(error);
        }
        switch(response.statusCode){
            case 200: return callback(true);
            default: return callback(false);
        }
    });
}