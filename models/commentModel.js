class commentModel {

    constructor(id, user_id, group_id, created_at){
        this.id = id;
        this.user_id = user_id;
        this.group_id = group_id;
        this.created_at = created_at;
    }
}

module.exports = (id, user_id, group_id, created_at) =>
    new commentModel(id, user_id, group_id, created_at);