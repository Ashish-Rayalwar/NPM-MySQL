// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getAnalytics } = require("firebase/analytics");
const { getMessaging } = require("firebase/messaging");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFz-kJ52kkS3Q01s7oVHbrvQND_1OxiKA",
  authDomain: "send-notification-4f21e.firebaseapp.com",
  projectId: "send-notification-4f21e",
  storageBucket: "send-notification-4f21e.appspot.com",
  messagingSenderId: "111479789551",
  appId: "1:111479789551:web:5ffc89859008ee2e66481a",
  measurementId: "G-Y4BDP8JD7W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
 const messaging = getMessaging(app);

 module.exports = {messaging}
