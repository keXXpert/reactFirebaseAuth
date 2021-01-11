import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: "react-auth-2bb16.firebaseapp.com",
    projectId: "react-auth-2bb16",
    storageBucket: "react-auth-2bb16.appspot.com",
    messagingSenderId: "281127548750",
    appId: "1:281127548750:web:183bacfae99a758734501f"
}

const provider = new firebase.auth.GoogleAuthProvider()

export const signInWithGoogle = () => {
    auth.signInWithPopup(provider)
}

firebase.initializeApp(firebaseConfig)
export const auth = firebase.auth()
export const firestore = firebase.firestore()

export const generateUserDocument = async (user, additionalData) => {
    if (!user) return
    const userRef = firestore.doc(`users/${user.uid}`)
    const snapshot = await userRef.get()
    if (!snapshot.exists) {
        const { email, displayName, photoURL } = user
        try {
            await userRef.set({
                displayName,
                email,
                photoURL,
                ...additionalData
            })
        } catch (error) {
            console.error("Error creating user document", error)
        }
    }
    return getUserDocument(user.uid)
}

const getUserDocument = async uid => {
    if (!uid) return null
    try {
        const userDocument = await firestore.doc(`users/${uid}`).get()
        return {
            uid,
            ...userDocument.data()
        };
    } catch (error) {
        console.error("Error fetching user", error)
    }
};