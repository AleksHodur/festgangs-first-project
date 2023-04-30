$(document).ready(function(){
    const botonInicio = $('#inicioSesion');
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