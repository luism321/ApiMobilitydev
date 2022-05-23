const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { routes } = require('../../config/routes/index');
const { db } = require('../../config/config');
const { async } = require('regenerator-runtime');


router.post(routes.Verification, async (req, resp) => {
    const data = req.body
    try {
        await db.collection('Pre-Register').where('cedula', '==', data.cedula).get().then((doc) => {
            let User = doc.docs[0].data()
            resp.send({ msg: true, user: User})
        }).catch((error) => {
            resp.send({ msg: false, text: 'Usuario no encontrado en el pre-registro',error: error.message })
        });
    } catch (error) {
        resp.send({ msg: false, error: error.message})

    }
    
})


module.exports = router;