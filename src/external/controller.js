const ns = '[external][controller]'

const Recommend = async (req, res, next)  =>  {
    const fn = `${ns}[Recommend]`;
    const { Recommend } = require('./backend');

    const items = req.body.data;

    const recommendations = await Recommend(items);

    res.json({data: recommendations});
};

const GetRoutes = async (req, res, next)  =>  {
    const fn = `${ns}[GetRoutes]`;
    const { GetItemDetails } = require('./backend');

    const items = req.body.data;

    const details = await GetItemDetails(items);
}

module.exports = {
    Recommend,
    GetRoutes
};