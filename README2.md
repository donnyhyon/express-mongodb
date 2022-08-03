### Building REST API with Express and Mongoose
This step by step tutorial was developed referencing the following resources:
https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes
https://rahmanfadhil.com/express-rest-api/

1. Make new project directory.
```
mkdir <folder_name>
```



---Steps:---
npm init -y
npm i express mongoose dotenv
npm i nodemon --save-dev


---within package.json file---
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node app.js",
    "dev": "nodemon ."

-----
mkdir controllers
mkdir models
mkdir routes

touch server.js
touch routes/user.js
touch models/user.model.js
touch controllers/user.controller.js

