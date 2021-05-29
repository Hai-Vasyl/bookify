const { getColor } = require("./helpers/randomColor");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   response.send("Hello from Firebase!");
// });

// exports.getUserData = functions.https.onCall((data, context) => {
//   if (!contentx.auth) {
//     throw new functions.https.HttpsError("unauthenticated", "Access denied!");
//   }
// });
exports.createUser = functions.https.onCall(
  ({ uid, firstname, lastname, email }, context) => {
    return admin.firestore().collection("users").doc(uid).set({
      firstname,
      lastname,
      email,
      color: getColor(),
      ava: "",
      date: new Date(),
      role: "user",
    });
  },
);

exports.responseBook = functions.https.onCall(
  ({ owner, book, content, response }, { auth }) => {
    if (!auth) {
      throw new functions.https.HttpsError("unauthenticated", "Access denied!");
    }
    const record = { owner, book, content, date: new Date() };

    return admin
      .firestore()
      .collection("responses")
      .add(
        response
          ? {
              ...record,
              response,
            }
          : record,
      );
  },
);

// To add new record to db

// admin.firestore().collection().add({
//   some fields ...
// })

// exports.deleteUser = functions.auth.user().onDelete(user => {

// })

// const express = require("express");
// const path = require("path");

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(express.static(path.resolve("../", "public")));
// app.all("*", (req, res) => {
//   res.sendFile(path.resolve("../", "public", "index.html"));
// });

// app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
