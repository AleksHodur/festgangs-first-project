class eventModel{

    constructor(id, title, artist, city, country, location, date){
        this.id = id;
        this.title = title;
        this.artist = artist;
        this.city = city;
        this.country = country;
        this.location = location;
        this.date = date;
    }
}

module.exports = (id, title, artist, city, country, location, date) =>
    new eventModel(id, title, artist, city, country, location, date);