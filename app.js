const express = require('express'); // loads the express package
const { engine } = require('express-handlebars'); // loads handlebars for Express
const session = require('express-session');
const cookieParser = require('cookie-parser');
const port = 8080; // defines the port
const app = express(); // creates the Express application
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const db = new sqlite3.Database('projects-jl.db');
const SQLiteStore = require('connect-sqlite3')(session);
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt') 

// defines handlebars engine
app.engine('handlebars', engine());
// defines the view engine to be handlebars
app.set('view engine', 'handlebars');
// defines the views directory
app.set('views', './views');


app.use(session({
  store: new SQLiteStore({ db: 'session-db.db' }),
  secret: 'DinHemligaNyckel', // Ändra detta till en säker nyckel
  resave: false,
  saveUninitialized: false
}));

// define static directory "public" to access css/ and img/
app.use(express.static('public'))
app.use((req,res, next)=>{
  console.log("req. URL: ", req.url)
  next()
})

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
/*___________________________________________________experience__________________________________________________*/

db.run("CREATE TABLE IF NOT EXISTS experience (pid INTEGER PRIMARY KEY, pname TEXT NOT NULL, pyear INTEGER NOT NULL, pdesc TEXT NOT NULL, ptype TEXT NOT NULL, pimgURL TEXT NOT NULL)", (error) => {
  if (error) {
    // tests error: display error
    console.log("ERROR: ", error)
  } else {
    // tests error: no error, the table has been created
    console.log("---> Table experience created!")

    const experience=[
      { "id":"1", "name":"psychiatric assistant nurse", "type":"psychiatric section(Ryhov Hospital Jönköping)", "desc": "Involvement in healthcare within closed psychiatric care.", "year": 2021, "dev":"", "url":"/img/psyk.jpg" },
      { "id":"2", "name":"Security Officer", "type":"CSG", "desc": "Worked in Stockholm's public transportation system as a security guard responsible for maintaining public order", "year": 2018, "url":"/img/OV.jpg" },
      { "id":"3", "name":"Vice CEO", "type":"Elite Sales Team INT AB", "desc": "Own business in retail", "year": 2018, "url":"/img/EST.jpg" },
      { "id":"4", "name":"Military nurse", "desc": "Trained at FbU to become military nurse, but never worked as it", "year": 2014, "type":"Försvarsutbildarna", "url":"/img/militarynurse.jpg" },
 
    ]
    // inserts projects
    experience.forEach( (oneExperience) => {
      db.run("INSERT OR IGNORE INTO experience (pid, pname, pyear, pdesc, ptype, pimgURL) VALUES (?, ?, ?, ?, ?, ?)", [oneExperience.id, oneExperience.name, oneExperience.year, oneExperience.desc, oneExperience.type, oneExperience.url], (error) => {
        if (error) {
          console.log("ERROR: ", error)
        } else {
          console.log("Line added into the experience table!")
        }
      })
    })
  }
})

/*___________________________________________________education__________________________________________________*/

