# Text-Search

> A Full stack application for inserting the questions into database and retrieving them by searching

> Dependencies/Libraries
```
Express
Nodemon (optional)
node-sass-middleware
body-parser
mongoose
express-ejs-layouts
express-partial
ejs
```

### Setting up the project
```
Clone the project from here
There are two ways to connect to Mongo DB
If you want to use the local mongo db
> Then just provide the local db name in environment.js file which is in config folder
> Then uncomment the lines which is used for connecting to local db and comment the lines which is used to connect to Atlas
If you want to use Mongo DB Atlas
> Then provide all the details (username, password, collection, cluster) in evironment.js file which is in config folder
> Then uncomment the lines which is used for connecting to mongo atlas and comment the lines which is used to connect to local
Execute node index.js command
```

### Folder Structure
```
    ├── index.js
    ├── package.json
    ├── assests
    |   ├── css
    |   |   ├── home.css
    |   ├── js
    |   |   ├── home.js
    |   ├── scss
    |   |   ├── home.scss
    ├── config
    |   ├── mongoose.js
    |   ├── environment.js    
    ├── controllers
    |   ├── home_controller.js  
    |   ├── questions_controller.js     
    ├── models
    │   ├── question.js
    ├── routes
    |   ├── index.js  
    |   ├── question.js
    ├── views
    |   ├── _footer.ejs  
    |   ├── _header.ejs
    |   ├── home.js  
    |   ├── layout.js
    ├── .gitignore
```
