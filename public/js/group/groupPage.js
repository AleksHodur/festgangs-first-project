$(document).ready(async function(){

    let group_id = $('#groupId').text();

    await getForum(group_id);
    //await getEvent(group_id);
});

async function getForum(id){

    let forum = $('#forum');

    $.get('/byGroup/' + id, async function(data, status){

        const comments = data.comments;

        if(comments){

            comments.forEach(async (comment) => {

                let photoRow = $('<div></div>');
                $(photoRow).attr('class', 'row mb-3 mx-3');
                $(forum).append(photoRow);

                let photoCol = $('<div></div>');
                $(photoCol).attr('class', 'col-3');
                $(photoRow).append(photoCol);

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
                $(photoDiv).text('&nbsp;');
                $(photoDiv).css('background-image', 'url(/userFiles/' + comment.user_id +
                    '/img/profile/profile.jpg)');

                let contentCol = $('<div></div>');
                $(contentCol).attr('class', 'col bg-light');
                $(forum).append(contentCol);

                let contentTitle = $('<h6></h6>');
                $(contentTitle).css('font-weight', 'bold');
                $(contentCol).append(contentTitle);

                let contentParagraph = $('<p></p>');
                $(contentParagraph).attr('class', 'm-3');
                $(contentParagraph).text(comment.content);//!!!

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

    let forum = $('#forum');
    let message = $('<h4></h4>');

    $(forum).append(message);
    $(message).text('De momento, no hay mensajes en el foro. Ánimate :)');
}