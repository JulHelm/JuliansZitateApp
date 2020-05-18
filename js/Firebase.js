import firebase from "firebase";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyDbzXXwQjxMdXAriaQsQ6yMzbNbxawSU8E",
  authDomain: "quotes-75ab9.firebaseapp.com",
  databaseURL: "https://quotes-75ab9.firebaseio.com",
  projectId: "quotes-75ab9",
  storageBucket: "quotes-75ab9.appspot.com",
  messagingSenderId: "191994492536",
  appId: "1:191994492536:web:8ab53cb8b273f4fe291f8d",
  measurementId: "G-LP6DW6LCF3",
};

export default class Firebase {
  static db;

  static init() {
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
    Firebase.db = firebase.firestore();
  }
}
