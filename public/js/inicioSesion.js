$(document).ready(function(){
    const botonInicio = $('#inicioSesion');
    const form = $('#formSesion');

    const datosUsuario = {
        email: $('#email'),
        password: $('#password')
    };

    $(botonInicio).click(function(){

/*         $.post('/login', datosUsuario, function(response, status){
            console.log(response);
        });  */

        $.ajax({
            url: '/login',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(datosUsuario),

            success: function(data, status){
                console.log(data);
            },
            error: function(error){
                console.error(error);
            }
        });
    });
});