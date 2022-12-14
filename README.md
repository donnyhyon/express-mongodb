### Building REST API with Express and Mongoose
This step by step tutorial was developed referencing the following resources:
[mdn_web docs](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes) & [rahmanfadhil](https://rahmanfadhil.com/express-rest-api/)


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
4. Update **package.json** file for run scripts.
```
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js",
    "dev": "nodemon ."
    }
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
6. Update **package.json** "main" with new file names.
```
  "main": "server.js",
```
7. Build express server within **server.js**
```
const express = require("express")
const app = express()
const port = process.env.port || 3000

app.listen(port, () => {
	console.log(`Server running on port: ${port}`)
})
```
8. Confirm server can run in **terminal**.
```
npm run dev
```
Your terminal should confirm your server is running and display port number.

### API TDD using JEST & SUPERTEST.
9. Install Jest and Supertest frameworks.
```
npm i -D jest supertest
```
10. Update **jacakge.json** run scripts to run jest upon test command. The '--watchAll' flag auto runs tests upon change/save, (like observr for Ruby Koans). 
```
    "test": "jest --watchAll"
```
11. Create test file in root directory.
```
touch server.test.js
```
12. Build test file. 
Note: Supertest framework replaces the need for services like Postman or Insomnia i.e making GET/POST/PATCH/DELETE requests. [Supertest Docs](https://github.com/visionmedia/supertest)

Jest is for unit testing, like RSpec for Ruby. [Jest Docs](https://jestjs.io/docs/api)

Within **server.test.js**
```
const request = require('supertest')
const app = require('./server')


describe('Mesaging API', () => {
    it('GET /all_users ---> array of users and message contents', () => {
        return request(app)
            .get('/api/all_users')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            name: expect.any(String),
                            content: expect.any(String)
                        })
                    ])

                )
            })
    })

    it('GET /get_user/id ---> return specific user by ID', () => {
        return request(app)
            .get('/api/get_user/id')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        name: expect.any(String),
                        content: expect.any(String)
                    })
                )
            })
    })

    it('GET /get_user/id ---> turns 404 if ID doenst exist', () => {
        return request(app)
            .get('/get_user/1233352124142362352135y2gfvrvr')
            .expect(404)
    })

    it('POST /new_user ----> creates new user', () => {
        return request(app)
        .post('/new_user')
        .send({
            name: 'Donny',
            content: 'This is donnys content'
        })
        .expect('Content-Type', /json/)
        .expect(201).then((response) => {
            expect(response.body).toEqual(
                expect.objectContaining({
                    name: 'Donny',
                    content: 'This is donnys content'
                })
            )
        })
    })
})
```
13. Run tests- they should all fail as we have not built API yet. 
```
npm test
```

### Creating MongoDB connection.
14. Create free [MongoDB Atlas account](https://account.mongodb.com/account/login)

15. Create a cluster and connect to your cluster via MongoDB's native driver. 
Create new project
![1-create new project](./READMEimages/1_create_new_project.png)

Name new project
![2-name new project](./READMEimages/2_naming_new_project.png)

Confirming project name
![3-confirm proj name](./READMEimages/3_confirm_proj_name.png)

Create the database
![4-create database](./READMEimages/4_create_database.png)

Confirm database settings- use the free version!
![5-database settings](./READMEimages/5_use_free_settings.png)

Create a new cluster
![6-create cluster](./READMEimages/6_create_defaukt_cluster.png)

Create username and password for cluster
![7-create user and password](./READMEimages/7_create_user_pass.png)

Wait for cluster to build
![8-cluster loading](./READMEimages/8_waiting_for_cluster.png)

Connect to the cluster
![9-connect to cluster](./READMEimages/9_connect_cluster.png)

Choose middle option
![10-connect to cluster](./READMEimages/10_connect_to_cluster.png)

Copy the application code for next step. 
![11-cluster application code](./READMEimages/11_cluster_application_code.png)

16. Create new **.env** file to store database application code.
```
touch .env
```
17. Copy and paste the application code into **.env** file. Replace <username> & <password> with the password you created during cluster set-up. The < > should be deleted.
```
ATLAS_URI = mongodb+srv://<username>:<password>@cluster0.ib7cc.mongodb.net/?retryWrites=true&w=majority
```
18. Setup Mongoose within **server.js** file.
```
const mongoose = require('mongoose')
require('dotenv').config();

const uri = process.env.ATLAS_URI
mongoose.connect(uri)    
const db = mongoose.connection

app.use(express.json())

db.on('error', (error) => {
    console.log(error)
})