db.run("CREATE TABLE IF NOT EXISTS Education (sid INTEGER PRIMARY KEY, sname TEXT NOT NULL, syear INTEGER NOT NULL, sdesc TEXT NOT NULL, stype TEXT NOT NULL, simgURL TEXT NOT NULL)", (error) => {
  if (error) {
    // tests error: display error
    console.log("ERROR: ", error)
  } else {
    // tests error: no error, the table has been created
    console.log("---> Table Education created!")

    const education=[
      
      {"id": "5" ,"year": 2022, "name": "Jönköping university", "type": "University", "desc": "Software developer and mobile platforms (from 2022-2025)", "url":"/img/JU.jpg" },
      {"id": "6" ,"year": 2020, "name": "International Business Management Institute (IBMI)", "type": "University", "desc": "Risk Management, Change Management, Leadership and Team Development, Project Management(from 2020-2021)", "url": "/img/IBMI.webp"},
      {"id": "7","year": 2014, "name": "Lernia Yrkeshögskolan", "type": "pre-University", "desc": "Nurse assistent especialized in pychiatri(2014-1016)", "url": "/img/lernia.png"},
    ]
    // inserts projects
    education.forEach( (oneEducation) => {
      db.run("INSERT OR IGNORE INTO Education (sid ,sname, syear, sdesc, stype, simgURL) VALUES (? ,?, ?, ?, ?, ?)", [oneEducation.id ,oneEducation.name, oneEducation.year, oneEducation.desc, oneEducation.type, oneEducation.url], (error) => {
        if (error) {
          console.log("ERROR: ", error)
        } else {
          console.log("Line added into the Education table!")
        }
      })
    })
  }
})

 /*________________________________________________Home_________________________________________________*/ 
 
 db.run("CREATE TABLE IF NOT EXISTS home (hid INTEGER PRIMARY KEY, hname TEXT NOT NULL, hyear INTEGER NOT NULL, hdesc TEXT NOT NULL, htype TEXT NOT NULL, himgURL TEXT NOT NULL)", (error) => {
  if (error) {
    // tests error: display error
    console.log("ERROR: ", error)
  } else {
    // tests error: no error, the table has been created
    console.log("---> Table home created!")

    const home=[
      
      {"id": "8" ,"year": 1995, "name": "Bitrhday", "type": "Iran", "desc": "my birth place", "url":"/img/JU.jpg" },
      {"id": "9" ,"year": 2009, "name": "Imigrate", "type": "Country", "desc": "moved to another country", "url": "/img/IBMI.webp"},
      {"id": "10","year": 2020, "name": "University", "type": "Study", "desc": "Start study to become a successful engineer", "url": "/img/lernia.png"},
    ]
    // inserts projects
    home.forEach( (oneHome) => {
      db.run("INSERT OR IGNORE INTO home (hid ,hname, hyear, hdesc, htype, himgURL) VALUES (? ,?, ?, ?, ?, ?)", [oneHome.id ,oneHome.name, oneHome.year, oneHome.desc, oneHome.type, oneHome.url], (error) => {
        if (error) {
          console.log("ERROR: ", error)
        } else {
          console.log("Line added into the home table!")
        }
      })
    })
  }
})
 
  /*_____________________________________________________________________________________________________*/   
/*
  bcrypt.compare(pw, "€$#dfkwfmnlkajgej34j2314jngbkal-afv&%#MV!€#HN/%", function(err, result) {
  if(err) {
    console.log("Error in comparing encryption: ", err)
  } else if (result == true ) {
    console.log('User is Logged in!')
    req.session.isAdmin = (user.uadmin==1)
    req.session.isLoggedIn = true
    req.session.name = user.uname
    res.redirect("/")
  } else {
    console.log('User is NOT logged in!')
    res.redirect("/")
  }
})
*/
  app.get('/', (req, res) =>{
    console.log("SEASSON: ", req.session)
  /*
    saltRounds = 12
    bcrypt.hash("toto1234", saltRounds, function(err, hash) {
      if(err) {
        console.log("Error encrypting the password: ", err)
      } else {
        console.log("Hashed password (GENRATE only ONCE): ", hash)
      }
    });
    */
    const model = {
      isLoggedIn: req.session.isLoggedIn,
      name: req.session.name,
      isAdmin: req.session.isAdmin,
    }
    res.render('home.handlebars', model);
  });
/*____________________________________CRUD Education________________________________________________*/

// defines route "/humans"

app.get('/Education', (req, res) => {
  db.all("SELECT * FROM education", function (error, theEducation) {
      if (error) {
        console.log("SESSION: ", req.session)
          const model = {
              dbError: true,
              theError: error,
              Education: [],
              isLoggedIn:req.session.isLoggedIn,
              name:req.session.name,
              isAdmin:req.session.isAdmin,
          }
          // renders the page with the model
          res.render("Education.handlebars", model)
      }
      else {
          const model = {
              dbError: false,
              theError: "",
              Education: theEducation,
              isLoggedIn: req.session.isLoggedIn,
              name: req.session.name,
              isAdmin: req.session.isAdmin,
          }
          // renders the page with the model
          res.render("Education.handlebars", model)
      }
    })
});

