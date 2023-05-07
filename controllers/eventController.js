const eventDAO = require('../dao/eventDAO');

const event_get_all = async (request, response) => {
    const events = await eventDAO.getAllEvents();
    response.status(200).json(events);
}

module.exports = {event_get_all};