db.once('connected',() => {
    console.log('Database Connected')
})
```
You should get a message in the terminal confirming database connection. 

19. Creating database models / schema. In **models/user.model.js**
```
const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
	name: String,
	content: String,
})

module.exports = mongoose.model("userSchema", userSchema)
```
20. Creating controllers. In **controllers/user.controller.js**
```
const userModel = require('../models/user.model')

exports.getAllUsers = async (req,res) => {
    const all_users = await userModel.find()
    res.send(all_users)
}

exports.postNewUser = async (req,res) => {
    const new_user = new userModel({
        name: req.body.name,
        content: req.body.content
    })
    await new_user.save()
    res.send(new_user)
}

exports.getUserByID = async(req,res) => {
    try{
        const one_user = await userModel.findOne({ _id: req.params.id })
        res.send(one_user)
    } catch {
        res.status(404)
        res.send({ error: "User doesn't exist!" })
    }
}

exports.editUserByID = async(req,res) => {
    try {
        const edit_user = await userModel.findOne({ _id: req.params.id })
    
        if (req.body.name) {
            edit_user.name = req.body.name
        }
    
        if (req.body.content) {
            edit_user.content = req.body.content
        }
    
        await edit_user.save()
        res.send(edit_user)
    } catch {
        res.status(404)
        res.send({ error: "User doesn't exist!" })
    }
}

exports.deleteUserByID = async (req,res) => {
    try {
        await userModel.deleteOne({ _id: req.params.id })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "Post doesn't exist!" })
    }
}
```

21. Create routes to handle CRUD actions. In **routes/user.js**
```
const express = require("express")
const router = express.Router()
const User = require("../models/user.model") 
const user_controller = require('../controllers/user.controller')

router.get("/all_users", user_controller.getAllUsers)

router.post('/new_user', user_controller.postNewUser)

router.get("/get_user/:id", user_controller.getUserByID)

router.patch("/edit_user/:id", user_controller.editUserByID)

router.delete("/delete_user/:id", user_controller.deleteUserByID)

module.exports = router
```
22. Update **server.js** to include routes.  
```
const routes = require('./routes/user')
```
###Full Code

####server.js
```
const express = require("express")
const app = express()
const port = process.env.port || 3000
const mongoose = require('mongoose')
const routes = require('./routes/user')

require('dotenv').config();
const uri = process.env.ATLAS_URI

mongoose.connect(uri)    
const db = mongoose.connection

app.use(express.json())


app.listen(port, () => {
	console.log(`Server running on port: ${port}`)
})

app.use('/api', routes)

db.on('error', (error) => {
    console.log(error)
})

db.once('connected',() => {
    console.log('Database Connected')
})
```
#### models/user.model.js
```
const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
	name: String,
	content: String,
})

module.exports = mongoose.model("userSchema", userSchema)
```
#### controllers/user.controller.js
```
const userModel = require('../models/user.model')

exports.getAllUsers = async (req,res) => {
    const all_users = await userModel.find()
    res.send(all_users)
}

exports.postNewUser = async (req,res) => {
    const new_user = new userModel({
        name: req.body.name,
        content: req.body.content
    })
    await new_user.save()
    res.send(new_user)
}

exports.getUserByID = async(req,res) => {
    try{
        const one_user = await userModel.findOne({ _id: req.params.id })
        res.send(one_user)
    } catch {
        res.status(404)
        res.send({ error: "User doesn't exist!" })
    }
}

exports.editUserByID = async(req,res) => {
    try {
        const edit_user = await userModel.findOne({ _id: req.params.id })
    
        if (req.body.name) {
            edit_user.name = req.body.name
        }
    
        if (req.body.content) {
            edit_user.content = req.body.content
        }
    
        await edit_user.save()
        res.send(edit_user)
    } catch {
        res.status(404)
        res.send({ error: "User doesn't exist!" })
    }
}

exports.deleteUserByID = async (req,res) => {
    try {
        await userModel.deleteOne({ _id: req.params.id })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "Post doesn't exist!" })
    }
}
```
#### routes/users.js
```
const express = require("express")
const router = express.Router()
const User = require("../models/user.model") 
const user_controller = require('../controllers/user.controller')

router.get("/all_users", user_controller.getAllUsers)

router.post('/new_user', user_controller.postNewUser)

router.get("/get_user/:id", user_controller.getUserByID)

router.patch("/edit_user/:id", user_controller.editUserByID)

router.delete("/delete_user/:id", user_controller.deleteUserByID)

module.exports = router
```