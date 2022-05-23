const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { Auth } = require('../../config/config')
const { routes } = require('../../config/routes/index');
const { db } = require('../../config/config')
const jwt = require('jsonwebtoken');



router.post(routes.addBancos, verifyToken, async (req, res) => {
    const {numeroCuen, nombreBanco, tipoCuenta, estatus, numeroBanco} = req.body

    let cuentaNueva = {
        numeroCuen: numeroCuen,
        nombreBanco: nombreBanco,
        tipoCuenta: tipoCuenta,
        estatus: estatus,
        numeroBanco: numeroBanco
    }
    try {
        jwt.verify(req.token, 'secretkey', (error, authData) => {
            if (error) {
                res.sendStatus(403)
            } else {
                db.collection("Usuarios")
                    .doc(req.body.uiduser)
                    .get().then((doc) => {
                        let Banco = doc.data().DatosBancarios
                        Banco.push(cuentaNueva)
                        let uid = doc.data().uid
                        db.collection("Usuarios").doc(uid )
                            .update(
                                { DatosBancarios: Banco }
                            ).then(resp => {
                                res.json(
                                    {
                                    mensaje: "Dato bancario creado con éxito",
                                    msg:true
                                    }
                                )
                            }).catch((error) => {
                                res.send({ msg: false, text: 'No se pudo registrar su dato bancario', error: error.message })
                            })

                    }).catch((error) => {
                        res.send({ msg: false, text: 'Esta enviando un dato invalido', error: error.message })
                    })



            }
        })

    } catch (error) {
        res.send({ msg: false, error: error.message })

    }
    // Authorization:Bearer <token>

})

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization']

    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        next()
    } else {
        res.sendStatus(403)
    }
}





module.exports = router;