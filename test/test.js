const assert = require('assert');
const fs = require("fs");
const envManager = require("../envmanager.js");

// setup manager
let manager = new envManager('./test/.env_template');
let filecopy = fs.readFileSync("./test/.env_cpy");

// cleanup env
if(fs.existsSync(".env")){
  fs.unlinkSync(".env");
}

describe('envManager', function() {
  describe('#generateEnvironment()', function() {
    it('should generate an environment from a template file', function() {
      manager.generateEnvironment();
      fs.exists(".env", function(exists){
        assert.equal(true, exists);
      });

    });
  });

  describe('#generateEnvironment()', function() {
    it('throws an error if variables are not defined', function() {
      assert.throws(manager.checkVariables, Error, "Error thrown");
    });

    it('tests if environmental variables are defined', function() {
      let manager = new envManager('./test/.env_template');
      fs.writeFile('.env', filecopy, function(){
          assert.equal(true, manager.checkVariables());
      });
    });
  });
});
