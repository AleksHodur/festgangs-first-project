$(document).ready(function(){

    $('#cerrarSesion').click(function(){

        $.get('/close', function(data, status){
            console.log('Sesión cerrada');

            window.location.replace("/");
        })
        .fail(function(error){
            console.log(error);
        });
    });
});