$(document).ready(function(){

    $('#newButton').click(function(){

        $.get('/user/inSession', function(data, status){
             let user = data;
             
             submitForm(user);
        });

    });
});

function submitForm(user){

    let groupData = {
        leader: user,
        max_users: $('#maxUsers').val()
    };

    if(groupData.max_users >= 2 && groupData.max_users <= 10){

        $.post('group/new', groupData, function(data, status){

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
    }

}

function newSuccess(user){

    $('#newForm').empty();

    let info = $('<h3></h3>');
    $(info).attr('class', 'text-success');
    $(info).text('Grupo de ' + user.name + ' creado con éxito');

    $('#newForm').appnd(info);
}