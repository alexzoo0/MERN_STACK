import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModal from '../models/newAccount.js'


const secret = 'test';


export const RegisterNow = async (req, res) => {
    const { email, password, confirmPwd, firstName, lastName } = req.body;


    try{
       const account = await UserModal.findOne({ email })

       if(account) return res.status(400).json({ message: 'user already exists.'})

       if(password !== confirmPwd) return res.status(400).json({ message: 'passwords do not match.'})

       const hashedPassword = await bcrypt.hash(confirmPwd, 12 );

       const result = await UserModal.create(({ email, password: hashedPassword, name: `${firstName} ${lastName}` }))
       
       const token = jwt.sign({user: result.email, id: result._id}, secret, {expiresIn: '1h'})

       res.status(201).json({ result, token })

    }catch(error) {
        res.status(500).json({ message: 'something went wrong' });
    }
}

export const signin = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const oldUser = await UserModal.findOne({ email });
  
      if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });
  
      const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
  
      if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
  
      const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });
  
      res.status(200).json({ result: oldUser, token });
  
    } catch (err) {
      res.status(500).json({ message: "Something went wrong" });
    }
  };
