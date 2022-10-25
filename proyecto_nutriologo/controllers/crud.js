//Invocamos a la conexion de la DB
const conexion = require('../database/db')

//ACTUALIZAR un REGISTRO
exports.update = (req, res)=>{
    const id_consulta = req.body.id_consulta;
    const estatus = 2;
    conexion.query('UPDATE consultas SET ? WHERE id_consulta = ?',[{estatus:estatus}, id_consulta], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/confirmacion');         
        }
});
};