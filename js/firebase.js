/* global firebase */
var firebaseConfig = {
  apiKey: "AIzaSyAaC9S_oxnRqw26RkC8zHVhUr301i4zdxo",
  authDomain: "webvr-d8be3.firebaseapp.com",
  databaseURL: "https://webvr-d8be3.firebaseio.com",
  projectId: "webvr-d8be3",
  storageBucket: "webvr-d8be3.appspot.com",
  messagingSenderId: "811779735110",
  appId: "1:811779735110:web:80c44fca5c6a292d2c1447",
  measurementId: "G-72D78QGCTY"
};
console.log('firebase~');
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const databaseRef = firebase.database().ref();
const diaryRef = databaseRef.child('diary');
console.log('diary', diaryRef);
//diaryRef.push(789);

