$(document).ready(async function(){

    let group_id = $('#groupId').text();
    let leader_id = $('#leaderId').text();

    $('#postNewComment').click(async function (){

        await postNewComment();
    });

    await getForum(group_id);
    await getEvent(group_id);
    await getMembers(group_id, leader_id);
});

async function postNewComment(){

    let content = $('#newContent').val();
    let group_id = $('#groupId').text();

    const commentData = {
        content,
        group_id
    }

    $.post('/comment', commentData, async function(){

        $('#newContent').val('');
        location.reload();

    }).fail(function(error){

        console.error(error);
        let message = $('<p></p>');
        $(message).attr('class', 'text-danger ml-3 mt-3');
        $(message).text('Ha ocurrido un error :( Prueba otra vez más tarde');
        $('#postNewComment').after(message);
    });
}

async function getForum(id){

    let forum = $('#forumMessages');

    $.get('/comment/byGroup/' + id, async function(data, status){

        const comments = data.comments;

        if(comments.length > 0){

            comments.forEach(async (comment) => {

                console.log('esto es el comentario');
                console.log(comment);

                let commentRow = $('<div></div>');
                $(commentRow).attr('class', 'row mb-3 mx-3');
                $(forum).append(commentRow);

                let photoCol = $('<div></div>');
                $(photoCol).attr('class', 'col-3');
                $(commentRow).append(photoCol);

                let photoContainer = $('<div></div>');
                $(photoContainer).attr('class', 'container-fluid container-centered');
                $(photoCol).append(photoContainer);

                let photoInRow = $('<div></div>');
                $(photoInRow).attr('class', 'row');
                $(photoContainer).append(photoInRow);

                let photoLink = $('<a></a>');
                $(photoLink).attr('href', '/user/profile/' + comment.user_id);
                $(photoInRow).append(photoLink);

                let photoDiv = $('<div></div>');
                $(photoDiv).attr('class', 'rounded-circle');
                $(photoDiv).css('background-size', 'cover');
                $(photoDiv).css('background-position', 'center');
                $(photoDiv).css('min-height', '80px');
                $(photoDiv).css('min-width', '80px');
                $(photoLink).append(photoDiv);

                let contentCol = $('<div></div>');
                $(contentCol).attr('class', 'col bg-light');
                $(commentRow).append(contentCol);

                let contentTitle = $('<h6></h6>');
                $(contentTitle).css('font-weight', 'bold');
                $(contentCol).append(contentTitle);

                let contentParagraph = $('<p></p>');
                $(contentParagraph).attr('class', 'm-3');
                $(contentParagraph).text(comment.content);
                $(contentCol).append(contentParagraph);

                $.get('/user/' + comment.user_id, async function(data, status){

                    let user = data.user;

                    $(contentTitle).text(user.name);

                    if(user.profilePhoto){
                        $(photoDiv).css('background-image', 'url(/userFiles/' + user.id +
                            '/img/profile/profile.jpg)');

                    }else{
                        $(photoDiv).css('background-image', 'url(/userFiles/default/img/profile/profile.png)');
                    }
                });

            });

        }else{
            noComments();
        }
    });
}

async function noComments(){

    //let newCommentDiv = $('#newComment');
    let forum = $('#forumMessages');
    let message = $('<h4></h4>');

    $(forum).append(message);
    $(message).text('Todavía no hay mensajes en el foro');
    $(message).attr('class', 'text-secondary');
}

async function getEvent(id){

    $.get('/event/byGroup/' + id, async function(data, status){

        let evento = data.evento;

        if(evento){

            let img = $('#eventCover');
            $(img).attr('src', '/eventFiles/' + evento.id + '/cover.jpg');
            $(img).attr('class', 'img-fluid img-thumbnail');
            $(img).attr('alt', evento.title);

            $('#eventTitle').text(evento.title);

            let formatDate = new Date(evento.date);
            let dateText = getZero(formatDate.getDate()) +
                '/' + getZero(formatDate.getMonth() + 1) + '/' + formatDate.getFullYear();
            $('#eventDate').text(dateText);

            $('#eventArtist').text(evento.artist);
            $('#eventLocation').text(evento.location + ', ' + evento.city + ', ' + evento.country);

        }else{
            noEvent();
        }
    }).fail(async function(error){

        console.error(error);
        noEvent();
    });
}

