$(document).ready(function(){
    const botonInicio = $('#inicioSesion');
    const form = $('#formSesion');

    $(botonInicio).click(function(){

        let email = $('#email');

        $.get(`/user/${email}`, function(userData){
            console.log(userData);
        });
    });
});