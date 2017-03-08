# envmanager

`envManager` is a npm module that allow you to specify, validate and check local environmental variables. It works best with [`dotenv`](https://github.com/motdotla/dotenv) as it was created for that.

## Install
```bash
npm install envmanager --save
```
## Usage
To use envmanager, you must create a file called `.env_template` on your root directory. This will allow envmanager to generate and test your env file. Your `.env_template` should just include each variable you would like to include in your `.env` such as:

```text
database_uri
password
username
```
To add defaults for your `.env`, do the following

```
password=actualpassword
```

After your `.env_template` has been configured, you should run `node ./node_modules/envmanager/envmanager.js generateEnv` to generate your environment. For best practices for your developers, you should insert that command into your package.json as the following:

```json
...
"scripts": {
  "env": "node ./node_modules/envmanager/envmanager.js generateEnv"
},
...
```

and run the program as `npm run env`.

In your program, as early as you can, usually just in your `index.js`, add the following code:

```javascript
const envManager = require("envmanager");


if(envManager.checkVariables()){
  // start the rest of your code
}

```

Note, as of now the envmanager will throw an exception ending your program if variables are not properly assigned.

## Testing
```bash
npm test
```

## FAQ
** Why did you make this program? **
This system was originally built for HackMerced to allow student developers to easily get started on contributing to our projects.

** Should I commit the .env file **
Please don't, add it to your .gitignore, otherwise people will get to it!
