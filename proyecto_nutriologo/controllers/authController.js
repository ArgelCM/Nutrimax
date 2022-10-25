const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const conexion = require('../database/db')
const {promisify} = require('util')

//procedimiento para registrarnos
exports.register = async (req, res)=>{    
    try {
        const name = req.body.name
        const apellidopaterno = req.body.apellidopaterno
        const apellidomaterno = req.body.apellidomaterno
        const telefono = req.body.telefono
        const direccion = req.body.direccion
        const correo  = req.body.correo 
        const ciudad = req.body.ciudad
        const pais = req.body.pais
        const tipousuario = 1
        const user = req.body.user
        const pass = req.body.pass
        
        let passHash = await bcryptjs.hash(pass, 8)  
        
        if(!user || !pass || !name || !apellidopaterno || !apellidomaterno || !direccion || !correo || !ciudad || !tipousuario ){
            res.render('register',{
                alert:true,
                alertTitle: "Advertencia",
                alertMessage: "Ingrese un usuario y password",
                alertIcon:'info',
                showConfirmButton: true,
                timer: false,
                ruta: 'register'
            })
        }else{
        //console.log(passHash)   
            conexion.query('INSERT INTO proyecto SET ?', {user:user, name: name, apellidopaterno: apellidopaterno, apellidomaterno: apellidomaterno, telefono: telefono, direccion: direccion, correo: correo, ciudad: ciudad, pais: pais, tipousuario: tipousuario, name: name, pass:passHash}, (error, results)=>{
                if(error){console.log(error)}
                res.redirect('/')
            })
        }
    } catch (error) {
        console.log(error)
    }       
}

exports.login = async (req, res)=>{
    try {
        const user = req.body.user
        const pass = req.body.pass        

        if(!user || !pass ){
            res.render('login',{
                alert:true,
                alertTitle: "Advertencia",
                alertMessage: "Ingrese un usuario y password",
                alertIcon:'info',
                showConfirmButton: true,
                timer: false,
                ruta: 'login'
            })
        }else{
            conexion.query('SELECT * FROM proyecto WHERE user = ?', [user], async (error, results)=>{
                if( results.length == 0 || ! (await bcryptjs.compare(pass, results[0].pass)) ){
                    res.render('login', {
                        alert: true,
                        alertTitle: "Error",
                        alertMessage: "Usuario y/o Password incorrectas",
                        alertIcon:'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'login'    
                    })
                }else{
                    //inicio de sesión OK
                    const id = results[0].id
                    const token = jwt.sign({id:id}, process.env.JWT_SECRETO, {
                        expiresIn: process.env.JWT_TIEMPO_EXPIRA
                    })
                    //generamos el token SIN fecha de expiracion
                   //const token = jwt.sign({id: id}, process.env.JWT_SECRETO)
                   console.log("TOKEN: "+token+" para el USUARIO : "+user)

                   const cookiesOptions = {
                        expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                        httpOnly: true
                   }
                   res.cookie('jwt', token, cookiesOptions)
                   res.render('login', {
                        alert: true,
                        alertTitle: "Conexión exitosa",
                        alertMessage: "¡LOGIN CORRECTO!",
                        alertIcon:'success',
                        showConfirmButton: false,
                        timer: 800,
                        ruta: 'index'
                   })
                }
            })
        }
    } catch (error) {
        console.log(error)
    }
}

exports.isAuthenticated = async (req, res, next)=>{
    if (req.cookies.jwt) {
        try {
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)
            conexion.query('SELECT * FROM proyecto WHERE id = ?', [decodificada.id], (error, results)=>{
                if(!results){return next()}
                req.user = results[0]
                return next()
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }else{
        res.redirect('/login')        
    }
}

exports.logout = (req, res)=>{
    res.clearCookie('jwt')   
    return res.redirect('/')
}

exports.MetodoPago = async (req, res)=>{    
    try {
        const tarjeta = req.body.tarjeta
        const fecha = req.body.fecha
        const cvv = req.body.cvv

            conexion.query('INSERT INTO tarjeta SET ?', {tarjeta:tarjeta, fecha: fecha, cvv: cvv}, (error, results)=>{
                if(error){console.log(error)}
                res.redirect('/MetodoPago')
            })
    } catch (error) {
        console.log(error)
    }       
}