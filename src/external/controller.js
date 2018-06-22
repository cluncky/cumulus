const ns = '[external][controller]'

const Recommend = async (req, res, next)  =>  {
    const fn = `${ns}[Recommend]`;
    const { Recommend } = require('./backend');

    console.log(fn, 'begin');

    const items = req.body.data;

    try{
        const recommendations = await Recommend(items);

        console.log(fn, 'end', recommendations);

        res.json({data: recommendations});
    } catch(e)  {
        console.error(fn, 'error:', e);
        res.status(400).end();
    }
};

const GetRoutes = async (req, res, next)  =>  {
    const fn = `${ns}[GetRoutes]`;
    const { GetItemDetails, GetRoute } = require('./backend');
    const _ = require('lodash');

    const long = req.body.long;
    const lat = req.body.lat;
    const items = req.body.items;
    const distancelimit = req.body.distancelimit;
    const timeSavingRatio = req.body.timeSavingRatio;

    let routes = [];
    try{
        const details = await GetItemDetails(long, lat, items, distancelimit);

        const groups = _.groupBy(details, item => item.option);
    
        console.log(fn, 'groups:', JSON.stringify(groups));
    
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
                duration: route.duration,
                total,
                items: group
            });
        }
    
        routes = routes.sort((a, b) => {
            return ((a.distance * timeSavingRatio) + a.total * (1 - timeSavingRatio)) >= ((b.distance * timeSavingRatio) + b.total * (1 - timeSavingRatio));
        });
    } catch(e)  {
        console.error(fn, 'error:', e);
    }
    
    

    res.json({data: routes});
}

module.exports = {
    Recommend,
    GetRoutes
};