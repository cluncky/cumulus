const ns = '[user][controller]'

const InitDB = async(req, res, next)  =>  {
    const fn = `${ns}[InitDB]`;
    const { init } = require('../user/model');

    console.log(fn, 'begin');

    // Create the "visits" table
    
    await init();

    console.log(fn, 'init success');

    res.json({data: 'InitDB successful.'});
};

module.exports = {
    InitDB
};