var Airtable = require('airtable');

// function getTable(table)
// {
//     let reco = [];

//     Airtable.configure({
//         endpointUrl: 'https://api.airtable.com',
//         apiKey: 'pati03tXLIyNErENB.23c5d11e76903f964781771029971b5b646f660b3d090edcf2fc5ccd962b2d66'
//     });
//     var base = Airtable.base('appBAcxHY6p1Dpv3p');

//     base(table).select({
//         view: "Grid view"
//     }).eachPage(function page(records, fetchNextPage) {
//         records.forEach(function(record) {
//             reco.push(record);
//         });
//         fetchNextPage();
//     }, function done(err) {
//         if (err) { console.error(err); return; }
//     });
//     return reco;
// }

function getTable(table) {
    Airtable.configure({
        endpointUrl: 'https://api.airtable.com',
        apiKey: 'pati03tXLIyNErENB.23c5d11e76903f964781771029971b5b646f660b3d090edcf2fc5ccd962b2d66'
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
            console.log(reco);
            resolve(reco);
        });
    });
}


export { getTable };