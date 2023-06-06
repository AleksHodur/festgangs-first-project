const eventDAO = require('../dao/eventDAO');

const event_get_all = async (request, response) => {
    const events = await eventDAO.getAllEvents();
    response.status(200).json(events);
}

const event_get_by_id = async (request, response) => {

    let evento = await eventDAO.getById(request.params.id);
    console.log('evento desde get by id controller');
    console.log(evento);

    if(evento){
        response.render('event/event', {title: 'Crear grupo', evento: evento});
    }else{
        response.render('error/500', {title: 'Error 500'});
    }
}

const event_get_by_id_json = async (request, response) => {

    let evento = await eventDAO.getById(request.params.id);
    console.log('evento desde get by id controller');
    console.log(evento);

    if(evento){
        response.status(200).json({evento: evento});
    }else{
        response.render('error/500', {title: 'Error 500'});
    }
}


module.exports = {
    event_get_all,
    event_get_by_id,
    event_get_by_id_json
};