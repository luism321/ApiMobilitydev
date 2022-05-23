const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { Auth } = require('../../config/config')
const { routes } = require('../../config/routes/index');
const { db } = require('../../config/config')
const jwt = require('jsonwebtoken')



router.post(routes.Login, async (req, resp) => {
    console.log(req)
    const data = req.body
    try {
        await Auth.getUserByEmail(data.email)
            .then((userCredential) => {
                console.log(userCredential.uid)
                if (userCredential.uid) {
                    jwt.sign(data.email, 'secretkey', (error, token) => {
                        resp.json({
                            mensaje: "token creado con éxito",
                            token
                        })
                    })
                } else {
                    resp.json(
                        {
                            mensaje: "Usuario o contraseña incorrectos"
                        }
                    )
                }

            })
            .catch((error) => {
                resp.send(
                    {
                        msg: false,
                        text: 'No se ha podido crear un token válido,correo invalido o el usuario no existe',
                        error: error.message
                    }
                )
            })
    } catch (error) {
        resp.send({ msg: false, error: error.message })

    }
})



module.exports = router;