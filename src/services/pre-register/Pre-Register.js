const { Router } = require('express');
const router = Router();
const { routes } = require('../../config/routes/index');
const { db } = require('../../config/config')
import moment from 'moment'


moment.locale('es')


router.post(routes.AddPreregister, async (req, resp) => {
    const data = req.body
    // var CI = String(data.cedula)
    // console.log(CI)
    try {
    await db.collection('Pre-Register').doc(`${data.cedula}`).set({
        nombre:data.nombre,
        apellido:data.apellido,
        nacionalidad:'',
        cliente:data.cliente,
        estatus:"Pre-Registrado",
        cedula:data.cedula,
        direccion:data.direccion,
        fechaInicio:data.fechaInicio,
        fechaRegistro:moment().format('MMMM Do YYYY, h:mm'),
    }).then(res =>{
        resp.send({ msg:true, text: 'Registro agregado con éxito' })
        console.log(res)
    }).catch((error)=>{
        resp.send({ msg: false, text:'Registro no exitoso intentelo de nuevo', error:error })
        console.log(error.message)
    });
} catch (error) {
    resp.send({ msg: false, error: error.message})
}
})



module.exports = router;