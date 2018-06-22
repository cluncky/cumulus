const ns = '[utils]';
const request = require('request');

const requestHttp = (options)   =>  {
    const fn = `${ns}[requestHttp]`;

    console.log(fn, 'request:', request);

    return new Promise((resolve, reject) =>  {
        request(options, (err, response, body)  =>  {
            console.log(fn, 'response:', response);
            if (err)    {
                return reject(err);
            }
            resolve(body);
        })
    });
};

module.exports = {
    request: requestHttp
};