
// const bcrypt = require('bcrypt');
// // hash password before saving it to the database
// const hashPassword = async (password) => {
//   try {
//     const saltRounds = 10;
//   const hash = await bcrypt.hash(password, saltRounds);
//   return hash;

//   } catch (error) {
//     console.error('Error in hash password:', error);
//     return res.status(500).json({ message: 'Server error' });
//   }
// };

// // compare password 
// const comparePassword = async (inputPassword, hashedPassword) => {
//     try {
//         const match = await bcrypt.compare(inputPassword, hashedPassword);
//         return match;
  
//     } catch (error) {
//       console.error('Error in compare hash password:', error);
//       return res.status(500).json({ message: 'Server error' });
//     }
//   };

const argon2 = require('argon2');
const hashPassword = async (password) => {
  try {
    return await argon2.hash(password);

  } catch (error) {
    console.error('Error in hash password:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// compare password 
const comparePassword = async (inputPassword, hashedPassword) => {
    try {
        return await argon2.verify(hashedPassword, inputPassword);
  
    } catch (error) {
      console.error('Error in compare hash password:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  };

module.exports = {
    hashPassword,
    comparePassword
};
