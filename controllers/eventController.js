const eventDAO = require('../dao/eventDAO');

const event_get_all = async (request, response) => {
    const events = await eventDAO.getAllEvents();
    response.status(200).json(events);
}

const event_get_by_id = async (request, response) => {
    const evento = await eventDAO.getById();
    response.status(200).json(evento);
}

module.exports = {
    event_get_all,
    event_get_by_id
};