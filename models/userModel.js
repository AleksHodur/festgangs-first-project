class userModel {
    constructor(){}

    constructor(id, email, name, password){
        this.id = id;
        this.email = email;
        this.name = name;
        this.password = password;
    }

    saludo() {
        return 'Hola, ' + this.name;
    }

    static getById(id, ){

    }
}

/* function createUserModel(id, email, name, password){
    return new userModel(id, email, name, password);
}

module.exports = createUserModel; */

module.exports = (id, email, name, password) => new userModel(id, email, name, password);