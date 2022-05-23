require('dotenv').config()

const {getAuth} = require('firebase-admin/auth')
const { initializeApp, applicationDefault } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')

initializeApp({
    credential: applicationDefault()

})
const db = getFirestore();
const Auth = getAuth();

module.exports = {
    db,
    Auth
}