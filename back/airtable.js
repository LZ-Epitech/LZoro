import Airtable from 'airtable';

const apiKey = process.env.API_KEY

function getTable(table) {
    Airtable.configure({
        endpointUrl: 'https://api.airtable.com',
        apiKey: apiKey
    });
    var base = Airtable.base('appBAcxHY6p1Dpv3p');
    let reco = [];

    return new Promise((resolve, reject) => {

        base(table).select({
            view: "Grid view"
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function(record) {
                reco.push(record);
            });
            fetchNextPage();
        }, function done(err) {
            if (err) {
                console.error(err);
                reject(err);
                return;
            }
            resolve(reco);
        });
    });
}

function postInTable(table, data)
{
    var base = new Airtable({apiKey: apiKey}).base('appBAcxHY6p1Dpv3p');

    const obj = {};
    data.forEach(item => {
        const key = item[0];
        const value = item[1];
        obj[key] = value;
    });
    base(table).create([
        {
            "fields": obj,
        }
    ], function(err, records) {
        if (err) {
            console.error(err);
            return null;
        }
        if (records && records.length > 0) {
            const firstRecordId = records[0].getId();
            return firstRecordId;
        } else {
            console.log('Aucun enregistrement créé.');
            return;
        }
    });
}

export { getTable, postInTable };