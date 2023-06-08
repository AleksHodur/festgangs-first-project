const botonInicio = $('#inicioSesion');

$(document).ready(function(){

    $(botonInicio).click(function(){

        let datosUsuario = {
            email: $('#email').val(),
            password: $('#pass').val(),
            token: $('#token').val()
        };

        if(validarCorreo(datosUsuario.email)){
            if(datosUsuario.password != null && datosUsuario.password != ''){
                $.post('/login', datosUsuario, function(data, status){
                    console.log(data);
            
                    if(data.found){
                        window.location.replace("/");
                    }else{
                        $('#message').text(data.message);
                    }
        
                })
                .fail(function(error) {
                    console.log(error);
                  });
            }else{
                $('#message').text('Introduce una contraseña');
            }
        }else{
            $('#message').text('Introduce un correo electrónico válido');
        }

        return false;

    });
});

function validarCorreo(correo){
    let patron = /^[a-z]+([a-z0-9]|_|\-|\.)+@([a-z0-9]|_|\-)+\.[a-z]{2,3}$/;
    return patron.test(correo);
}