let azure = require('azure-storage');

module.exports = async function (context, req, inputTable) {
  context.log('JavaScript HTTP trigger function processed a request.');
  context.bindings.outputTable = {PartitionKey:'PWAServerless',RowKey:'Team Alpha', score:1}
//   if (req.method === "GET") {
//     context.res = {
//       body: inputTable
//     };
//     }
context.res = {
           body: inputTable
        };
  context.done();
};
