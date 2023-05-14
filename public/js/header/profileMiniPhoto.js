$(document).ready(function(){

    let img = $('#profileMini');

    $.get('/user/inSession', function(data, status){
        let hasProfilePic = data.profilePhoto;
        console.log(hasProfilePic);

        if(hasProfilePic){
            let userId = data.id;
            $(img).css('background-image', 'url(/userFiles/' + userId + '/img/profile/profile.jpg)');
        }else{
            $(img).css('background-image', 'url(/userFiles/default/img/profile/profile.png)');
        }
        
    })
});