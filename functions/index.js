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

exports.toggleFavorites = functions.https.onCall(
  async ({ owner, book }, { auth }) => {
    if (!auth) {
      throw new functions.https.HttpsError("unauthenticated", "Access denied!");
    }
    const favorites = admin.firestore().collection("favorites");

    const snapshot = await favorites
      .where("book", "==", book)
      .where("owner", "==", owner)
      .get();

    let docId = "";
    snapshot.forEach((doc) => {
      if (doc.id) {
        docId = doc.id;
      }
    });

    if (docId) {
      return favorites.doc(docId).delete();
    }
    return favorites.add({ owner, book, private: false, date: new Date() });
  },
);

exports.deleteResponse = functions.https.onCall(({ response }, { auth }) => {
  if (!auth) {
    throw new functions.https.HttpsError("unauthenticated", "Access denied!");
  }
  return admin.firestore().collection("responses").doc(response).delete();
});

exports.togglePrivate = functions.https.onCall(
  async ({ favorite }, { auth }) => {
    if (!auth) {
      throw new functions.https.HttpsError("unauthenticated", "Access denied!");
    }

    const favorites = admin.firestore().collection("favorites");
    const doc = await favorites.doc(favorite).get();
    return favorites.doc(favorite).update({
      private: !doc.data().private,
    });
  },
);

exports.updateUserInfo = functions.https.onCall(
  ({ firstname, lastname }, { auth }) => {
    if (!auth) {
      throw new functions.https.HttpsError("unauthenticated", "Access denied!");
    }
    if (!firstname.trim() || !lastname.trim()) {
      return;
    }

    return admin.firestore().collection("users").doc(auth.uid).update({
      firstname,
      lastname,
    });
  },
);

exports.updateUserAvatar = functions.https.onCall(
  ({ image, isDeleting }, { auth }) => {
    if (!auth) {
      throw new functions.https.HttpsError("unauthenticated", "Access denied!");
    }

    if (isDeleting || image.trim()) {
      return admin
        .firestore()
        .collection("users")
        .doc(auth.uid)
        .update({
          ava: isDeleting ? "" : image,
        });
    }
    return;
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
