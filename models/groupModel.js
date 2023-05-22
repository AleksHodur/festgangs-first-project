class groupModel{

    constructor(id, event_id, leader){
        this.id = id;
        this.event_id = event_id;
        this.leader = leader;
    }
}

module.exports = (id, event_id, leader) => new groupModel(id, event_id, leader);