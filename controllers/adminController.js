const eventDAO = require('../dao/eventDAO');

const admin_view_events = (request, response) => {

    if(request.session.user && request.session.user.type == 2){
        response.render('admin/events', {title: 'Eventos'});
    }else{
        response.redirect('/');
    }
}

const admin_edit_event = async (request, response) => {

    if(request.session.user && request.session.user.type == 2){

        const eventData = request.body;
        let evento = await eventDAO.update(eventData);

        if(evento){
            response.status(200).json({evento: evento});
        }else{
            response.render('error/500', {title: 'Error 500'});
        }
    }
}

module.exports = {
    admin_view_events,
    admin_edit_event
}