app.get('/Education/delete/:id', (req,res)=>{
  const id=req.params.id
  if(req.session.isLoggedIn==true && req.session.isAdmin==true){
    db.run("DELETE FROM education WHERE sid=?", [id], function(error, theEducation){
      if(error){
        const model = { dbError:true, theError: error, 
        isLoggedIn:req.session.isLoggedIn,
        name: req.session.name,
      isAdmin: req.session.isAdmin,
    }
    res.render("Education.handlebars", model)
      } else {
        const model={ dbError: false, theError:"",
      isLoggedIn: req.session.isLoggedIn,
    name: req.session.name,
  isAdmin: req.session.isAdmin,
}
res.render("Education.handlebars", model)
      }
    })
  }else {
    res.redirect('/login')
  }
});
app.get('/Education/new', (req,res) => {
  if(req.session.isLoggedIn==true && req.session.isAdmin==true){
    const model ={
      isLoggedIn: req.session.isLoggedIn,
      name: req.session.name,
      isAdmin: req.session.isAdmin,
    }
    res.render('neweducation.handlebars', model)
  }else{
    res.redirect('/login')
  }
});
app.post('/Education/new', (req,res)=>{
  const newp=[
    req.body.educname, req.body.educyear, req.body.educdesc, req.body.eductype, req.body.educimg,
  ]
  if(req.session.isLoggedIn==true && req.session.isAdmin==true){
    db.run("INSERT INTO education (sname, syear, sdesc, stype, simgURL) VALUES (?, ?, ?, ?, ?)", newp,(error)=>{
      if(error){
        console.log("ERROR: ", error)
      }else{
        console.log("Line added into education table!")
      }
      res.redirect('/Education')
    })
  }else{
    res.redirect('/login')
  }
})
app.get('/Education/update/:id', (req,res)=>{
  const id=req.params.id
  db.get("SELECT * FROM Education WHERE sid=?", [id], function(error, theEducation){
    if(error){
      console.log("ERROR: ", error)
      const model={ dbError: true, theError: error,
      Education: {},
    isLoggedIn: req.session.isLoggedIn,
  name: req.session.name,
isAdmin: req.session.isAdmin,
}
res.redirect("modifyeducation.handlebars", model)
    }
    else{
      const model={ dbError: false, theError: "",
        Education: theEducation,
        isLoggedIn: req.session.isLoggedIn,
        name: req.session.name,
        isAdmin: req.session.isAdmin,
        helpers: {
          theTypeR(value) {return value =="Research";},
          theTypeT(value) {return value =="Teaching";},
          theTypeO(value) {return value =="Other";},
        }
      }
      res.render("modifyeducation.handlebars", model)
    }
  })
});

app.post('/Education/update/:id', (req, res) => {
  const id = req.params.id
  const newp=[
    req.body.educname,
     req.body.educyear,
      req.body.educdesc,
       req.body.eductype,
        req.body.educimg,
         id,
  ]
  if(req.session.isLoggedIn == true && req.session.isAdmin == true){
    db.run("UPDATE education SET sname=?, syear=?, sdesc=?, stype=?, simgURL=? WHERE sid=?", newp, (error)=>{
      if(error){
        console.log("ERROR: ", error)
      } else {
        console.log("Education updated!")
      }
      res.redirect('/Education')
    });
  } else {
    res.redirect('/login')
  }
})
/*____________________________________CRUD experience________________________________________________*/

app.get('/experience', (req, res) => {
  db.all("SELECT * FROM experience", function (error, theExperience) {
      if (error) {
        console.log("SESSION: ", req.session)
          const model = {
              dbError: true,
              theError: error,
              Education: [],
              isLoggedIn:req.session.isLoggedIn,
              name:req.session.name,
              isAdmin:req.session.isAdmin,
          }
          // renders the page with the model
          res.render("experience.handlebars", model)
      }
      else {
          const model = {
              dbError: false,
              theError: "",
              experience: theExperience,
              isLoggedIn: req.session.isLoggedIn,
              name: req.session.name,
              isAdmin: req.session.isAdmin,
          }
          // renders the page with the model
          res.render("experience.handlebars", model)
      }
    })
});

