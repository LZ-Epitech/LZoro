import Airtable from 'airtable';

const APIKEY = "pati03tXLIyNErENB.23c5d11e76903f964781771029971b5b646f660b3d090edcf2fc5ccd962b2d66"

function getTable(table) {
    Airtable.configure({
        endpointUrl: 'https://api.airtable.com',
        apiKey: APIKEY
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
    var base = new Airtable({apiKey: APIKEY}).base('appBAcxHY6p1Dpv3p');

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

function updateInTable(ElementID, table, data)
{
    var base = new Airtable({apiKey: APIKEY}).base('appBAcxHY6p1Dpv3p');
    console.log("=============");
    console.log(data);
    console.log("=============");

    const obj = {};
    data.forEach(item => {
        const key = item[0];
        const value = item[1];
        obj[key] = value;
    });
    base(table).update([
        {
            "id": ElementID,
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

function updateInTable1v1(ElementID1, ElementID2, table, data)
{
    var base = new Airtable({apiKey: APIKEY}).base('appBAcxHY6p1Dpv3p');
    console.log("=============");
    console.log(data);
    console.log("=============");

    const obj = {};
    data.forEach(item => {
        const key = item[0];
        const value = item[1];
        obj[key] = value;
    });
    base(table).update([
        {
            "id": ElementID1,
            "fields": obj,
        },
        {
            "id": ElementID2,
            "fields": obj,
        },
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

function updateInTable2v2(ElementID1, ElementID2, ElementID3, ElementID4, table, data)
{
    var base = new Airtable({apiKey: APIKEY}).base('appBAcxHY6p1Dpv3p');
    console.log("=============");
    console.log(data);
    console.log("=============");

    const obj = {};
    data.forEach(item => {
        const key = item[0];
        const value = item[1];
        obj[key] = value;
    });
    base(table).update([
        {
            "id": ElementID1,
            "fields": obj,
        },
        {
            "id": ElementID2,
            "fields": obj,
        },
        {
            "id": ElementID3,
            "fields": obj,
        },
        {
            "id": ElementID4,
            "fields": obj,
        },
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

function createInTable(table, data)
{
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
            return;
        }
        records.forEach(function (record) {
            console.log(record.getId());
        });
    });
}


export { getTable, postInTable, updateInTable, updateInTable1v1, updateInTable2v2, createInTable };