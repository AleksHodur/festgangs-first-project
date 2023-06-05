document.ready(function(){

    let leadDiv = $('#leadGroups');
    let parDiv = $('#participantGroups');

    $.get('group/myGroups', function(data, status){
        
        let leadGroups = data.leadGroups;
    });
});