const groupDAO = require('../dao/groupDAO');
const eventDAO =require('../dao/eventDAO');

const group_new = async (request, response) => {

    const {event_id, leader, max_users} = request.body;

    try{
        let group = await groupDAO.getByEventAndLeader(event_id, leader);

        if(group == null){

            try{
                group = await groupDAO.newGroup(event_id, leader, max_users);

                if(group){
                    response.status(201).json({message: 'Grupo creado con éxito', success: true});
                }else{
                    response.status(200).json({message: 'No se ha podido crear el grupo :(', success: false});
                }

            }catch(error){
                console.error(error);
                response.status(200).json({message: 'No se ha podido crear el grupo :(', success: false});
            }

        }else{
            response.status(200).json({message: 'Ya existe un grupo con este lead para este evento', success: false});
        }
    }catch(error){
        console.error(error);
        response.status(200).json({message: 'No se ha podido crear el grupo :(', success: false});

    }
}

const group_new_form = async (request, response) => {

    let evento = await eventDAO.getById(request.params.id);
    console.log('evento desde new form controller');
    console.log(evento);

    if(evento){
        response.render('group/groupForm', {title: 'Crear grupo', evento: evento});
    }else{
        response.render('error/500', {title: 'Error 500'});
    }
}

const groups_by_event = async (request, response) => {

    let groups = await groupDAO.getByEvent(request.params.id);

    if(groups != null){
        response.status(200).json(groups);
    }else{
        response.status(500).json({message: 'No hay grupos'});
    }
}

const group_show_my = (request, response) => {
    response.status(200).render('group/myGroups', {title: 'Mis grupos'});
}

const group_by_id = (request, response) => {
    response.status(200).render('group/groupPage', {title: 'Grupo de Ana29'});
}

module.exports = {
    group_new,
    group_new_form,
    groups_by_event,
    group_show_my,
    group_by_id
};