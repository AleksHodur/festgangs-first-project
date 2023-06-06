$(document).ready(function(){

    let leadDiv = $('#leadGroups');
    let parDiv = $('#participantGroups');

    $.get('/group/myGroups/json', function(data, status){
        
        let leadGroups = data.leadGroups;
        let parGroups = data.participantGroups;

        leadGroups.forEach(group => {

            let newGroup = $('<div></div>');
            $(newGroup).attr('class', 'row');

/*             let textCol = $('<div></div>');
            $(textCol).attr('class', 'col');
            $(newEvent).append(textCol); */

            let title = $('<h1></h1>');
            //$(title).text();
            $(newGroup).append(title);
            
            let button = $('<a></a>');
            $(button).attr('href', '/group/' + group.leader);
            $(button).text('Entrar');

            $.get('/user/' + group.leader, function(data, status){

                let titleName = data.user.name;

                $.get('/event/json/' + group.event_id, function(data, status){

                    let titleEvent = data.evento.title;

                    $(title).text('Grupo de ' + titleName + ' para ' + titleEvent);

                    $(leadDiv).append(newGroup);
                });
            });
        });
    });
});