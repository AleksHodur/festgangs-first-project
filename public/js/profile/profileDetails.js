$(document).ready(function(){

    let userTitle = $('#username');

    $.get('/user/inSession', function(data, status){
        
        $(userTitle).text(data.name);
        $(userTitle).css('font-size', '3rem')
        
    })
});