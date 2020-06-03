const download  = require('download-git-repo');

class Bootstrap {

  constructor() {

  }

  createPcTemplate(path) {
    return new Promise(function(resolve, reject){
      download('zh918/t5-pc-template', path, function(err) {
        if (err) {
          console.log(err);
          resolve(false);
        }
        resolve(true);
        // console.log('*******************执行完成*******************');
  
      });
    });

  }
}

module.exports = new Bootstrap();