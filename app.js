const express = require('express'); // loads the express package
const { engine } = require('express-handlebars'); // loads handlebars for Express
const session = require('express-session');
const cookieParser = require('cookie-parser');
const port = 8080; // defines the port
const app = express(); // creates the Express application
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('projects-jl.db');

// defines handlebars engine
app.engine('handlebars', engine());
// defines the view engine to be handlebars
app.set('view engine', 'handlebars');
// defines the views directory
app.set('views', './views');

// define static directory "public" to access css/ and img/
app.use(express.static('public'))
app.use((req,res, next)=>{
  console.log("req. URL: ", req.url)
  next()
})
db.run("CREATE TABLE experience (pid INTEGER PRIMARY KEY, pname TEXT NOT NULL, pyear INTEGER NOT NULL, pdesc TEXT NOT NULL, ptype TEXT NOT NULL, pimgURL TEXT NOT NULL)", (error) => {
  if (error) {
    // tests error: display error
    console.log("ERROR: ", error)
  } else {
    // tests error: no error, the table has been created
    console.log("---> Table experience created!")

    const experience=[
      { "id":"1", "name":"psychiatric assistant nurse", "type":"psychiatric section(Ryhov Hospital Jönköping)", "desc": "Involvement in healthcare within closed psychiatric care.", "year": 2021, "dev":"", "url":"/img/psyk.jpg" },
      { "id":"2", "name":"Security Officer", "type":"CSG", "desc": "TWork in Stockholm's public transportation system as a security guard responsible for maintaining public order", "year": 2018, "url":"/img/OV.jpg" },
      { "id":"3", "name":"Vice CEO", "type":"Elite Sales Team INT AB", "desc": "Own business in retail", "year": 2018, "url":"/img/EST.jpg" },
      { "id":"4", "name":"Military nurse(never worked as it)", "desc": "Trained at FbU to become military nurse, but never worked as it", "year": 2014, "type":"Försvarsutbildarna", "url":"/img/militarynurse.jpg" },
 
    ]
    // inserts projects
    experience.forEach( (oneProject) => {
      db.run("INSERT INTO experience (pid, pname, pyear, pdesc, ptype, pimgURL) VALUES (?, ?, ?, ?, ?, ?)", [oneProject.id, oneProject.name, oneProject.year, oneProject.desc, oneProject.type, oneProject.url], (error) => {
        if (error) {
          console.log("ERROR: ", error)
        } else {
          console.log("Line added into the experience table!")
        }
      })
    })
  }
})
db.run("CREATE TABLE skills (sid INTEGER PRIMARY KEY, sname TEXT NOT NULL, sdesc TEXT NOT NULL, stype TEXT NOT NULL)", (error) => {
  if (error) {
    // tests error: display error
    console.log("ERROR: ", error)
  } else {
    // tests error: no error, the table has been created
    console.log("---> Table skills created!")

    const skills=[
      {"id":"1", "name": "Security Officer", "type": "public safety", "desc": "worked as a security officer in Stockholm night time."},
      {"id":"2", "name": "Python", "type": "Programming language", "desc": "Programming with Python."},
      {"id":"3", "name": "Java", "type": "Programming language", "desc": "Programming with Java."},
      {"id":"4", "name": "ImageJ", "type": "Framework", "desc": "Java Framework for Image Processing."},
      {"id":"5", "name": "Javascript", "type": "Programming language", "desc": "Programming with Javascript on the client side."},
      {"id":"6", "name": "Node", "type": "Programming language", "desc": "Programming with Javascript on the server side."},
      {"id":"7", "name": "Express", "type": "Framework", "desc": "A framework for programming Javascript on the server side."},
      {"id":"8", "name": "Scikit-image", "type": "Library", "desc": "A library for Image Processing with Python."},
      {"id":"9", "name": "OpenCV", "type": "Library", "desc": "A library for Image Processing with Python."},
    ]

    // inserts skills
    skills.forEach( (oneSkill) => {
      db.run("INSERT INTO skills (sid, sname, sdesc, stype) VALUES (?, ?, ?, ?)", [oneSkill.id, oneSkill.name, oneSkill.desc, oneSkill.type], (error) => {
        if (error) {
          console.log("ERROR: ", error)
        } else {
          console.log("Line added into the skills table!")
        }
      })
    })
  }
})
/*
// MODEL (DATA)
const humans = [
    {id: "0", name: "Jerome"}, 
    {id: "1", name: "Mira"},
    {id: "2", name: "Linus"}, 
    {id: "3", name: "Susanne"}, 
    {id: "4", name: "Jasmin"}, 
]
const humanss = [
  {id: "0", name: "Jerome"}, 
  {id: "1", name: "Mira"},
  {id: "2", name: "Linus"}, 
  {id: "3", name: "Susanne"}, 
  {id: "9", name: "Jasmin"}, 
]
*/
// CONTROLLER (THE BOSS)
// defines route "/"
// renders a view WITHOUT DATA
app.get('/', (req, res) => {
  res.render('home');
});


// defines route "/humans"
app.get('/Education', (req, res) => {
  res.render('Education');
});


// renders a view WITH DATA!!!
app.get('/experience', (req, res) => {
  db.all("SELECT * FROM experience", function (error, theProjects) {
      if (error) {
          const model = {
              dbError: true,
              theError: error,
              experience: []
          }
          // renders the page with the model
          res.render("experience.handlebars", model)
      }
      else {
          const model = {
              dbError: false,
              theError: "",
              projects: theProjects
          }
          // renders the page with the model
          res.render("experience.handlebars", model)
      }
    })
});

// defines the final default route 404 NOT FOUND
app.use(function(req,res){
  res.status(404).render('404.handlebars');
});

/*________________________________________Cookie__________________________________*/
app.get("/create-cookie", function (request, response) {
  console.log("Route: " + request.url);
  response.cookie("lastVisit", Date.now());
  response.end();
});

app.use(cookieParser());

app.get("/log-cookie", function (request, response) {
  let counter = 1;
  if (request.cookies.counter) {
      counter = parseInt(request.cookies.counter) + 1;
  }
  response.cookie("counter", counter);

  console.log("Route: ", request.url);
  console.log("Cookies: " + JSON.stringify(request.cookies));

  const lastVisit = parseInt(request.cookies.lastVisit);
  console.log("Your last visit: " + lastVisit);
  const counterCookie = parseInt(request.cookies.counter);
  console.log("Number of visits: ", counterCookie);
  response.end();
});
/*________________________________________session__________________________________*/
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: 'This123IsASecret678Sentence'
}));

app.get("/create-session", function (request, response) {
  console.log("Route: " + request.url);
  let counter = 1;
  if (request.session.counter) {
      counter = request.session.counter + 1;
  }
  request.session.counter = counter;
  request.session.firstName = "Arya";
  response.end();
});

app.get("/log-session", function (request, response) {
  console.log("Route: " + request.url);
  console.log("Session: " + JSON.stringify(request.session));
  const counter = parseInt(request.session.counter);
  console.log("number of visits: " + counter);
  const fName = request.session.firstName;
  console.log("Hello, " + fName);
  response.end();
});

// runs the app and listens to the port
app.listen(port, () => {
    console.log(`Server running and listening on port ${port}...`)
})

/*




*/