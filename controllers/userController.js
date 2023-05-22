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

    const id = request.params.id;
}

const user_update = async (request, response) => {

    console.log('en el controlador de user update');
    const id = request.params.id;
    const {bio, artists, genres} = request.body;

    try{
        const user = await userDAO.getById(id);

        if(user){
            user.bio = bio;
            user.artists = artists;
            user.genres = genres;

            request.session.user.bio = bio;
            request.session.user.artists = artists;
            request.session.user.genres = genres;

            console.log('el user en el controller con cambios para update');
            console.log(user);
            const success = await userDAO.update(user);

            if(success){
                response.status(201).json({message: 'Perfil actualizado con éxito. Actualizando página...', success: true});
            }else{
                response.status(500).json({message: 'No se ha podido actualizar el perfil', success: false});
            }
        }else{
            response.status(500).json({message: 'No se ha encontrado el usuario solicitado', success: false});
        }

    }catch(error){
        console.log(error);
        response.status(500).json({error: 'Internal server error'});
    }
}

module.exports = {user_get_in_session, user_show_profile, user_by_id, user_update};