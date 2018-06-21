const ns = '[external][controller]'

const Recommend = async (req, res, next)  =>  {
    const fn = `${ns}[Recommend]`;
    const { Recommend } = require('./backend');

    const items = req.body.data;

    const recommendations = await Recommend(items);

    res.json({data: ['apple', 'orange', 'banana']});
};

const GetRoutes = async (req, res, next)  =>  {
    const fn = `${ns}[GetRoutes]`;
    const { GetItemDetails, GetRoute } = require('./backend');

    const long = req.body.long;
    const lat = req.body.lat;
    const items = req.body.items;
    const distancelimit = req.body.distancelimit;

    const details = await GetItemDetails(long, lat, items, distancelimit);

    res.json({data: details});
}

module.exports = {
    Recommend,
    GetRoutes
};