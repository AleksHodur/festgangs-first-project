//$(document).ready(async function(){

    $('.updateWindow').click(async function(){

        let id = $(this).val();

        await showUpdateWindow(id);
    });
//});

async function showUpdateWindow(id){
    let updateForm = new bootstrap.Modal(document.getElementById('updateModal'));
    updateForm.show();

    $('#updateButton').click(async function(){

        const eventData = {
            id: id,
            title: $('#titleForm').val(),
            artist: $('#artistForm').val(),
            city: $('#cityForm').val(),
            country: $('#countryForm').val(),
            location: $('#locationForm').val(),
            date: $('#dateForm').val()
        }

        await updateEvent(eventData);
    });
}

async function updateEvent(eventData){

    $.ajax({
        url: '/admin/event',
        type: 'PUT',
        data: eventData,
        
        success: function(data, status){
            console.log('updated successfully');
            location.reload();
        },
        error: function(error){
            console.error(error);

            $('#updateMessage').text(data.message);
            $('#updateMessage').attr('class', 'text-danger mt-2');
        }
    });
}