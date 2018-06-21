const ns = '[external][controller]'

const Recommend = async (req, res, next)  =>  {
    const fn = `${ns}[Recommend]`;
    const { Recommend } = require('./backend');

    console.log(fn, 'begin');

    const items = req.body.data;

    const recommendations = await Recommend(items);

    res.json({data: recommendations});
};

const GetRoutes = async (req, res, next)  =>  {
    const fn = `${ns}[GetRoutes]`;
    const { GetItemDetails, GetRoute } = require('./backend');
    const _ = require('lodash');

    const long = req.body.long;
    const lat = req.body.lat;
    const items = req.body.items;
    const distancelimit = req.body.distancelimit;

    const details = await GetItemDetails(long, lat, items, distancelimit);

    const groups = _.groupBy(details, item => item.option);

    console.log(fn, 'groups:', JSON.stringify(groups));

    let routes = [];
    for (let gi of Object.keys(groups))  {
        const group = groups[gi];
        let total = 0;
        for (let item of group) {
            total += item.price;
        }
        const route = await GetRoute({lat, long}, group);
        routes.push({
            route: route.overview_polyline,
            distance: route.distance,
            total,
            items: group
        });
    }

    res.json({data: routes});
}

module.exports = {
    Recommend,
    GetRoutes
};