$(document).ready(function(){

/*     let botones = $('.joinButton');
    console.log('los join button');
    console.log(botones);

    let todosBotones = $('button');
    console.log('Todos los botones');
    console.log(todosBotones); */

    $('.joinButton').click(function(){

        let group_id = $(this).val();
        console.log('group id: join button')
        console.log(group_id);
    });
});