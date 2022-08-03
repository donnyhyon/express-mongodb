### Building REST API with Express and Mongoose
This step by step tutorial was developed referencing the following resources:
[mdn_web docs](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes)
[rahmanfadhil] (https://rahmanfadhil.com/express-rest-api/)


1. Make new project directory. 
```
mkdir <folder_name>
```
2. Change directory into new project folder.
``` 
cd <folder_name>
```
3. Initialise npm and install dependancies.
```
npm init -y
npm i express mongoose dotenv
npm i nodemon --save-dev
```
4. Update package.json file for run scripts.
```
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node app.js",
    "dev": "nodemon ."
```
5. Make project folder structure and files.
```
mkdir controllers
mkdir models
mkdir routes

touch server.js
touch routes/user.js
touch models/user.model.js
touch controllers/user.controller.js
```
6. 
