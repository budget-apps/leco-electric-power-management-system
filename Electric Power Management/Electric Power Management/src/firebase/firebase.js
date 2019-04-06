import firebase from 'firebase/app';
import 'firebase/auth';

// Use actual config values from registered firbase app
var config = {
  apiKey: "AIzaSyCjez9tZcPloagnu_jqN86JcuFOX93gNFA",
  authDomain: "electric-fault-mangemant.firebaseapp.com",
  databaseURL: "https://electric-fault-mangemant.firebaseio.com",
  projectId: "electric-fault-mangemant",
  storageBucket: "electric-fault-mangemant.appspot.com",
  messagingSenderId: "364200508797"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();

export { auth };
