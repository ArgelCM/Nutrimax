const express = require('express')
const router = express.Router()

const authController = require('../controllers/authController')
const conexion = require('../database/db');


//router para las vistas
//------------------------------------------------------------------------------------------------//
// vista index proximamente dashboar
router.get('/index', authController.isAuthenticated, (req, res)=>{    
    res.render('index', {user:req.user})
})
router.get('/soyverga', (req, res)=>{     
    conexion.query('SELECT * FROM proyecto',(error, results)=>{
        if(error){
            throw error;
        } else {                       
            res.render('plantilla.ejs', {results:results}, );            
        }   
    })
})

// vista confimacion 
router.get('/confirmacion', authController.isAuthenticated, (req, res)=>{     
    conexion.query('SELECT * FROM consultas where estatus = 1',(error, results)=>{
        if(error){
            throw error;
        } else {                       
            res.render('confirmacion.ejs', {results:results}, );            
        }   
    })
    
})

// vista pendientes
router.get('/pendiente', authController.isAuthenticated,(req, res)=>{     
    conexion.query('SELECT * FROM consultas where estatus = 2',(error, results)=>{
        if(error){
            throw error;
        } else {                       
            res.render('pendiente.ejs', {results:results},);            
        }   
    })
    
})
// vista cancelacion
router.get('/Cancelaciones',authController.isAuthenticated, (req, res)=>{

    conexion.query('SELECT * FROM consultas where estatus = 2',(error, results)=>{
        if(error){
            throw error;
        } else {                       
            res.render('Cancelaciones', {results:results},);            
        }   
    })
})
//vista tarjetas
router.get('/MetodoPago', authController.isAuthenticated, (req, res)=>{

    conexion.query('SELECT * FROM tarjeta',(error, results)=>{
        if(error){
            throw error;
        } else {                       
            res.render('MetodoPago', {results:results},);            
        }   
    })
})

// vista cuenta bancarias
router.get('/CuentaBancario', authController.isAuthenticated, (req, res)=>{
    conexion.query('SELECT cuentabancaria.*, proyecto.rfc FROM cuentabancaria LEFT JOIN proyecto ON cuentabancaria.id_nutri = proyecto.id;',(error, results)=>{
        if(error){
            throw error;
        } else {                       
            res.render('CuentaBancario', {results:results},);            
        }   
    })
})

// SELECT cuentabancaria.*, proyecto.rfc
// FROM cuentabancaria 
// 	LEFT JOIN proyecto ON cuentabancaria.id_nutri = proyecto.id;
//------------------------------------------------------------------------------------------------//
router.get('/', (req, res)=>{
    res.render('paginaprincipal')
})

router.get('/login', (req, res)=>{
    res.render('login', {alert:false})
})
router.get('/Retirar', (req, res)=>{
    res.render('Retirar', {alert:false})
})
router.get('/register', (req, res)=>{
    res.render('register')
})
router.get('/plantilla', (req, res)=>{
    res.render('plantilla',{user:req.user})
})
router.get('/home',authController.isAuthenticated, (req, res)=>{
    res.render('home',{user:req.user})
})
router.get('/rganancias', authController.isAuthenticated, (req, res)=>{
    res.render('rganancias',{user:req.user})
})
router.get('/rcliente', authController.isAuthenticated, (req, res)=>{
    res.render('rcliente',{user:req.user})
})
router.get('/rconsulta', authController.isAuthenticated, (req, res)=>{
    res.render('rconsulta',{user:req.user})
})
router.get('/error404', authController.isAuthenticated, (req, res)=>{
    res.render('error',{user:req.user})
})
router.get('/contacto', authController.isAuthenticated, (req, res)=>{
    res.render('contacto',{user:req.user})
})
router.get('/pendiente1', authController.isAuthenticated, (req, res)=>{
    res.render('pendiente12',{user:req.user})
})

router.get('/DarConsultas', authController.isAuthenticated, (req, res)=>{
    res.render('DarConsultas',{user:req.user})
})


router.get('/Informacion', (req, res)=>{
    res.render('Informacion',{user:req.user})
})
router.get('/configuraciones', (req, res)=>{
    res.render('configuraciones',{user:req.user})
})
// router para procedimientos
//------------------------------------------------------------------------------------------------//
// router para eliminar el regristro
router.get('/delete/:id_consulta', (req, res) => {
    const id = req.params.id_consulta;
    const estatus = 3
    conexion.query('UPDATE consultas SET ? where id_consulta = ?', [{estatus:estatus}, id],(error, results)=>{
        if(error){
            throw error;
        } else {                       
            res.redirect('/pendiente' );            
        }  
    })
})

// router para editas
router.get('/update/:id_consulta', (req, res) => {
    const id = req.params.id_consulta;
    const estatus = 2
    conexion.query('UPDATE consultas SET ? where id_consulta = ?', [{estatus:estatus}, id],(error, results)=>{
        if(error){
            throw error;
        } else {                       
            res.redirect('/pendiente' );            
        }  
    })
})

// route para eliminar tarjetas
router.get('/deletetarjeta/:id', (req, res) => {
    const id = req.params.id;
    conexion.query('Delete from tarjeta where id = ?', [ id],(error, results)=>{
        if(error){
            throw error;
        } else {                        
            res.redirect('/MetodoPago' );            
        }  
    })
})

//router para los métodos del controller
//------------------------------------------------------------------------------------------------//
router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/logout', authController.logout)
router.get('/MetodoPago', authController.MetodoPago)





const crud = require('../controllers/crud');


router.post('/update', crud.update);

module.exports = router