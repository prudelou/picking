import firebase from 'react-native-firebase';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyBrCjoLr1QycooZ2nJSvLmZPi8JZbf0W1Y",
    authDomain: "picking-1c5fa.firebaseapp.com",
    databaseURL: "https://picking-1c5fa.firebaseio.com",
    projectId: "picking-1c5fa",
    storageBucket: "",
    messagingSenderId: "203230874084"
};
firebase.initializeApp(config);

// firebase.auth()
//     .signInAnonymouslyAndRetrieveData()
//     .then(credential => {
//         if (credential) {
//             Alert.alert('default app user ->', credential.user.toJSON());
//         }
//     });
export default firebase;
