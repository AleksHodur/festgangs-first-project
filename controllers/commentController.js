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

module.exports = {
    comment_get_by_group
}