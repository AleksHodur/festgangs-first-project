/* //Poner una imagen aleatoria de fondo
let number = Math.floor(Math.random() * 6) + 1;
//let number = 1;
let imagePath = "url('/img/login/login" + number + ".jpg')";
$('body').css("background-image", imagePath); */

const botonInicio = $('#inicioSesion');

$(document).ready(function(){
/*
    $.ajax({
        url: '/prueba',
        type: 'GET',
        contentType: 'application/json',
        data: JSON.stringify(datosUsuario),

        success: function(data, status){
            console.log(data.message);
            alert('enhorabuena');
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error:', textStatus, errorThrown);
            console.log('jqXR:', jqXHR);
          }
    }); */

    $(botonInicio).click(function(){

        let datosUsuario = {
            email: $('#email').val(),
            password: $('#pass').val()
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

/*          $.ajax({
            url: '/login',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(datosUsuario),

            success: function(data, status){
                console.log(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Error:', textStatus, errorThrown);
                console.log('jqXR:', jqXHR);
              }
        }); 
 */

        return false;

    });
});

function validarCorreo(correo){
    let patron = /^[a-z]+([a-z0-9]|_|\-|\.)+@([a-z0-9]|_|\-)+\.[a-z]{2,3}$/;
    return patron.test(correo);
}