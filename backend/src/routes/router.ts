import authentication from 'src/routes/authentication';
import users from 'src/routes/users';

// app.use(...router) in index.ts
// spreads all routes into server MW
export default [authentication, users];
