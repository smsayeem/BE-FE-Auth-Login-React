# ReactJS Application (Frontend)
- Follow below points to implement authentication at frontend side in ReactJS Application.

1. Implement routing: We need to create react application and implement the routes to manage the redirection.
2. Create login form: We have to create login form where we can authenticate the user credentials and redirect them on the private routes if it’s valid. Also we need to store the token (returning from the API response) in localStorage or sessionStorage so we can pass it in the headers of the private API.
3. Verify token on page refresh: In single page application, if token is exist in storage then we have to verify access token on browser refresh.
4. Append token in private API: After successful login, we need to pass the token in the header of the all private API so at backend side we can validate it. If user token is not exist or invalid the we can redirect them on the login page.