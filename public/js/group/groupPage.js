$(document).ready(async function(){

    let group_id = $('#groupId').text();

    $('#postNewComment').click(async function (){

        await postNewComment();
    });

    await getForum(group_id);
    //await getEvent(group_id);
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

    //let forum = $('#forum');
    //let newCommentDiv = $('#newComment');
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

                let photoDiv = $('<div></div>');
                $(photoDiv).attr('class', 'rounded-circle');
                $(photoDiv).css('background-size', 'cover');
                $(photoDiv).css('background-position', 'center');
                $(photoDiv).css('min-height', '80px');
                $(photoDiv).css('min-width', '80px');
                //$(photoDiv).text('&nbsp;');
                $(photoDiv).css('background-image', 'url(/userFiles/' + comment.user_id +
                    '/img/profile/profile.jpg)');
                $(photoInRow).append(photoDiv);

                let contentCol = $('<div></div>');
                $(contentCol).attr('class', 'col bg-light');
                $(commentRow).append(contentCol);

                let contentTitle = $('<h6></h6>');
                $(contentTitle).css('font-weight', 'bold');
                $(contentCol).append(contentTitle);

                let contentParagraph = $('<p></p>');
                $(contentParagraph).attr('class', 'm-3');
                $(contentParagraph).text(comment.content);//!!!
                $(contentCol).append(contentParagraph);

                $.get('/user/' + comment.user_id, async function(data, status){

                    let user = data.user;

                    $(contentTitle).text(user.name);
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