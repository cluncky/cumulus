const ns = '[external][backend]';
const { request } = require('../utils');

const Recommend = async (items)   =>   {
    const fn = `${ns}[Recommend]`;

    return [];
};

const GetItemDetails = async(items) =>  {
    const fn = `${ns}[GetItemDetails]`;

    console.log(fn, 'begin');

    const BigQuery = require('@google-cloud/bigquery');
    // Your Google Cloud Platform project ID
    const projectId = process.env.PROJECT_ID;

    // Creates a client
    const bigquery = new BigQuery({
        projectId: projectId,
    });

    const sqlQuery = ``;

    // Query options list: https://cloud.google.com/bigquery/docs/reference/v2/jobs/query
    const options = {
        query: sqlQuery,
        useLegacySql: false, // Use standard SQL syntax for queries.
    };

    const results = await bigquery.query(options);

    console.log(fn, 'results:', results);

    return results;
}

const GetRoute = async(locations)   =>  {
    const fn = `${ns}[GetRoute]`;

    
};

module.exports = {
    Recommend,
    GetItemDetails,
    GetRoute
};