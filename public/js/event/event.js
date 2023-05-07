$(document).ready(function(){

    $.get('/event', function(data, status){
        let divEvents = $('#events');
        let events = data;

        events.forEach(evento => {
            let title = $('<h1></h1>');
            $(title).text(evento.title);
            $(divEvents.append(title));
        });
    });
});