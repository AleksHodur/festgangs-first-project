$(document).ready(function(){

    $.get('/event', function(data, status){
        let divEvents = $('#events');
        let events = data;

        events.forEach(evento => {
            let title = $('<h1></h1>');
            $(title).text(evento.title);
            $(divEvents).append(title);

            let artist = $('<p></p>');
            $(artist).text('Artista(s): ' + evento.artist);
            $(divEvents).append(artist);

            let location = $('<p></p>');
            $(location).text('Ubicación: ' + evento.location + ', ' + evento.city + ', ' + evento.country);
            $(divEvents).append(location);
            
            let fechaFormato = new Date(evento.date);
            let date = $('<p></p>');
            $(date).text('Fecha: ' + getZero(fechaFormato.getDate()) +
            '/' + getZero(fechaFormato.getMonth() + 1) + '/' + fechaFormato.getFullYear());
            $(divEvents).append(date);

            $(divEvents).append('<hr>');
        });
    })
    .fail(function(){
        //imprimir mensaje no encotrao o algo así
    });
});

function getZero(fecha){

    if(fecha < 10){
        return '0' + fecha;
    }else{
        return fecha;
    }
}