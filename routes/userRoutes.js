const express = require('express');
const router = express.Router();

const { signUp } = require('../controllers/user/signUp')
const { signIn } = require('../controllers/user/signIn.js')
const { auth } = require('../middlewares/auth.js');
// const {updateUser, fetchAllUserInfo, deleteUser} = require('../controllers/User/userController')

router.post('/sign-up', signUp)
router.post('/sign-in', signIn)
// router.put('/update-user',auth,isUser,updateUser);
// router.delete('/delete-user/:id',auth,isAdmin,deleteUser);

router.post('/auth', auth , (req, res) => {

    return res.status(200).json({
        succes: true,
        msg: "verified user !!"
    }
    )
});

module.exports = router;