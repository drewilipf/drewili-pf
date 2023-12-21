const logoutController = async (req) =>{
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            req.session.destroy((err)=>{
                if (err) {
                    console.error('Error al cerrar sesión: ', err)
                    reject('Error interno del servidor')
                } else {
                    resolve('Cierre de sesión exitoso')
                }
            })
        }, 1000);
    })
}

module.exports = logoutController