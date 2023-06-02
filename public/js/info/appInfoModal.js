$(document).ready(function(){

    $('#buttonAppInfo').click(function(){

        let modal = new bootstrap.Modal(document.getElementById('appInfo'));
        modal.show();

        return false;
    });
});