const download  = require('download-git-repo');

class Bootstrap {

  constructor() {

  }

  createPcTemplate(path) {
    console.log(path);
    download('zh918/t5-pc-template', path, function(err) {
      if (err) {
        console.log(err);
      }

      console.log('执行完成');

    });
  }
}

module.exports = new Bootstrap();