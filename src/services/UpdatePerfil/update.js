const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { routes } = require('../../config/routes/index');
const { db, Auth } = require('../../config/config');
const { async } = require('regenerator-runtime');
const jwt = require('jsonwebtoken');
import moment from 'moment'

moment.locale('es')

router.post(routes.Update, verifyToken, async (req, resp) => {
    const data = req.body
    try {
        jwt.verify(req.token, 'secretkey', (error, authData) => {
            if (error) {
                resp.sendStatus(403)
            } else {
                db.collection("Usuarios").doc(data.uid).update(
                    {
                        "nombre": data.nombre,
                        "segundo_nombre": data.segundo_nombre,
                        "apellido": data.apellido,
                        "segundo_apellido": data.segundo_apellido,
                        "fecha_nacimiento":data.fecha_nacimiento,
                        "correo":data.correo,
                        "telefono": data.telefono,
                        "direccion": data.direccion
                    }
                ).then(res => {
                    resp.send({ msg: true, text: `Los datos del usuario ${data.nombre} fue actualizado con éxito` })
                }).catch((error) => {
                    resp.send({ msg: false, text: `Los datos del usuario ${data.nombre} no se actualizaron`, error: error.message })
                })
            }
        })

    } catch (error) {
        resp.send({ msg: false, error: error.message })

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