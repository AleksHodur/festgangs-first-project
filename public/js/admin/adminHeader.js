$(document).ready(function(){

    $.get('/user/inSession', function(data, status){

        let user = data;

        if(user.type == 2){//si el usuario es admin
            changeViewOption();
            showViewType();
        }
    });
});

function changeViewOption(){
    /** Colocar la opción de cambiar vista antes del último elemento
     * del dropdown
     */
    let optionLi = $('<li></li>');
    $('#beforeChangeView').before(optionLi);

    let optionLink = $('<a></a>');
    $(optionLink).text('Cambiar vista');
    $(optionLink).attr('class', 'dropdown-item');
    $(optionLink).attr('id', 'optionLink');

    $(optionLi).append(optionLink);

    let adminPath = /admin/;
    let currentPath = window.location.pathname;

    /**
     * Si el path contiene admin, estamos en la vista de administrador
     * y al pulsar queremos cambiar a la de usuario. De lo contrario,
     * cambiamos a la de administrador
     */
    if(adminPath.test(currentPath)){
        $(optionLink).attr('href', '/');
    }else{
        $(optionLink).attr('href', '/admin/events');
    }
}

/**
 * Función para mostar un mensaje con el tipo de vista
 */
function showViewType(){

    let currentPath = window.location.pathname;
    console.log('Current path: ' + currentPath);

    let adminPath = /admin/;

    let viewMessage = $('<h5></h5>');
    $(viewMessage).attr('class', 'text-secondary');
    $(viewMessage).css('font-weight', 'blod');
    $('#userMenu').before(viewMessage);

    if(adminPath.test(currentPath)){
        $(viewMessage).text('[Vista Administrador]');
    }else{
        $(viewMessage).text('[Vista Usuario]');
    }
}