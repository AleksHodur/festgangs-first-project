$(document).ready(function(){

    $.get('/event', function(data, status){
        let divEvents = $('#events');
        let events = data;

        events.forEach(evento => {
            /**
             * Creando el contenedor donde estará la información del evento
             */
            let newEvent = $('<div></div>');
            $(newEvent).attr('class', 'row');

            /**
             * Creando la columna donde se almacenará la imagen del evento
             * Se le añade un img cuyo origen se identifica por la el id del evento
             * Al img se le añaden las clases img-fluid, para que sea una imagen fluida,
             * y img-thumbnail para añadirle marco
             */
            let imageCol = $('<div></div>');
            $(imageCol).attr('class', 'col-2');
            $(newEvent).append(imageCol);
            let image = $('<img>');
            $(image).attr('src', '/eventFiles/' + evento.id + '/cover.jpg');
            $(image).attr('alt', evento.title);
            $(image).attr('class', 'img-fluid img-thumbnail');
            $(imageCol).append(image);


            /**
             * Creando la columna que almacenará el texto del evento
             */
            let textCol = $('<div></div>');
            $(textCol).attr('class', 'col-6');
            $(newEvent).append(textCol);

            /** Título del evento */
            let title = $('<h1></h1>');
            $(title).text(evento.title);
            $(textCol).append(title);

            /**
             * Ubicación del evento
             * Se le añaden las clases d-inline-block y text-truncate
             * más un ancho máximo para que se corte el texto si se supera el máximo
             */
            let location = $('<span></span>');
            $(location).text(evento.location + ', ' + evento.city + ', ' + evento.country);
            $(location).css('max-width', '40%');
            $(location).attr('class', 'text-secondary ml-3 location d-inline-block text-truncate');
            $(title).append(location);

            /**
             * Contenedor que contiene los datos del evento
             * Dentro de la columna del texto
             */
            let datosEvento = $('<div></div>');
            $(datosEvento).attr('class', 'd-flex mt-3');
            $(textCol).append(datosEvento);

            /** Artistas */
            let artist = $('<p><b>Artista(s)</b>: ' + evento.artist + '</p>');
            $(artist).css('max-width', '50%');
            $(datosEvento).append(artist);
            
            /**
             * Fecha del evento. Se le da formato con la función getZero()
             */
            let fechaFormato = new Date(evento.date);
            let textoFecha ='<b>Fecha</b>: ' + getZero(fechaFormato.getDate()) +
            '/' + getZero(fechaFormato.getMonth() + 1) + '/' + fechaFormato.getFullYear();
            let date = $('<p>' + textoFecha + '</p>');
            $(date).attr('class', 'ml-3')
            $(datosEvento).append(date);

            $.get('/group/byEvent/' + evento.id, function(data, status){
                console.log('from getgroups event.js front-end');
                console.log(data);

                let groups = data;
                //let infoGroups = getInfoGroups(groups, evento.id);

                let infoGroups = $('<div></div>');
                $(infoGroups).attr('class', 'col mt-3');
                let messageGroups = $('<p></p>');
                $(infoGroups).append(messageGroups);
            
            
                if(groups == null || groups.length < 1){
                    $(messageGroups).text('Este evento aún no tiene ningún grupo creado');
                }else{
                    $(messageGroups).text('Este evento tiene ' + groups.length + ' grupo(s) activo(s)');
                    
                    let checkGroups = $('<a></a>');
                    $(checkGroups).attr('class', 'btn btn-success');
                    $(checkGroups).attr('href', '#');
                    $(checkGroups).text('Ver grupos');
            
                    $(infoGroups).append(checkGroups);
            
                }
            
                let newGroup = $('<a></a>');
                $(newGroup).attr('class', 'btn btn-primary');
                $(newGroup).attr('href', '/group/new/' + evento.id);
                $(newGroup).text('Crear grupo');
                $(infoGroups).append(newGroup);

                $(newEvent).append(infoGroups);

                $(divEvents).append(newEvent);
                $(divEvents).append('<hr>');
                
            })
            .fail(function(error){
                console.log(error);
            });


/*             let infoGroups = $('<div></div>');
            $(infoGroups).attr('class', 'col mt-3');
            let messageGroups = $('<p></p>');
            $(messageGroups).text('Este evento aún no tiene ningún grupo creado');
            let newGroup = $('<a></a>');
            $(newGroup).attr('class', 'btn btn-primary');
            $(newGroup).attr('href', '/group/new/' + evento.id);
            $(newGroup).text('Crear grupo');
            $(infoGroups).append(messageGroups, newGroup); 

            $(newEvent).append(infoGroups);

            $(divEvents).append(newEvent);
            $(divEvents).append('<hr>'); */

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

async function getGroups(id){

    $.get('/group/byEvent/' + id, function(data, status){
        console.log('from getgroups event.js front-end');
        console.log(data);
        return data;
    })
    .fail(function(error){
        return null;
    });

}

async function getInfoGroups(groups, id){

    let infoGroups = $('<div></div>');
    $(infoGroups).attr('class', 'col mt-3');
    let messageGroups = $('<p></p>');
    $(infoGroups).append(messageGroups);


    if(groups == null || groups.length < 1){
        $(messageGroups).text('Este evento aún no tiene ningún grupo creado');
    }else{
        $(messageGroups).text('Este evento tiene ' + groups.length + ' grupo(s) activo(s)');
        
        let checkGroups = $('<a></a>');
        $(checkGroups).attr('class', 'btn btn-success');
        $(checkGroups).attr('href', '#');
        $(checkGroups).text('Ver grupos');

        $(infoGroups).append(checkGroups);

    }

    let newGroup = $('<a></a>');
    $(newGroup).attr('class', 'btn btn-primary');
    $(newGroup).attr('href', '/group/new/' + id);
    $(newGroup).text('Crear grupo');
    $(infoGroups).append(newGroup);

    return $(infoGroups).html();
}