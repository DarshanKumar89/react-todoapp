import bcrypt from 'bcryptjs';
import User from '../../models/user';
import { generateToken } from '../../helper/token';

export const register = async (req, res) => {
    const { name, email, password } = req.body;
    // check wheather or not user already exsits or not
    const exist = await User.findOne({ email });
    if (exist) return res.status(302).json({ message: 'Email is already in use' });

    // create user in db and return the Object
    const user = new User({ name, email, password });
    await user.save();
    return res.status(200).json({ message: 'User registered!' });
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    // check wheather or not user is registered or not
    const exist = await User.findOne({ email });
    if (!exist) return res.status(400).json({ message: 'Please register first' });

    // check the for the password
    const passValid = await bcrypt.compare(password, exist.password);
    if (!passValid) return res.status(400).json({ message: 'Password is incorrect' });

    // create token and refresh token
    // eslint-disable-next-line no-underscore-dangle
    const token = generateToken(exist._id);
    return res.status(200).json({ message: 'Login successfull!', token });
};
