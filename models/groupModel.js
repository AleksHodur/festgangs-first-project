class groupModel{

    constructor(id, event_id, leader, max_users){
        this.id = id;
        this.event_id = event_id;
        this.leader = leader;
        this.max_users = max_users;
    }
}

module.exports = (id, event_id, leader, max_users) =>
    new groupModel(id, event_id, leader, max_users);