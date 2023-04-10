'use strict'

// // from in-class demo
// async function basicAuth(request, response, next) {
//   // auth stuff occurs
//   console.log(request.headers.authorization);
//   if (!request.headers.authorization) {
//     response.status(401).send('NO AUTH CREDENTIALS');
//     return;
//   }
//   // check if user lives in our DB
//   let credentials = base64.decode(request.headers.authorization.split(' ')[1]); // Basic Jacob:password
//   let userName = credentials.split(':')[0];
//   let password = credentials.split(':')[1];

//   // query db find User where username === userName
//   let userFromDB = await UserModel.findOne({ where: {username: userName }});
//   if (!userFromDB) {
//     response.status(401).send('No User found');
//     return;
//   }

//   // compare the password from the request with the password stored in the DB.
//   let isAuthentic = await bcrypt.compare(password, userFromDB.password);
//   if (isAuthentic) {
//     next();
//   } else {
//     response.status(401).send('Unauthorized');
//   }
// }