module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');
  if (req.query.name || (req.body && req.body.name)) {
    context.res = {
      // status: 200, /* Defaults to 200 */
      body: {result:`Hello ${req.query.name || req.body.name}, ${new Date()}`}
    };
  } else {
    context.res = {
      // status: 200, /* Defaults to 200 */
      body: [{
          date: '04-06-2019 11:45:23',
          score: 8,
          name: 'Team Joe'
        },
        {
          date: '04-12-2019 14:15:12',
          score: 23,
          name: 'Team Hanna'
        },
        {
          date: '04-12-2019 15:05:45',
          score: 42,
          name: 'Team Green'
        }
      ]
    };
  }

};
