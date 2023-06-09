$(document).ready( function(){

    let eventId = $('#eventIdForShow').text();

    $.get('/group/byEvent/' + eventId, function(data, status){
        let divGroups = $('#groups');
        let groups = data;

        groups.forEach( grupo => {
            //contenedor del grupo
            let newGroup = $('<div></div>');
            $(newGroup).attr('class', 'row');

            //columna del grupo
            let col = $('<div></div>');
            $(col).attr('class', 'col');
            $(newGroup).append(col);

            //título
            let title = $('<h1></h1>');
            $(col).append(title);

            //obteniendo el nombre del usuario lead
            $.get('/user/' + grupo.leader, function(data, status){
                console.log('en title get');
                console.log(data);

                let user = data.user;

                let titleText = 'Grupo de ' + user.name;
                $(title).text(titleText);

                //obteniendo el número de participantes
                $.get('/user/inGroup/' + grupo.id, function(data, status){
                    console.log('en users get');
                    console.log(data);

                    let users = data.users;
                    let sessionUserIsInGroup = data.sessionUserIsInGroup;
            
                    let numActualUsers = users.length;
                    let numMaxUsers = grupo.max_users;
        
                    let maxUsers =$('<p><b>Límite de usuarios: </b>' +
                        numMaxUsers + '</p>');
                    $(col).append(maxUsers);
        
                    let actualUsers = $('<p><b>Usuarios actuales: </b>' + 
                        numActualUsers + '</p>');
                    $(col).append(actualUsers);

                    /**
                     * Mostrando botones según el usuario en sesión este o no en
                     * el grupo, o si el grupo está lleno
                     * Si el usuario está, se muestra el botón Ver grupo
                     * Si no, se muestra el botón Unirse al grupo, que se 
                     * encuentra deshabilitado si el grupo está lleno
                     */
                    if(sessionUserIsInGroup){

                        let viewButton = $('<a></a>');
                        $(viewButton).attr('class', 'btn btn-success');
                        $(viewButton).attr('href', '/group/' + grupo.id);
                        $(viewButton).text('Ver grupo');
                        $(col).append(viewButton);

                    }else{

                        let joinButton = $('<button></button>');
                        $(joinButton).text('Unirse al grupo');
                        $(joinButton).attr('class', 'btn btn-success joinButton');
                        $(joinButton).val(grupo.id);
                        $(col).append(joinButton);
                        
                        if(numActualUsers >= numMaxUsers){
                            $(joinButton).attr('disabled', true);
                            $(joinButton).attr('title', 'El grupo está lleno');
                        }
                    }
        
                    $(divGroups).append(newGroup);
                    $(divGroups).append('<hr>');

                    /**Fucionalidad del botón de Unirse */
                    $('.joinButton').click(function(){

                        let group_id = $(this).val();
                        console.log('group id: join button')
                        console.log(group_id);

                        //Obteniendo al usuario en sesión
                        $.get('/user/inSession', function(data, status){

                            let user_id = data.id;
                            
                            //Añadiendo el usuario al grupo
                            $.post('/group/addUser', {user_id, group_id}, function(data, status){

                                console.log(data.message);
                                $(newGroup).empty();
                                
                                let newMessage = $('<h3></h3>');
                                $(newMessage).text('¡Ya formas parte del grupo!');
                                $(newMessage).attr('class', 'text-success');
                                $(newGroup).append(newMessage);
                                
                                let welcomeButton = $('<a></a>');
                                $(welcomeButton).attr('class', 'btn btn-success ml-3');
                                $(welcomeButton).attr('href', '/group/' + grupo.id);
                                $(welcomeButton).text('Ver grupo');
                                $(newGroup).append(welcomeButton);

                            }).fail(function(error){
                                console.log('error front'); //mensaje ventana fallo
                                console.error(error);
                            });
                        });

                    });
                })
                .fail(function(error){
                    console.log(error);
                });
            })
            .fail(function(error){
                console.log(error);
            });

        });
    });
});