$(document).ready(function(){

    $.get('/event', function(data, status){
        let divEvents = $('#events');
        let events = data;

        events.forEach(evento => {
            let newEvent = $('<div></div>');
            $(newEvent).attr('class', 'row');

            let imageCol = $('<div></div>');
            $(imageCol).attr('class', 'col-2');
            $(newEvent).append(imageCol);
            let image = $('<img>');
            $(image).attr('src', '/eventFiles/' + evento.id + '/cover.jpg');
            $(image).attr('alt', evento.title);
            $(image).attr('class', 'img-fluid img-thumbnail');
            $(imageCol).append(image);

            let textCol = $('<div></div>');
            $(textCol).attr('class', 'col');
            $(newEvent).append(textCol);

            let title = $('<h1></h1>');
            $(title).text(evento.title);
            $(textCol).append(title);

            let location = $('<span></span>');
            $(location).text(evento.location + ', ' + evento.city + ', ' + evento.country);
            $(location).attr('class', 'text-secondary ml-3 location');
            $(title).append(location);

            let datosEvento = $('<div></div>');
            $(datosEvento).attr('class', 'd-flex mt-3');
            $(textCol).append(datosEvento);

            let artist = $('<p><b>Artista(s)</b>: ' + evento.artist + '</p>');
            $(artist).css('max-width', '50%');
            $(datosEvento).append(artist);
            
            let fechaFormato = new Date(evento.date);
            let textoFecha ='<b>Fecha</b>: ' + getZero(fechaFormato.getDate()) +
            '/' + getZero(fechaFormato.getMonth() + 1) + '/' + fechaFormato.getFullYear();
            let date = $('<p>' + textoFecha + '</p>');
            $(date).attr('class', 'ml-3')
            $(datosEvento).append(date);

            $(divEvents).append(newEvent);
            $(divEvents).append('<hr>');

        });
    })
    .fail(function(){
        let error = $('<h1></h1>');
        $(error).text('No se han encontrado eventos :(');
        $(divEvents).append(error);
    });
});

function getZero(fecha){

    if(fecha < 10){
        return '0' + fecha;
    }else{
        return fecha;
    }
}