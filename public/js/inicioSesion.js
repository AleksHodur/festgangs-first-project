//Poner una imagen aleatoria de fondo
let number = Math.floor(Math.random() * 6) + 1;
//let number = 1;
let imagePath = "url('/img/login/login" + number + ".webp')";
$('body').css("background-image", imagePath)

const botonInicio = $('#inicioSesion');

$(document).ready(function(){

/*     //Poner una imagen aleatoria de fondo
    let number = Math.floor(Math.random() * 6) + 1;
    let imagePath = "url('/img/login/login" + number + ".jpg')";
    $('body').css("background-image", imagePath)

    const botonInicio = $('#inicioSesion'); */
/* 
     console.log('Antes del get');
    $.get('/prueba', function(data, status) {
        console.log(data.message);
    });  */
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

        console.log('antes del parseado');
        console.log('antes del parseado 2');
        console.log(JSON.stringify(datosUsuario));
          

        $.post('/login', datosUsuario, function(data, status){
            console.log(data);

            $('#message').text(data.message);

            if(data.found){
                window.location.replace("/");
            }

        })
        .fail(function(error) {
            console.log(error);
          });

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