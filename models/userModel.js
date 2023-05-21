class userModel {

    constructor(id, type, email, name, password, profilePhoto,
        bio, artists, genres){
        this.id = id;
        this.type = type;
        this.email = email;
        this.name = name;
        this.password = password;
        this.profilePhoto = profilePhoto;
        this.bio = bio;
        this.artists = artists;
        this.genres = genres;
    }

    saludo() {
        return 'Hola, ' + this.name;
    }

}

/* function createUserModel(id, email, name, password){
    return new userModel(id, email, name, password);
} */

module.exports = (id, type, email, name, password, profilePhoto,
    bio, artists, genres) => new userModel(id, type, email, name, password,
        profilePhoto, bio, artists, genres);