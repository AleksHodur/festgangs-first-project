$(document).ready(function(){

    $('#createButton').click(function(){

        let datosUsuario = {
            username: $('#username').val(),
            email: $('#email').val(),
            password: $('#pass').val()
        };

        if(validarCorreo(datosUsuario.email)){
            if(datosUsuario.password != null && datosUsuario.password != '' &&
                datosUsuario.username != null && datosUsuario.username != ''){

                    /** Primero hay que comprobar que no exista un usuario con el mismo nombre o el mismo mail */
                    $.get('/user/exists/name/' + datosUsuario.username, function(data, status){
                        
                        if(data.found){
                            $('#message').text(data.message);
                        }else{

                            console.log('Enhorabuena, nombre único!');

                            $.get('/user/exists/email/' + datosUsuario.email, function(data, status){

                                if(data.found){
                                    $('#message').text(data.message);
                                }else{

                                    $.post('/signup', datosUsuario, function(data, status){

                                        if(data != null){
                                            console.log('success');
                                            console.log(data);
                                        }

                                    }).fail(function(){
                                        $('#message').text('Algo ha salido mal :( Inténtalo más tarde');
                                        console.log('Fallo en post');
                                    });
                                }

                            }).fail(function(){
                                $('#message').text('Algo ha salido mal :( Inténtalo más tarde');
                                console.log('Fallo en get email');
                            });
                        }

                    }).fail(function(){
                        $('#message').text('Algo ha salido mal :( Inténtalo más tarde');
                        console.log('Fallo en get name');
                    });


            }else{
                $('#message').text('Introduce todos los campos');
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