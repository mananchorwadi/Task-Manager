import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';


export const registerUser = async (req, res) => {
    try{
    const { name, email, password } = req.body;

    // Validate the input
    if (!name || !email || !password) {
        return res.status(400).json({ 
            message: 'Please provide all required fields' });
    }

    // Check if the user already exists 
    const userExists = await User.findOne({email})
    if(userExists){
        return res.sstarus(400).json({message: 'User already exists'});
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    // Create a new user
    const user = await User.create({
        name,
        email,
        password: hashedpassword
    })
    if(user){
        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400).json({message:'Invalid user data'})
    }
} catch(error){
    res.status(500).json({message: 'Server error', error: error.message})
}
}

export const loginUser = async (req, res)=>{
    try{
        const{email, password} = req.body;

        const user = await User.findOne({email});
        if(user && (await bcrypt.compare(password, user.password))){
            return res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            })  
        }
        res.status(401).json({message: 'Invalid email or password'})
    } catch(error){
        res.status(500).json({message: 'Server error', error: error.message})
    }
}
