This is wrong- needs edited. 

Goal is to create a sign-up page for the document storage application.
User interacts with front end,
fills out form,
    name
    email
    dob
    telephone
    address
    contact preferences
stores users details using mongoDB
displays users details upon query.
    user GET, POST, PATCH, DELETE data.


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

---Make file structures:---
mkdir public
mkdir public/images
mkdir public/javascripts
mkdir public/stylesheets
mkdir controllers
mkdir models
mkdir routes
mkdir views

touch public/stylesheets/style.css
touch routes/index.js
touch routes/users.js
touch views/index.html
touch app.js
touch models/users.js
touch controllers/user.models.js


---within app.js---
var express = require('express');
var path = require('path');

var port = process.env.port || 3000

var app = express()

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(express.json())


app.use('/', indexRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`listening on port: ${port}`)
})

module.exports = app

---within routes/index.js---
var express = require('express')
var router = express.Router()

router.get('/', function(req, res) {
  res.send('respond with a resource')
})

module.exports = router


---within routes/users.js---
var express = require('express')
var router = express.Router()

module.exports = router
-----------------------

npm run dev    #check if web page is loading


---inside models/users.js---
var mongooose = require('mongoose')
var Schema = mongooose.Schema

var UserSchema = new Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true},
        date_of_birth: {type: Date, required: true},
        telephone: {type: Number, required: true},
        address: {type: String, required: true},
        contact_preferences: {type: Boolean, required: true}
    }
)

module.exports = mongooose.model('User', UserSchema)

---inside controllers/user.model.js---

var User = require('../models/users')

// Display list of all Users.
exports.user_list = function(req, res) {
    res.send('NOT IMPLEMENTED: User list')
}

// Display detail page for a specific User.
exports.user_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: User detail: ' + req.params.id);
}

// Display User create form on GET.
exports.user_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: User create GET')
}

// Handle User create on POST.
exports.user_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: User create POST')
}

// Display User delete form on GET.
exports.user_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: User delete GET')
}

// Handle User delete on POST.
exports.user_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: User delete POST')
}

// Display User update form on GET.
exports.user_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: User update GET')
}

// Handle User update on POST.
exports.user_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: User update POST')
}

---