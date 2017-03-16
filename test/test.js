// testing framework
const assert = require('assert');

// use to verify data in .env file
const fs = require("fs");

// our function
const envManager = require("../envmanager.js");

// a json mockup of what our .env would look like unfilled, so we can use a base comparison
const env_object = {
  "MODE":"square",
  "PASSWORD":"",
  "DATABASE_CONNECTION":"",
}

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

    it('should prefill variables specified by the user', function() {
      assert.equal(manager.processEnv().MODE, env_object.MODE);
    });
  });

  describe('#processEnv()', function() {
    it('throws an error if there is no .env file', function() {

      try{
        manager.processEnv();
      } catch(e){
        assert.ok(true);
      }
    });

    it('returns an object with all the environmental variables', function() {


      assert.equal(JSON.stringify(manager.processEnv()), JSON.stringify(env_object));
    });






  });

  describe('#checkVariables()', function() {
    it('throws an error if variables are not defined', function() {
      try{
        manager.checkVariables();
      } catch(e){
        assert.ok(true);
      }
    });

    it('tests if environmental variables are defined', function() {
      fs.writeFile('.env', filecopy, function(){
        try{
          assert.equal(true, manager.checkVariables());
        } catch(e){
          assert.ok(false);
        }
      });
    });
  });
});
