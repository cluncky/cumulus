const ns = '[external][backend]';
const { request } = require('../utils');

const Recommend = async (items)   =>   {
    const fn = `${ns}[Recommend]`;

    return ['apple', 'orange', 'banana'];
};

const GetItemDetails = async(lat, long, items, distancelimit) =>  {
    const fn = `${ns}[GetItemDetails]`;

    console.log(fn, 'begin');

    const BigQuery = require('@google-cloud/bigquery');
    // Your Google Cloud Platform project ID
    const projectId = process.env.PROJECT_ID;

    // Creates a client
    const bigquery = new BigQuery({
        projectId: projectId,

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
        row_number() over (partition by product_id) AS option
       FROM \`General.Product_Inventory\` inventory
       INNER JOIN \`General.Stores\` stores
       ON inventory.property_id = stores.store_id
       ) temp
       WHERE product_id >=1000000000
       AND product_type IN (${items.map(item => "'" + item + "'")})
       AND distance_in_km < ${distancelimit}
       LIMIT 10
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

    return results;
}

const GetRoute = async(locations)   =>  {
    const fn = `${ns}[GetRoute]`;

    const googleMapsClient = require('@google/maps').createClient({
        key: process.env.GOOGLE_MAPS_API_KEY
    });



    return route;
};

module.exports = {
    Recommend,
    GetItemDetails,
    GetRoute
};