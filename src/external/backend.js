const ns = '[external][backend]';
const { request } = require('../utils');

const Recommend = async (items)   =>   {
    const fn = `${ns}[Recommend]`;

    // const options = {
    //     method: 'POST',
    //     url: `https://ml.googleapis.com/v1/projects/${process.env.PROJECT_ID}/models/model_rec:predict?key=${process.env.GCP_API_KEY}`,
    //     json: true,
    //     body: {
    //         instances: [0]
    //     }
    // };

    // const result = await request(options);

    // return result && result.length && result.filter(pred => items.indexOf(pred) === -1).map(pred => pred.label) || [];

    return ['paper cups', 'paper plates', 'cases of beer', 'fireworks', 'balloons', 'disposable bbq', 'chips', 'Salsa', 'disco lights', 'patio chairs', 'chips', 'streamers'];
};

const GetItemDetails = async(lat, long, items, distancelimit) =>  {
    const fn = `${ns}[GetItemDetails]`;

    console.log(fn, 'begin');

    const BigQuery = require('@google-cloud/bigquery');
    // Your Google Cloud Platform project ID
    const projectId = process.env.PROJECT_ID;

    // Creates a client
    const bigquery = new BigQuery({
        projectId: projectId
    });

    const sqlQuery = `CREATE TEMP FUNCTION RADIANS(x FLOAT64) AS (
        ACOS(-1) * x / 180
       );
       
       CREATE TEMP FUNCTION RADIANS_TO_KM(x FLOAT64) AS (
        111.045 * 180 * x / ACOS(-1)
       );
       
       CREATE TEMP FUNCTION HAVERSINE(lat1 FLOAT64, long1 FLOAT64,
                                     lat2 FLOAT64, long2 FLOAT64) AS (
        RADIANS_TO_KM(
          ACOS(COS(RADIANS(lat1)) * COS(RADIANS(lat2)) *
               COS(RADIANS(long1) - RADIANS(long2)) +
               SIN(RADIANS(lat1)) * SIN(RADIANS(lat2))))
       );
       
       SELECT *
       FROM (
       SELECT
        product_id,
        product_type,
        price,
        store_id,
        city,
        state,
        lat,
        long,
        HAVERSINE(${lat}, ${long}, lat, long) AS distance_in_km,
        row_number() over (partition by product_type) AS option
       FROM \`General.Test_Products\` inventory
       INNER JOIN \`General.Test_Stores\` stores
       ON inventory.property_id = stores.store_id
       ) temp
       WHERE lower(product_type) IN (${items && items.map(item => "'" + item.toLowerCase() + "'")})
       AND distance_in_km < ${distancelimit}
       AND option = 1
       ORDER BY option
       --LIMIT 100
       ;`;

    const options = {
        query: sqlQuery,
        useLegacySql: false,
        // queryParameters: [
        //     {
        //         "name": "@lat",
        //         "parameterType": {
        //             "type": 'FLOAT64'
        //         },
        //         "parameterValue": {
        //             "value": lat,
        //         }
        //     },
        //     {
        //         "name": "@long",
        //         "parameterType": {
        //             "type": 'FLOAT64'
        //         },
        //         "parameterValue": {
        //             "value": long,
        //         }
        //     },
        //     {
        //         "name": "@productslist",
        //         "parameterType": {
        //             "type": 'STRING'
        //         },
        //         "parameterValue": {
        //             "value": items[0],
        //         }
        //     },
        //     {
        //         "name": "@distancelimit",
        //         "parameterType": {
        //             "type": 'FLOAT64'
        //         },
        //         "parameterValue": {
        //             "value": distancelimit,
        //         }
        //     }
        // ]
    };

    const results = await bigquery.query(options);

    console.log(fn, 'results:', results);

    return results[0];
}

const GetRoute = async(origin, locations)   =>  {
    const fn = `${ns}[GetRoute]`;
    const _ = require('lodash');

    const googleMapsClient = require('@google/maps').createClient({
        key: process.env.GOOGLE_MAPS_API_KEY,
        Promise: Promise
    });

    console.log(fn, 'begin');

    const result = await googleMapsClient.directions({
        origin: `${origin.lat},${origin.long}`,
        destination: `${origin.lat},${origin.long}`,
        waypoints: `optimize:true|${locations.map(loc => '' + loc.lat + ',' + loc.long + '|')}`.slice(0, -1),
        mode:'driving',
        //departure_time: new Date()
    }).asPromise();

    const route = _.get(result, 'json.routes[0]', {legs:[]});

    console.log(fn, 'result:', route);

    let distance = 0, duration = 0;
    for (let leg of route.legs)   {
        distance += leg.distance.value;
        duration += leg.duration.value;
    }

    return {
        overview_polyline: route.overview_polyline,
        waypoints: locations,
        distance,
        duration
    };
};

module.exports = {
    Recommend,
    GetItemDetails,
    GetRoute
};