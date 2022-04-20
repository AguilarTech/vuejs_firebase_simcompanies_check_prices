const functions = require("firebase-functions");
// const fetch = require("node-fetch@2.6.1");
// var rp = require('request-promise');

// const cors = require("cors")({origin: true});
const axios = require("axios");


// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.scheduledPriceChecker = functions.pubsub
    .schedule("*/5 * * * *").onRun((context) => {
      //   const latestPrice = await fetch('https://www.simcompanies.com/api/v2/market/43')
      // .then(response =>{
      //     return response.json();
      // }).then(data =>{
      //   let price = data[0].priceasdasd
      //   functions.logger.log('latestPrice: $' + price);
      //   return price
      // }).catch(er => {
      //   functions.logger.error(er);
      // })

      functions.logger.log("New run.");


      axios.get("https://www.simcompanies.com/api/v2/market/101")
          .then((r) => {
            const latestPrice = r.data[0].price;
            functions.logger.log("latestPrice: $" + latestPrice);

            admin.firestore().collection("RC_prices")
                .add({Timestamp: new Date().getTime(), Price: latestPrice});

            functions.logger.log("New RC price added to Firestore.");
          });


      return null;
    });


// Take the text parameter passed to this HTTP endpoint and insert it into
// Firestore under the path /messages/:documentId/original
// exports.triggerViaUrl = functions.https.onRequest(async (req, res) => {
//   // Grab the text parameter.
//   const original = req.query.text;
//   // Push the new message into Firestore using the Firebase Admin SDK.
//   //const writeResult = await admin.firestore()
// .collection('messages').add({original: original});


// //   const latestPrice = await fetch('https://www.simcompanies.com/api/v2/market/43')
// // .then(response =>{
// //     return response.json();
// // }).then(data =>{
// //   let price = data[0].price
// //   functions.logger.log('latestPrice: $' + price);
// //   return price
// // }).catch(err => {
// //   functions.logger.error(err);
// // })

// cors(req, res, () => {
//   axios.get("https://www.simcompanies.com/api/v2/market/43")
//   .then(r => {
//     let latestPrice = r.data[0].price
//     functions.logger.log('latestPrice: $' + latestPrice);

//     admin.firestore().collection('prices')
// .add({Timestamp: new Date().getTime(), Price: latestPrice})

//     res.json({result: `New price fetched and added to Firestore.`});

//   })
//   .catch( e => {
//     res.sendStatus(e);
//   })
// })


// const writeResult = await admin.firestore()
// .collection('prices')
// .add({Timestamp: new Date().getTime(), Price: latestPrice});
//   Send back a message that we've successfully written the message
//   res.json({result: `Message with ID:  added.`}); //${writeResult.id}
// });

// Listens for new messages added to
// messages/:documentId/original and creates an
// uppercase version of the message to /messages/:documentId/uppercase
// exports.makeUppercase = functions
// .firestore.document('/messages/{documentId}')
//     .onCreate((snap, context) => {
//       // Grab the current value of what was written to Firestore.
//       const original = snap.data().original;

//       // Access the parameter `{documentId}` with `context.params`
//     functions.logger.log('Uppercasing', context.params.documentId, original);

//       const uppercase = original.toUpperCase();

// You must return a Promise when performing asynchronous tasks inside a
// Functions such as
//       // writing to Firestore.
//  // Setting an 'uppercase' field in Firestore document returns a Promise.
//       return snap.ref.set({uppercase}, {merge: true});
//     });
