#Lab (educational app)

##Technologies used:
- Angular 2.0.0-alpha.47
- Bootstrap
- Some stuff, used with gulp:
  - Browserify + tsify
  - Sourcemaps
  - Minifying js, css, html
  - Inject
  - Bower
  - Sass
- Some stuff, used on backend
  - bcrypt
  - jwt-simple
  - moment
  - request
  - sails

##App description
Application shows GitHub users on the main page and specific user data if you choose in the list or visit `/accounts/<login>` url.

Also, application supports Jwt based authentication and authentication, based on google api.

If you are authenticated user, you are able to see the list of all registered users.
##How to start the application

1. Download it to your local environment;
2. Install npm;
3. Run `npm i sails -g`;
4. Run `npm i` and `gulp` in the `frontend` directory of application;
5. Run `npm i` and `sails lift` in the `backend` directory of application;
6. Host the `dist` folder in web server on 80 port;
7. Open `<app_address>` in the browser.
