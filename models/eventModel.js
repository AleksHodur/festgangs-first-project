class eventModel{

    constructor(id, title, location){
        this.id = id;
        this.title = title;
        this.location = location;
    }
}

module.exports = (id, title, location) => new eventModel(id, title, location);