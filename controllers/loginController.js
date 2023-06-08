const userDAO = require('../dao/userDAO');

const login_index = (request, response) => {
  if(request.session.user){
    response.redirect('/');
  }else{
    let token = Math.floor(Math.random() * 9999) + 1000;
    request.session.token = token;

    response.render('login', {title: 'Login', token});
  }
};

const login_close = (request, response) => {
    request.session.destroy();
    response.redirect('/login');
}

const login_check = async (request, response) => {
    
    const { email, password, token } = request.body;

    if(token == request.session.token){

      try{
        console.log(userDAO);
        const user = await userDAO.getUserByEmailAndPassword(email, password);

        if(user){
          console.log(user);
          request.session.user = user;
          response.status(200).json({found: true, message: 'Usuario correcto!'});
        }else{
          response.status(200).json({found: false, message: 'El usuario o la contraseña son incorrectos'});
        }

      }catch(error){
        console.error(error);
        response.status(500).json({error: 'Internal server error'});
      }

    }else{
      console.log('No coincide el token');
      response.status(500).json({error: 'Internal server error'});
    }
      
      
}

module.exports = {login_index, login_close, login_check}
