import dotenv from 'dotenv';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { body } from 'express-validator';
import express, { NextFunction, Request, Response } from 'express'

import auth from './middleware/auth';
import validate from './middleware/validate'
import User, { IUserCreate, IUser } from './user.model';

// auth is middleware which validates the token and passon the information of user by decrypting token


dotenv.config();
var router = express.Router();


// to send information about user
router.get('/', auth, function (req: Request, res: Response, next: NextFunction) {
  return res.status(201).json({ user: res.user });
});

router.post('/', auth, function (req: Request, res: Response, next: NextFunction) {
  res.send({ title: 'This is for todo' });
});

router.post('/register',
  body('email').exists().isEmail().isLength({ max: 50, min: 3 }).toLowerCase().trim(),
  body('name').exists().isString().isLength({ max: 50, min: 3 }).toLowerCase().trim(),
  body('password').exists().isString().isLength({ max: 20, min: 5 }).trim(),
  body('address').exists().isString().isLength({ max: 200, min: 5 }).trim(),
  body('user_type').exists().isIn(['manufacturer', 'transporter']),
  validate,
  async function (req: Request, res: Response, next: NextFunction) {
    try {

      const { email, name, password, dob }: IUserCreate = req.body;

      const checkEmail = await User.findOne({ email });

      if (checkEmail) return res.status(409).json({ msg: 'User already exists!' });

      // this will do the hashing and encrupt the password before storing it in the database
      //@ts-ignore
      const encryptedPassword = await bcrypt.hash(password, 15)
      console.log(password, encryptedPassword)
      const newUser: IUser = await User.create({
        email,
        name,
        password: encryptedPassword,
        dob
      })

      // in token mongodb object _id will be stored. After 2h token will expire 
      const token = jwt.sign({ _id: newUser._id.toString(), email }, process.env.TOKEN_KEY || 'zhingalala', { expiresIn: '2h' })

      // Set-Cookie header
      // add an access_token cookie in the frontend will get validated to autherize some url
      res.cookie("access_token", token)

      return res.status(201).json({ token, user: newUser })

    } catch (err) {
      return res.status(500).json({ msg: 'Some internal error occured', err })
    }
  }
);

router.post('/login',
  body('email').exists().isEmail().isLength({ max: 50, min: 3 }).toLowerCase().trim(),
  body('password').exists().isString().isLength({ max: 20, min: 5 }).trim(),
  validate,
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password }: { email: string, password: string } = req.body;

      const checkUser = await User.findOne({ email });

      if (!checkUser) return res.status(404).json({ msg: 'User doesn`t exists!' });

      // if user use another method to login like google/github insted of password
      if (!checkUser.password) return res.status(405).json({ msg: 'Try another method' });

      if (!(await bcrypt.compare(password, checkUser.password))) return res.status(406).json({ msg: 'Wrong password!' });

      const token = jwt.sign({ _id: checkUser._id.toString(), email }, process.env.TOKEN_KEY || 'zhingalala', { expiresIn: '2h' })

      // Set-Cookie header
      // add an access_token cookie in the frontend will get validated to autherize some url
      res.cookie("access_token", token)

      return res.status(201).json({ token, user: checkUser })
    } catch (err) {
      return res.status(500).json({ msg: 'Some internal error occured', err })
    }
  }
);


router.get('/logout', async function (req: Request, res: Response, next: NextFunction) {
  try {

    res.cookie("access_token", null) // will set cookie to null

    return res.status(201).json({ msg: 'Sucessfull!' })

  } catch (err) {
    return res.status(500).json({ msg: 'Some internal error occured', err })
  }
})


export default router