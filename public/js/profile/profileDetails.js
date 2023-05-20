$(document).ready(function(){

    let userTitle = $('#username');
    let bio = $('#bio');
    let artists = $('#favArtists');
    let genres = $('#favGenres');

    $.get('/user/inSession', function(data, status){
        
        $(userTitle).text(data.name);
        $(userTitle).css('font-size', '3rem')

        if(data.bio){
            $(bio).text(data.bio);
        }else{
            $(bio).text('Todavía no has introducido una biografía');
        }

        if(data.artists){
            $(artists).text(data.artists);
        }else{
            $(artists).text('Todavía no has introducido a tus artistas favoritos');
        }

        if(data.genres){
            $(genres).text(data.genres);
        }else{
            $(genres).text('Todavía no has introducido tus géneros favoritos');
        }
        
        
    })
});