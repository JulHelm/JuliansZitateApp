import firebase from "firebase";
import "firebase/firestore";

const config = {
 //Your data from firebase
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
