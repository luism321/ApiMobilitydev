const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { routes } = require('../../config/routes/index');
const { db, Auth } = require('../../config/config');
const { async } = require('regenerator-runtime');
import moment from 'moment'

moment.locale('es')

router.post(routes.Register, async (req, resp) => {
    const data = req.body
    console.log(req.body)
    await Auth.createUser({email:data.email, password:data.password})
        .then((userCredential) => {
            console.log(userCredential.uid)
            var user = userCredential.uid;
            db.collection("Usuarios").doc(user).set(
            {
                nombre: data.nombre,
                segundo_nombre: "",
                apellido: data.apellido,
                segundo_apellido:"",
                correo: data.email,
                nacionalidad:data.nacionalidad,
                uid: user,
                direccion:data.direccion,
                cliente:data.cliente,
                region:"",
                cedula:data.cedula,
                telefono: "",
                fecha_insert: moment().format('MMMM Do YYYY, h:mm'),
                user_insert:moment().format('MMMM Do YYYY, h:mm'),
                perfil:"",
                supervisor:"",
                establecimientos:"",
                estatus:"",
                formularios:{
                    
                },
                DatosBancarios:[{
                    numeroCuenta:'',
                    nombreBanco:'',
                    tipoCuenta:'',
                    estatus:'',
                    numeroBanco:''
                }]
            }
            ).then(res =>{
                db.collection('Pre-Register').doc(`${data.cedula}`).update({
                    "estatus":"Registrado",
                }).then(res =>{
                    resp.send({ msg: true, text: 'Usuario registrado con éxito' })
                }).catch((error)=>{
                    resp.send({ msg: false, text: 'Estatus no actualizado', error:error.message  })
                })
            }).catch((error) => {
                resp.send({ msg: false, text: 'No se pudo registrar este usuario', error:error.message  })
            })
        })
        .catch((error) => {
            resp.send({ msg: false, text: 'No se pudo registrar este usuario', error:error.message })
        })
})


module.exports = router;