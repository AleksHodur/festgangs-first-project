const eventDAO = require('../dao/eventDAO');

const admin_view_events = (request, response) => {

    if(request.session.user && request.session.user.type == 2){
        response.render('admin/events', {title: 'Eventos'});
    }else{
        response.redirect('/');
    }
}

module.exports = {
    admin_view_events
}