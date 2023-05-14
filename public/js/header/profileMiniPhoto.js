$(document).ready(function(){

    let img = $('#profileMini');

    $.get('/user/inSession', function(data, status){
        let userId = data.id;
        $(img).attr('src', '/userFiles/' + userId + '/img/profile/profile.jpg');
    })
});