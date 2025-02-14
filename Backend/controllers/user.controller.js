import { User } from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

export const Register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    if (!name || !username || !email || !password) {
      return res.status(401).json({
        message: 'All fields are requireds',
        success: false,
      });
    }

    const user = await User.findOne({email});
    if (user) {
      return res.status(401).json({
        message: 'User already exist.',
        success: false,
      });
    }

    const hashPassword = await bcryptjs.hash(password, 10);
    await User.create({
      name,
      username,
      email,
      password: hashPassword,
    });

    return res.status(200).json({
      message: 'Account Created Successfully.',
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Failed register',
      success: false,
    });
  }
};

// export const Login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(400).json({
//         message: 'Somthing is missing',
//         success: false,
//       });
//     }
//     const user = User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({
//         message: 'Incorrect Email.',
//         success: false,
//       });
//     }
//     const isPasswordMatch = await bcryptjs.compare(password, user.password);
//     if (!isPasswordMatch) {
//       return res.status(400).json({
//         message: 'Incorrect Password.',
//         success: false,
//       });
//     }
//     generate
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       message: 'Server Error',
//       success: false,
//     });
//   }
// };
