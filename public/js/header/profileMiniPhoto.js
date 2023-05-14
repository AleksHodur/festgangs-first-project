$(document).ready(function(){

    let img = $('#profileMini');

    $.get('/user/inSession', function(data, status){
        let userId = data.id;
        $(img).css('background-image', 'url(/userFiles/' + userId + '/img/profile/profile.jpg)');
    })
});