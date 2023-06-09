$(document).ready( async function(){

    $.get('/group/myGroups/json', async function(data, status){
        
        let leadGroups = data.leadGroups;
        let parGroups = data.participantGroups;
        console.log('This is parGroups in the front')
        console.log(parGroups);

        console.log('and this is data');
        console.log(data);

        await getLeadGroups(leadGroups);
        await getParGroups(parGroups);

    });
});

/**
 * Mostrando los grupos en los que el usuario en sesión es lead
 */
async function getLeadGroups(leadGroups){
    let leadDiv = $('#leadGroups');

    if(leadGroups.length > 0){

        leadGroups.forEach(async (group) => {

            let newGroup = $('<div></div>');
            $(newGroup).attr('class', 'row mt-3');

            let title = $('<h3></h3>');
            $(newGroup).append(title);
            
            let button = $('<a></a>');
            $(button).attr('href', '/group/' + group.id);
            $(button).attr('class', 'btn btn-primary ml-3');
            $(button).text('Entrar');
            $(newGroup).append(button);

            $.get('/user/' + group.leader,async function(data, status){

                let titleName = data.user.name;

                $.get('/event/json/' + group.event_id, async function(data, status){

                    let titleEvent = data.evento.title;

                    $(title).text('Grupo de ' + titleName + ' para ' + titleEvent);

                    $(leadDiv).append(newGroup);
                    $(leadDiv).append('<hr>');

                });
            });
        });

    }else{
        let message = $('<h4></h4>');
        $(message).text('No se han encontrado grupos');
        $(message).attr('class', 'text-secondary');
        $(leadDiv).append(message);
    }
}

/**
 * Mostrando grupos en los que el usuario en sesión es participantes
 */
async function getParGroups(parGroups){
    let parDiv = $('#participantGroups');

    if(parGroups.length > 0){

        parGroups.forEach(async (group) => {

            let newGroup = $('<div></div>');
            $(newGroup).attr('class', 'row mt-3');

            let title = $('<h3></h3>');
            $(newGroup).append(title);
            
            let button = $('<a></a>');
            $(button).attr('href', '/group/' + group.id);
            $(button).attr('class', 'btn btn-primary ml-3');
            $(button).text('Entrar');
            $(newGroup).append(button);

            $.get('/user/' + group.leader, async function(data, status){

                let titleName = data.user.name;

                $.get('/event/json/' + group.event_id, async function(data, status){

                    let titleEvent = data.evento.title;

                    $(title).text('Grupo de ' + titleName + ' para ' + titleEvent);

                    $(parDiv).append(newGroup);
                    $(parDiv).append('<hr>');
                });
            });
        });

    }else{
        let message = $('<h4></h4>');
        $(message).text('No se han encontrado grupos');
        $(message).attr('class', 'text-secondary');
        $(parDiv).append(message);
    }
}