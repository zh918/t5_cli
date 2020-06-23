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
      });
    });
  }

  createMobileTemplate(path) {
    return new Promise(function(resolve, reject){
      download('zh918/t5-mobile-template', path, function(err) {
        if (err) {
          console.log(err);
          resolve(false);
        }
        resolve(true);
      });
    });
  }

}

module.exports = new Bootstrap();