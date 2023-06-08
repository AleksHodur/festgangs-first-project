$(document).ready(function(){

    let id = $('#userId').text();
    let picture = $('#profilePic');

    let bio = $('#bio');
    let artists = $('#favArtists');
    let genres = $('#favGenres');

    $.get('/user/' + id, function(data, status){

        const user = data.user;
        
        if(user.profilePhoto){
            $(picture).css('background-image', 'url(/userFiles/' + id + '/img/profile/profile.jpg)');
        }else{
            $(picture).css('background-image', 'url(/userFiles/default/img/profile/profile.png)');
        }

        if(!user.bio){
            $(bio).text('Todavía no tiene una biografía');
        }

        if(!user.artists){
            $(artists).text('Todavía no tiene unos artistas favoritos');
        }

        if(!user.genres){
            $(genres).text('Todavía no tiene unos géneros favoritos');
        }
        
    }).fail(function(error){

        console.log(error);
    });
});