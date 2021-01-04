# Kids-Tracko

***

## Join the [Postman Workspace](https://app.getpostman.com/join-team?invite_code=d901894e1238a3c93487aeb63d67074e&ws=dcab9c7d-9e6b-488a-a639-48f91bfeceee)

## Refer [Postman Collection](https://www.getpostman.com/collections/3e9fa29abaffd5956b3a)

## Available Scripts

In the project directory you can run:

### `npm start`

Runs the app without `nodemon` package. This package is used in development to keep run the app. Not recommended in `production` mode. Instead use process manager like [PM2](https://www.npmjs.com/package/pm2) to watch and restart the app if it crashes.

### `npm run dev`

Runs the app in `development` mode with `nodemon` package. `Nodemon` restarts the app automatically if it detects code changes.

### `npm run debug`

Runs the app in debug mode in `development` with `nodemon` package. `Nodemon` restarts the app automatically if it detects code changes.

### `npm run debug-nomon`

Runs the app in debug mode in `development` without `nodemon` package. Uses Node's debugger.

### `npm run debug-inspect`

Runs the app in debug mode in `development` with Node's inspect on.

### `.env` File - Required Parameters

`NODE_ENV="development"` #**NOTE: Should always be in lowercase** *Your app's environment. Another possible value is `"production"`* \
`HOST_URL="http://localhost/apis/v1"`  \
`PORT=3000` #*Should always be a number* \
`DB_URI="mongodb://127.0.0.1:27017/kids-tracko"` #*MongoDB Database URL. Can be local or you can provide a link to connect to.* \
`SECRET="SECRET_KEY"` #*Used while signing tokens*

### Project Structure

Standart MVC Architecture has been followed*

1. **[CONFIG](configs/)**
   * All the configurations for the server to run. Contains Environment configurations, and Passport Lib Configuration.

2. **[CONSTANTS](constants/)**
   * All the constants that the server requires. Contains global constants, models constants. All the models prefixes are stored here.

3. **[CONTROLLERS](controllers/)**
   * All the logic for the routes execution is stored here.

4. **[HELPERS](helpers/)**
   * Contains helpers like standardizing the API Response structure.

5. **[MIDDLEWARES](middlewares/)**
   * Methods that are implemented in between the routes. Methods for Authentication of a user before actually executing the route's intended function. Verifications of tokens and requested data.

6. **[MODELS](models/)**
   * Data structure for storing data in the actual MongoDB database.

7. **[ROUTES](routes/)**
   * All the API routes for the application. These are stored by functionality name for better understanding and implementation.

8. **[SERVICES](services/)**
   * The services for send email, firebase notification will be stored here.

9. **[VIEWS](views/)**
   * Views/Pages which are shown to users when they are redirected from outside of the application environment and require server involvement. Like verifying user via email, resetting password.

10. **[APP.JS](app.js)**
    * Main file required to run the server.

### Run the Setup

1. Clone the project from gitlab repo and go to a parent directory.
2. Install dependencies by executing the command `npm install` **(Node.js -> 10.x.x is required)**
3. You can create a new `.env` file from scratch and place all the keys/parameters mentioned in **.ENV File Section of the README**. Or, you will find a file named [`.env.example`](.env.example) in the root directory. Make a copy of that file, rename it as `.env` and update the values inside newly created file as needed.
4. To start a server, execute command `npm run dev`. That's it!

### Considerations

1. Kids are never going to access the portal where they can see their timeline of location tracking.
2. The parent might want to add watch but not want to assign the watch to kid right away.
3. The watch can be reassigned to another kid

### Completed Tasks

1. The Watches will have to be created first to use it in any way possible.
2. Only the created watches can be registered by a parent
3. only the registred watches can be assigned to a kid while registering the kid
4. JWT tokens are must to use any of the APIs.
5. Deactivating a watch can be achieved by changing the value of `isActive` from `watches` collection.

### Future Work

1. The register location API would be created as a micro-service and would be called by MQTT service when a location is broadcasted by the watch
2. The microservice should be deployed in any fully managed Kubernes Service as the scal is going to be gradual.
3. Storing Everyday location of watches should be done in a separate Database cluster if code factor can be  ignored.

### Design Flaws

1. Control over JWT tokens is Less - Empower DB usage to control tokens as Admins - pending

### [Scale related important design aspects](routes/v1Apis/location.route.js)
