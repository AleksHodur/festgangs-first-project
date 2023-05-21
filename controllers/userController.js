const userDAO = require('../dao/userDAO');

const user_get_in_session = (request, response) => {
    console.log('Hola desde in session');
    const user = request.session.user;
    console.log(user);
    response.status(200).json(user);
}

const user_show_profile = (request, response) => {
    response.render('profile', {title: 'Perfil'});
}

const user_by_id = async (request, response) => {

    const id = request.body;

    try{
        const user = await userDAO.getById(id);

    }catch(error){
        console.log(error);
        response.status(500).json({error: 'Internal server error'});
    }
}

const user_update = async (request, response) => {

    const id = request.body;
}

module.exports = {user_get_in_session, user_show_profile, user_by_id, user_update};