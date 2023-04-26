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

}

/* function createUserModel(id, email, name, password){
    return new userModel(id, email, name, password);
} */

export function createUserModel(id, email, name, password){
    return new userModel(id, email, name, password);
}