$(document).ready(function(){

    $('#editBio').click(bioForm);
});

function bioForm(){
    let input = $('<textarea></textarea>');

    let bio = $('#bio');
    textBio = $(bio).text();
    $(input).text(textBio);
    $(input).attr('class', 'form-control');
    $(input).attr('id', 'newBio');

    $(bio).after(input);
    $(bio).remove();

    let button = $('<button></button>');
    $(button).attr('class', 'btn btn-primary mt-2');
    $(button).text('Actualizar');

    $(input).after(button);
}

function updateBio(){
    let textoBio = $('#newBio').text();

    $.pos
}