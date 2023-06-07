const commentDAO = require('../dao/commentDAO');

const comment_get_by_group = async (request, response) => {

    const group_id = request.params.group;

    try{
        const comments = await commentDAO.getByGroup(group_id);

        response.status(200).json({comments});

    }catch(error){
        console.log(error);
        response.status(500).json({message: 'Algo ha salido mal :('});
    }
}

const comment_post_new = async (request, response) => {

    let commentData = request.body;
    const user = request.session.user;

    commentData.user_id = user.id;

    try{
        const comment = await commentDAO.createComment(commentData);

        if(comment){
            response.status(200).json({success: true});
        }else{
            response.status(500).json({success: false});
        }

    }catch(error){
        console.error(error);
        response.status(500).json({success: false});
    }
}

module.exports = {
    comment_get_by_group,
    comment_post_new
}