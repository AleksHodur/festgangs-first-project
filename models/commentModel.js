class commentModel {

    constructor(id, user_id, group_id, created_at, content){
        this.id = id;
        this.user_id = user_id;
        this.group_id = group_id;
        this.created_at = created_at;
        this.content = content;
    }
}

module.exports = (id, user_id, group_id, created_at, content) =>
    new commentModel(id, user_id, group_id, created_at, content);