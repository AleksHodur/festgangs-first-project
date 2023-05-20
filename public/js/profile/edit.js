$(document).ready(function(){

    //$('#editBio').click(bioForm);

    $('#edit').click(function(){
        let updateForm = new bootstrap.Modal(document.getElementById('updateModal'));
        updateForm.show();

        $('#bioForm').text($('#bio').text());
        $('#artistsForm').text($('#favArtists').text());
        $('#genresForm').text($('#favGenres').text());
    });

    $('#updateButton').click(function(){
        
    });
});