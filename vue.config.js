const fs = require('fs');

module.exports = {
  lintOnSave: false,
  pwa:{
    workboxPluginMode: "InjectManifest",
    workboxOptions :{
      swSrc:'src/sw.js'
    }
  },
  devServer: {
    // disableHostCheck: true,
    // host: 'dev.c0dr.nl',
    // port: 443,
    // http2:true,
    // https: {
    //   key: fs.readFileSync('../c0dr_nl.key'),
    //   cert: fs.readFileSync('../c0dr_nl.pem'),
    // }
  }
};