app.get('/experience/delete/:id', (req,res)=>{
  const id=req.params.id
  if(req.session.isLoggedIn==true && req.session.isAdmin==true){
    db.run("DELETE FROM experience WHERE pid=?", [id], function(error, theExperience){
      if(error){
        const model = { dbError:true, theError: error, 
        isLoggedIn:req.session.isLoggedIn,
        name: req.session.name,
      isAdmin: req.session.isAdmin,
    }
    res.render("experience.handlebars", model)
      } else {
        const model={ dbError: false, theError:"",
      isLoggedIn: req.session.isLoggedIn,
    name: req.session.name,
  isAdmin: req.session.isAdmin,
}
res.render("experience.handlebars", model)
      }
    })
  }else {
    res.redirect('/login')
  }
});
app.get('/experience/new', (req,res) => {
  if(req.session.isLoggedIn==true && req.session.isAdmin==true){
    const model ={
      isLoggedIn: req.session.isLoggedIn,
      name: req.session.name,
      isAdmin: req.session.isAdmin,
    }
    res.render('newexperience.handlebars', model)
  }else{
    res.redirect('/login')
  }
});
app.post('/experience/new', (req,res)=>{
  const newe=[
    req.body.expname,
     req.body.expyear,
      req.body.expdesc,
       req.body.exptype,
        req.body.expimg,
  ]
  if(req.session.isLoggedIn==true && req.session.isAdmin==true){
    db.run("INSERT INTO experience (pname, pyear, pdesc, ptype, pimgURL) VALUES (?, ?, ?, ?, ?)", newe,(error)=>{
      if(error){
        console.log("ERROR: ", error)
      }else{
        console.log("Line added into experience table!")
      }
      res.redirect('/experience')
    })
  }else{
    res.redirect('/login')
  }
})
app.get('/experience/update/:id', (req,res)=>{
  const id=req.params.id
  db.get("SELECT * FROM experience WHERE pid=?", [id], function(error, theExperience){
    if(error){
      console.log("ERROR: ", error)
      const model={ dbError: true, theError: error,
        experience: {},
    isLoggedIn: req.session.isLoggedIn,
  name: req.session.name,
isAdmin: req.session.isAdmin,
}
res.redirect("modifyexperience.handlebars", model)
    }
    else{
      const model={ dbError: false, theError: "",
      experience: theExperience,
        isLoggedIn: req.session.isLoggedIn,
        name: req.session.name,
        isAdmin: req.session.isAdmin,
        helpers: {
          theTypeA(value) {return value =="Research";},
          theTypeB(value) {return value =="Teaching";},
          theTypeC(value) {return value =="Other";},
        }
      }
      res.render("modifyexperience.handlebars", model)
    }
  })
});

app.post('/experience/update/:id', (req, res) => {
  const id = req.params.id
  const newe=[
    req.body.expname,
     req.body.expyear,
      req.body.expdesc,
       req.body.exptype,
        req.body.expimg,
         id,
  ]
  if(req.session.isLoggedIn == true && req.session.isAdmin == true){
    db.run("UPDATE experience SET pname=?, pyear=?, pdesc=?, ptype=?, pimgURL=? WHERE pid=?", newe, (error)=>{
      if(error){
        console.log("ERROR: ", error)
      } else {
        console.log("experience updated!")
      }
      res.redirect('/experience')
    });
  } else {
    res.redirect('/login')
  }
})
/*______________________________________________________________________________________*/

/*______________________________________________________________________________________*/




app.get('/login',(req,res)=>{
  const model={}
  res.render('login.handlebars',model)
});
app.post('/login',(req,res)=>{
  const un=req.body.un
  const pw=req.body.pw

  if(un=="arya" && pw=="toto1234"){
    console.log("arya is logged in!")
    req.session.isAdmin=true,
    req.session.isLoggedIn=true,
    req.session.name="Arya",
    res.redirect('/')
  } else {
    console.log('Bad user and/or bad password')
    req.session.isAdmin=false,
    req.session.isLoggedIn=false,
    req.session.name="",
    res.redirect('/login')
  }
})
app.get('/logout', (req, res) => {
  // Clear session variables and redirect to login page
  req.session.isAdmin = false;
  req.session.isLoggedIn = false;
  req.session.name = "";
  res.redirect('/login');
});






app.use(session({
  store: new SQLiteStore({ db: 'session-db.db' }),
  secret: 'YourSecretKey', // Change this to a secure secret
  resave: false,
  saveUninitialized: false
}));

/*________________________________________contact__________________________________*/
app.get('/contact',(req,res)=>{
  const model={
    isLoggedIn: req.session.isLoggedIn,
    name: req.session.name,
    isAdmin: req.session.isAdmin
  }
  res.render('contact.handlebars', model);
})

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

const sessionStore = new SQLiteStore({ db: 'session-db.db' });

app.use(session({
  store: sessionStore,
  saveUninitialized: false,
  resave: false,
  secret: 'This123Is@456GreatSecret678%Sentence'
}));
app.get("/create-session", function (request, response) {
  console.log("Route: " + request.url);
  let counter = 1;
  if (request.session.counter) {
      counter = request.session.counter + 1;
  }
  request.session.counter = counter;
  request.session.firstName = "Arya";
  request.session.save(() => {
    response.end();
  });
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










/*________________________________________Error__________________________________*/

app.use(function(req,res){
  res.status(404).render('404.handlebars');
});

// runs the app and listens to the port
app.listen(port, () => {
    console.log(`Server running and listening on port ${port}...`)
});



