# Node.js Application (Backend)
###  Create REST API for authentication in Node.js using JWT
steps:
- Create simple REST API in Node.js
- Install all the required npm packages
- Define the environment variable
- Manage general utility
- Create API for user sign in
- Create API for verify token
- Implement middleware to validate the token
- Output

- At backend side we have to work on below points.

 1. Install “jsonwebtoken” package: We will use this package to create token with the help of User primary data and secret or private key. So when we need it then we can decode it and use the user data to manage application logs.
 2. Create user signin API: We need API where user can get authenticate by passing the login credentials. If user get authenticated successfully then we will create token as mentioned above and return it.
 3. Verify token API: We need one more API where we can verify the user token. If it’s invalid then we will send “401 Unauthorized” response to the user.
 4. Implement middleware: We need to implement the middleware so we can verify the token for private routes.


.env – To store the environment variables which we can use in application.
server.js – It’s used to create an express server where we can integrate the API for authentication.
utils.js – It’s used to manage the general utility.

## library used on this app:

- cors: express middleware for enabling Cross-Origin Resource Sharing request.
- body-parser: another middleware which parse s the incoming request body before your handlers and make it available under req.body property
- jsonwebtoken(JWT): JSON object which is used to securely transfer information over the web (between two parties); i.e. for authentication process. we will use this package to create token with the help of user's primary data and secret key.
- dotenv: it loads environment variables from .env file into process.env. we will store the JWT secret key in the .env file
- npm install express cors body-parser jsonwebtoken dotenv --save
- After a successful installation, you will need to enable the middleware and use it in the server.js file to handle the request

- credit: https://www.cluemediator.com/implement-login-authentication-in-react-app-using-node-js
