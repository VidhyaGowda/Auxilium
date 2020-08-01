var express = require("express");
var app = express();
const session = require('express-session');							// https://www.npmjs.com/package/express-session
const passport = require('passport');								// https://www.npmjs.com/package/passport
const WebAppStrategy = require('ibmcloud-appid').WebAppStrategy;
var cfenv = require("cfenv");
var bodyParser = require('body-parser');
const { request, response } = require("express");
var axios = require('axios');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// load local VCAP configuration  and service credentials
var vcapLocal;
try {
  vcapLocal = require('./vcap-local.json');
  console.log("Loaded local VCAP", vcapLocal);
} catch (e) { }

const appEnvOpts = vcapLocal ? { vcap: vcapLocal } : {}

fs = require('fs');

const appEnv = cfenv.getAppEnv(appEnvOpts);

const nunjucks = require('nunjucks');
nunjucks.configure('views', {
  autoescape: true,
  express: app
});

// Apply nunjucks and add custom filter and function (for example). 
nunjucks.configure('views/', { // set folders with templates
  autoescape: true,
  express: app
});



app.use(session({
  secret: '123456',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((user, cb) => cb(null, user));
passport.use(new WebAppStrategy({
  clientId: "ba3f4de8-daf5-4581-8de8-9dae3529c64c",
  tenantId: "f67fa52e-0b18-4d48-864b-ce9ce11d3c60",
  secret: "ODBmNTM1ZTgtYzBkNi00N2M0LWIxNzctNzVmNzUyOTMwNjAz",
  oAuthServerUrl: "https://eu-gb.appid.cloud.ibm.com/oauth/v4/f67fa52e-0b18-4d48-864b-ce9ce11d3c60",
  redirectUri: "https://covid19help.eu-gb.cf.appdomain.cloud/app/callback"

}));

// Handle Login
app.get('/login', passport.authenticate(WebAppStrategy.STRATEGY_NAME, {
  successRedirect: '/',
  forceLogin: true
}));

// // Handle callback
app.get('/app/callback', passport.authenticate(WebAppStrategy.STRATEGY_NAME));

// // Handle logout
app.get('/logout', function (request, response) {
  WebAppStrategy.logout(request);
  response.redirect('/');
});

// Protect the whole app
// app.use(passport.authenticate(WebAppStrategy.STRATEGY_NAME));

let document_status;
let user_cloudant;

app.get('/', function (request, response) {
  if (request.user) {
    axios.get('https://7475d31a.eu-gb.apigw.appdomain.cloud/auxilium/user_data', {
      "data": {
        "user_id": request.user.sub,
        "data": {
          "_id": request.user.sub,
          "given_name": request.user.given_name,
          "family_name": request.user.family_name,
          "phone_number": ""
        }

      }
    })
      .then((res) => {
        if (res.data.hasOwnProperty('message')) {
          response.render('home/index.html', { user: request.user, picture: request.user.picture })
          document_status = false
        } else {
          user_cloudant = res.data.data
          response.render('home/index.html', { user: res.data.data })
          document_status = true
        }
      }, (error) => {
        console.log(error);
      })

  } else {
    response.redirect('/login')
  }
})

app.get('/api/recent_services', function (request, response) {

  if (request.user) {
    let post;

    axios.get('https://7475d31a.eu-gb.apigw.appdomain.cloud/auxilium/help/get_post', {
      params: {
        "user_id": request.user.sub
      }
    })
      .then(function (res) {
        post = res.data
        fs.readFile(__dirname + "/views/home/recent_services.html", 'utf8', function (err, data) {
          if (err) {
            response.json({
              'data': "Sorry an error occured"
            });
          }
          response.json({
            'data': data,
            'posts': post
          });
        });
      })

  } else {
    response.redirect('/login');
  }

})

app.get('/api/post_new_services', function (request, response) {

  if (request.user) {
    fs.readFile(__dirname + "/views/home/post_new_services.html", 'utf8', function (err, data) {
      if (err) {
        console.log(err);
        response.json({
          'data': "Sorry an error occured"
        });
      }
      response.json({
        'data': data
      });
    });
  } else {
    response.redirect('/login')
  }

})

app.get('/api/change_profile', function (request, response) {

  if (request.user) {
    fs.readFile(__dirname + "/views/home/change_profile.html", 'utf8', function (err, data) {
      if (err) {
        console.log(err);
        response.json({
          'data': "Sorry an error occured"
        });
      }
      response.json({
        'data': data,
        'user_cloudant': user_cloudant,
        'document_status': document_status
      });
    });
  } else {
    response.redirect('/login')
  }
})

app.post('/api/get_user', function (request, response) {
  if (request.user) {
    console.log(request.body);

    axios.get('https://7475d31a.eu-gb.apigw.appdomain.cloud/auxilium/user_data', {
      params: {
        "user_id": request.body['user_id'],
      }
    })
      .then((res) => {
        console.log(res)
        response.json({
          'data': res.data
        })
      }, (error) => {
        console.log(error);
      })
      .catch(error => {
        console.log('-----catching error-----');
        console.log(error);
      });
  } else {
    response.redirect('/')
  }
})

app.post('/api/change_profile', function (request, response) {
  if (request.user) {
    console.log(request.body);
    axios.post('https://7475d31a.eu-gb.apigw.appdomain.cloud/auxilium/user_data_update', {
      "data": {
        "_id": request.user.sub,
        "given_name": request.body['given_name'],
        "family_name": request.body['family_name'],
        "phone_number": request.body['phone_number']
      }
    })
      .then((res) => {
        console.log(res)
        response.json({
          'message': 'success'
        })
      }, (error) => {
        console.log(error);
      })
      .catch(error => {
        console.log('-----catching error-----');
        console.log(error);
      });
  } else {
    response.redirect('/')
  }
})

app.post('/api/search', function (request, response) {

  if (request.user) {
    console.log(request.body);

    axios.get('https://7475d31a.eu-gb.apigw.appdomain.cloud/auxilium/get_help/search_coordinates', {
      params: {
        "user_id": request.user.sub,
        "longitude": request.body['longitude'],
        "latitude": request.body['latitude'],
        "keyword": request.body['keyword']
      }
    })
      .then((res) => {
        console.log(res)
        response.json({
          'data': res.data
        })
      }, (error) => {
        console.log(error);
      })
      .catch(error => {
        console.log('-----catching error-----');
        console.log(error);
      });

  } else {
    response.redirect('/login');
  }

})

app.get('/api/find_services', function (request, response) {

  if (request.user) {
    fs.readFile(__dirname + "/views/home/find_services.html", 'utf8', function (err, data) {
      if (err) {
        console.log(err);
        response.json({
          'data': "Sorry an error occured"
        });
      }
      response.json({
        'data': data
      });
    });
  } else {
    response.redirect('/login')
  }

})

app.get('/api/recent_services_taken', function (request, response) {

  if (request.user) {
    fs.readFile(__dirname + "/views/home/recent_services_taken.html", 'utf8', function (err, data) {
      if (err) {
        console.log(err);
        response.json({
          'data': "Sorry an error occured"
        });
      }
      response.json({
        'data': data
      });
    });
  } else {
    response.redirect('/login');
  }
})

app.get('/api/about_us', function (request, response) {

  if (request.user) {
    fs.readFile(__dirname + "/views/home/about_us.html", 'utf8', function (err, data) {
      if (err) {
        console.log(err);
        response.json({
          'data': "Sorry an error occured"
        });
      }
      response.json({
        'data': data
      });
    });
  } else {
    response.redirect('/login');
  }
})

app.post('/api/post_new_services', function (request, response) {

  if (request.user) {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;

    axios.post('https://7475d31a.eu-gb.apigw.appdomain.cloud/auxilium/help/new_post', {
      data: {
        "user_id": request.user.sub,
        "created_on": dateTime,
        "updated_on": dateTime,
        "geometry": {
          "type": "Point",
          "coordinates": [
            parseFloat(request.body['longitude'], 10),
            parseFloat(request.body['latitude'], 10)
          ]
        },
        "content": {
          "service": request.body['service'],
          "description": request.body['description']
        },
        "status": "Available"
      }
    })
      .then((res) => {
        response.json({
          'message': "success"
        });
      }, (error) => {
        console.log(error);
      })
  } else {
    response.redirect('/login')
  }

})

app.post('/api/update_services', function (request, response) {

  if (request.user) {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;

    console.log(request.body['document_id']);
    console.log(typeof request.body['document_id']);

    axios.post('https://7475d31a.eu-gb.apigw.appdomain.cloud/auxilium/help/update_post', {
      "document_id": request.body['document_id'],
      "data": {
        "updated_on": dateTime,
        "geometry": {
          "coordinates": [
            parseFloat(request.body['longitude'], 10),
            parseFloat(request.body['latitude'], 10)
          ],
          "type": "Point"
        },
        "content": {
          "service": request.body['service'],
          "description": request.body['description']
        },
        "status": request.body['status']
      }
    })
      .then((res) => {
        console.log(res);
        response.json({
          'message': 'success'
        })
      }, (error) => {
        console.log(error);
      })
  } else {
    response.redirect('/login')
  }


})

app.post('/api/delete_services', function (request, response) {

  if (request.user) {
    axios.get('https://7475d31a.eu-gb.apigw.appdomain.cloud/auxilium/help/delete_post', {
      params: {
        "post_id": request.body.document_id
      }
    })
      .then((res) => {
        response.json({
          'message': 'success'
        })
      }, (error) => {
        console.log(error);
      })
  } else {
    response.redirect('/login')
  }

})

//serve static file (index.html, images, css)
app.use(express.static(__dirname + '/views'));

var port = process.env.PORT || 3000
app.listen(port, function () {
  console.log("To view your app, open this link in your browser: http://localhost:" + port);
});