async function noEvent(){

    let message = $('<h4></h4>');
    $(message).attr('class', 'text-danger');
    $(message).text('Algo ha salido mal :( Inténtalo otra vez más tarde');

    $('#eventDiv').empty();
    $('#eventDiv').append(message);
}

function getZero(fecha){

    if(fecha < 10){
        return '0' + fecha;
    }else{
        return fecha;
    }
}

async function getMembers(group_id, leader_id){

    await getLead(leader_id);
    await getParticipants(group_id);
}

async function getLead(user_id){

    $.get('/user/' + user_id, async function(data, status){

        const leader = data.user;

        let profile = $('#leadProfilePic');
        $(profile).css('background-size', 'cover');
        $(profile).css('background-position', 'center');
        $(profile).css('min-height', '80px');
        $(profile).css('min-width', '80px');

        if(leader.profilePhoto){
            $(profile).css('background-image', 'url(/userFiles/' + leader.id +
                '/img/profile/profile.jpg)');
        }else{
            $(profile).css('background-image', 'url(/userFiles/default/img/profile/profile.png)');
        }

        $('#leaderName').html('<b>' + leader.name + '</b>');

        $('#leaderLink').attr('href', '/user/profile/' + leader.id);

    }).fail(function(error){
        console.log(error);
        $('#leaderName').text('Algo ha salido mal :( Inténtalo otra vez más tarde');
    });
}

async function getParticipants(id){
    
    $.get('/user/byGroup/' + id, async function(data, status){

        let users = data.users;
        let mainDiv = $('#participantsDiv');

        users.forEach(async (user) => {

            let userLink = $('<a></a>');
            $(userLink).attr('href', '/user/profile/' + user.id);
            $(mainDiv).append(userLink);
            
            let userInfo = $('<div></div>');
            $(userInfo).attr('class', 'row bg-light p-2');
            $(userLink).append(userInfo);

            let photoCol = $('<div></div>');
            $(photoCol).attr('class', 'col-3');
            $(userInfo).append(photoCol);

            let photoContainer = $('<div></div>');
            $(photoContainer).attr('class', 'container-fluid container-centered');
            $(photoCol).append(photoContainer);

            let photoRow = $('<div></div>');
            $(photoRow).attr('class', 'row');
            $(photoContainer).append(photoRow);

            let photoDiv = $('<div></div>');
            $(photoDiv).attr('class', 'rounded-circle');
            $(photoRow).append(photoDiv);

            $(photoDiv).css('background-size', 'cover');
            $(photoDiv).css('background-position', 'center');
            $(photoDiv).css('min-height', '80px');
            $(photoDiv).css('min-width', '80px');

            if(user.profilePhoto){
                $(photoDiv).css('background-image', 'url(/userFiles/' + user.id +
                    '/img/profile/profile.jpg)');
            }else{
                $(photoDiv).css('background-image', 'url(/userFiles/default/img/profile/profile.png)');
            }


            let nameCol = $('<div></div>');
            $(nameCol).attr('class', 'col d-flex align-items-center');
            $(userInfo).append(nameCol);

            let userName = $('<h5></h5>');
            $(userName).html('<b>' + user.name + '</b>');
            $(nameCol).append(userName);

        }).fail(function(error){
            console.log(error);

            let message = $('<h4></h4>');
            $(message).text('Algo ha salido mal :( Inténtalo otra vez');
            $(message).attr('class', 'text-danger');

            $('#participantsDiv').append(message);
        });
    });
}