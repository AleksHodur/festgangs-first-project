const userDAO = require('../dao/userDAO');

const signup_index = (request, response) => {response.render('signup', {title: 'Signup'})};

module.exports = {
    signup_index
};