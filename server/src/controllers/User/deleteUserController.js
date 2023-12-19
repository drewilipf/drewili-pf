const { User } = require('../../db');

const userSoftDeleteController = async (id) => {   
    
    const user = await User.findByPk(id);

    user.deleted = true;
    
    await user.save();

    return user;

};

module.exports = userSoftDeleteController;



