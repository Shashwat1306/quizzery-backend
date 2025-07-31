import {register as registerUser,login as loginUser} from '../services/user-service.js';
export const login = async (req, res) => {
  const userObject = req.body;
  try{
    const obj=await loginUser(userObject);
    res.status(200).json(obj);
  }
  catch(err) {
    res.status(500).json({error: 'Login failed'});
    console.log(err);
  }
}
export const register = async (req, res) => {
  console.log('Data received:', req.body);
  const userObject = req.body;
  try{
    const message=await registerUser(userObject);
    res.status(200).json({message: message});
  }
  catch(err) {
    res.status(500).json({error: 'Registration failed'});
    console.log('caught in controller-->',err); 
  }
}
export const profile = (req, res) => {
  // Logic to get user profile
  res.json({message:'Profile '});
}