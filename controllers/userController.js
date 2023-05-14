//const userDAO = require('../dao/userDAO');

const user_get_in_session = (request, response) => {
    console.log('Hola desde in session');
    const user = request.session.user;
    console.log(user);
    response.status(200).json(user);
}

const dosomething = (req, res) => {
    console.log('Hi, Im doing something');
    res.send('Response from /inSession route');
}

module.exports = {user_get_in_session, dosomething};