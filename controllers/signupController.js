const userDAO = require('../dao/userDAO');

const signup_index = (request, response) => {response.render('signup', {title: 'Signup'})};

const signup_new_user = async (request, response) => {

    const {name, email, password} = request.body;

    try{
        const user = await userDAO.createUser(name, email, password);
        if(user){
            request.session.user = user;
            response.redirect('/');
        }else{
            response.status(200).json({found: false, message: 'No se ha podido crear el usuario. Inténtalo más tarde'});
        }

    }catch(error){
        console.error(error);
        response.status(200).json({found: false, message: 'No se ha podido crear el usuario. Inténtalo más tarde'});
    }
};

module.exports = {
    signup_index,
    signup_new_user
};