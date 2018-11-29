const admin = require('firebase-admin');
const serviceAccount = require('./service-account-key');

const USER = require('./data/user');
// const user = require('./data/user.prod');


// console.log(serviceAccount);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://pk-support.firebaseio.com'
});

const errorHdl = (e) => {
  console.error(e);
}

const auth = admin.auth();
auth.getUserByEmail(USER.email)
.then((userRecord) => {
  console.log('Successfully fetched user data of', userRecord.email);
  return auth.updateUser(userRecord.uid, {
    password: USER.pwd,
    displayName: USER.displayName
  });
})
.then((userRecord) => {
  console.log('Successfully updated user');
  console.log(USER.email, userRecord.displayName);
})
.catch(errorHdl);




