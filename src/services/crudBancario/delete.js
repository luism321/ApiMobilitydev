const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { Auth } = require('../../config/config')
const { routes } = require('../../config/routes/index');
const { db } = require('../../config/config')
const jwt = require('jsonwebtoken');



router.post(routes.deleteBancos, verifyToken, async (req, res) => {
    const { numeroCuen } = req.body
    let cuentaNueva = {
        numeroCuen: numeroCuen,
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
                        let uid = doc.data().uid
                        let buscar = Banco.findIndex(items => items.numeroCuen === cuentaNueva.numeroCuen)

                        function removeItemFromArr(arr) {

                            if ([buscar] !== -1) {
                                arr.splice([buscar], 1);
                            }

                        }
                        removeItemFromArr(Banco, [buscar]);
                        console.log(Banco);
                        db.collection("Usuarios").doc(uid)
                            .update(
                                { DatosBancarios: Banco }
                            ).then(resp => {
                                res.json({
                                    mensaje: "dato bancario eliminado con éxito",
                                })
                            }).catch((error) => {
                                res.send({ msg: false, text: 'No se pudo eliminar dato bancario', error: error.message })
                            })

                    }).catch((error) => {
                        res.send({ msg: false, text: 'No se consiguio ningun dato intentelo de nuevo', error: error.message })
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