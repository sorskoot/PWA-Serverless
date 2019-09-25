let azure = require('azure-storage');

module.exports = async function (context, req, inputTable) {

    if (req.method === "GET") {
        if (req.query.matchId) {
            const points =
                inputTable.filter(l => l.RowKey === req.query.matchId)[0];
            context.res = {
                body: points ? points.score : 0
            }
        } else {
            context.res = {
                body: inputTable
            }
        }

    } else if (req.method === "POST") {
        if (typeof req.body != 'undefined' && typeof req.body == 'object') {
            for (let i = 0; i < req.body.length; i++) {
                const element = req.body[i];
                const score = {
                    PartitionKey: "ScoreCounter",
                    RowKey: `${element.matchId}`,
                    score: element.score,
                    date: element.date
                }
                const connectionString = process.env.dotnetconfpwaserverless_STORAGE;
                const tableService = azure.createTableService(connectionString);
                tableService.insertOrReplaceEntity('Scores', score, (error, result, response) => { });
            }
            context.res = { status: 204 };
        }
    }
};