$(document).ready(function(){

    $('#edit').click(function(){
        let updateForm = new bootstrap.Modal(document.getElementById('updateModal'));
        updateForm.show();

        $('#bioForm').text($('#bio').text());
        $('#artistsForm').text($('#favArtists').text());
        $('#genresForm').text($('#favGenres').text());
    });

    $('#updateButton').click(function(){

        $.get('/user/inSession', async function(data, status){
            console.log('user in session');
            console.log(data);
            console.log('id: ' + data.id)
            id = data.id;

            await updateUser(data.id);
        });
    });
});

async function updateUser(id){

    const infoUser = {
        bio: $('#bioForm').val(),
        artists: $('#artistsForm').val(),
        genres: $('#genresForm').val()
    };

    $.ajax({
        url: '/user/' + id,
        type: 'PUT',
        data: infoUser,
        success: function(data, status) {
            console.log('success on put user/:id');
        },
        error: function(error) {
            console.error(error);
        }
    }).always( function(data) {
        $('#updateMessage').text(data.message);

        if(data.success){
            $('#updateMessage').attr('class', 'text-success mt-2');
            setTimeout(2000);
            location.reload();
        }else{
            $('#updateMessage').attr('class', 'text-danger mt-2');
        }
    });
}