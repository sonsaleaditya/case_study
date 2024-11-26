const userShema = require('../../models/user.model');
const bcrypt = require('bcrypt')

const signUp = async (req, res) => {
    try {
        //validation
        const { name, email, password , confirmPassword } = req.body;

        if (!name || !email || !password || !confirmPassword) {
            return res.status(401).json({
                success: false,
                msg: "All Fields Are Required!!"
            })
        }
        
        if(password !== confirmPassword){
            
            return res.status(401).json({
                success: false,
                msg: "password does not matches with confirm password!!"
            })
        }

        if(password.length < 8){
            return res.status(409).json({
                success: false,
                msg: "password must be at least 8 characters!!"
            })
        }

        //check whether user exist with this mail or not
        const user = await userShema.findOne({ email: email });
        if (user) {
            return res.status(409).json({
                success: false,
                msg: "User Already Exist!!"
            })
        }

        const hashedPass = await bcrypt.hash(password, 10);
       
        const registeredUser = await userShema.create({ name, email, password: hashedPass });


       return res.status(200).json({
            success: true,
            msg: "User Registered Succefully!!",
            user : registeredUser
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: "Error Occured While Signing Up!!"
        })
    }
}



module.exports = { signUp }