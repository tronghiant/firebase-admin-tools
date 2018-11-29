const admin = require('firebase-admin');
const serviceAccount = require('./service-account-key');

const user = require('./data/user');
// const user = require('./data/user.prod');


// console.log(serviceAccount);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: user.databaseURL
});

const errorHdl = (e) => {
  console.error(e);
}

const firestore = admin.firestore();
firestore
  .doc(`users/${user.email}`)
  .set(user.userData)
  .then(() => {
    console.log('Successfully created user!');
  })
  .catch(errorHdl);
