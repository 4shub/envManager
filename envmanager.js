"use strict"

// import
const fs = require("fs");
const default_template_location = ".env_template";

class manager{
  constructor(template_location){
    if(fs.existsSync(template_location || default_template_location)){
      this.location = template_location || default_template_location;
      this.variables = this.getVariables();
    } else {
      throw "Template does not exist";
    }

  }

  getVariables(){
    return fs.readFileSync((this.location || default_template_location)).toString().split("\n").map(function(variables){
      return variables.split("=")[0];
    });
  }

  processEnv(){
    if(fs.existsSync(".env")){
      let env = fs.readFileSync(".env").toString().split("\n");
      let data = {};
      for(let i in env){
        if(env[i]){
          let variable = env[i].split("=");
          data[variable[0]] = variable[1];
        }
      }

      return data;
    } else {
      throw "Your local .env file does not exist!"
    }

  }

  checkVariables(){
    let environment = this.processEnv();
    let that = this;
    let errors = [];
    for(let index in that.variables){
      if (that.variables[index]){
        errors.push(that.variables[index]);

        for(let variable in environment){
          if(that.variables[index].toUpperCase() === variable && environment[variable]){
            errors.splice((errors.length-1), 1);
          }
        }
      }
    }

    if(errors.length){
      throw "Your environment is missing the following variables: " + errors.join(", ");
    } else {
      return true;
    }
  }

  // generates
  generateEnvironment(){
    let environment_variables = this.getVariables();
    const envExists = fs.existsSync(".env");
    if(!envExists){
      let file = "";

      for(let i in environment_variables){
        if(environment_variables[i]){ // prevents blank env variables from being made
          let variable_to_print = environment_variables[i];
          let default_value_for_variable = "";

          if(variable_to_print.indexOf("=") !== -1){
            let variable_to_print_arr = variable_to_print.split("=");

            default_value_for_variable = variable_to_print_arr[1];
            variable_to_print = variable_to_print_arr[0];
          }
          file += variable_to_print.toUpperCase() + "=" + default_value_for_variable + "\n";
        }
      }

      fs.writeFile(".env", file, (err) => {
        if (err) throw err;
        console.log('Your .env has been saved!');
      });
    } else {
      throw "Your .env file exists, please delete to recreate it!'"
    }
  }
}

module.exports = manager;
