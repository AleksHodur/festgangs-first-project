const userDAO = require('../dao/userDAO');

const signup_index = (request, response) => {
    if(request.session.user){
        response.redirect('/');
    }else{
        let token = Math.floor(Math.random() * 9999) + 1000;
        request.session.token = token;

        response.render('signup', {title: 'Signup', token})
    }
};

const signup_new_user = async (request, response) => {

    const {username, email, password, token} = request.body;

    if(token == request.session.token){
        try{
            const user = await userDAO.createUser(username, email, password);
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
    }else{
        console.log('No coincide el token');
        response.status(200).json({found: false, message: 'No se ha podido crear el usuario. Inténtalo más tarde'});
    }
};

module.exports = {
    signup_index,
    signup_new_user
};