$(document).ready(function(){

    console.log($('#newButton'));

    $('#newButton').click(function(){

        $.get('/user/inSession', function(data, status){
            let user = data;

            console.log('En el get');
            console.log('el user:');
            console.log(user);
             
             submitForm(user);
        });

    });
});

function submitForm(user){

    let groupData = {
        event_id: $('#eventId').val(), //IMPORTANTE BUG
        leader: user.id,
        max_users: $('#maxUsers').val()
    };

    console.log('groupData');
    console.log(groupData);

    if(groupData.max_users >= 2 && groupData.max_users <= 10){

        $.post('/group/', groupData, function(data, status){

            console.log('En el post');


            if(data.success){
                newSuccess(user);
            }else{
                $('#message').text(data.message);
            }
        })
        .fail(function(error){
            console.log(error);

            $('#message').text('Algo ha salido mal :( Inténtalo más tarde');
        });
    }else{
        $('#message').text('El número de partcipantes debe ser entre 2 y 50');

    }

}

function newSuccess(user){

    $('#newForm').empty();

    let info = $('<h3></h3>');
    $(info).attr('class', 'text-success');
    $(info).text('Grupo de ' + user.name + ' creado con éxito');

    $('#newForm').append(info);
}