const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils');
 
//Mutation to validate, and add a user to the prisma database
async function signup(parent, args, context, info) {
  // BASIC FIELD VALIDATION

  const userExists = await context.prisma.user.findOne({
    where: { email: args.email },
  });

  if (userExists) {
    throw new Error('This email is already connected to an account');
  }

  //Basic Email validation
  if (!/(.+)@(.+){2,}\.(.+){2,}/.test(args.email)) {
    throw new Error('Invalid email address');
  }

  //Null checking
  else if (!args.password || !args.email || !args.name || !args.userName) {
    throw new Error('All fields need to be filled');
  }
  // After null checking, check length
  else if (args.password.length < 8) {
    throw new Error('The password provided is not long enough.');
  }
  // Check for capital letters
  else if (!/([A-Z]+)/g.test(args.password)) {
    throw new Error("You don't have any capital letters in there yo");
  }

  //Basic password hashing
  const password = await bcrypt.hash(args.password, 10);

  const user = await context.prisma.user.create({
    data: { ...args, password },
  });
}

//Mutation to validate user and grant access
async function login(parent, args, context, info) {
  const user = await context.prisma.user.findOne({
    where: { email: args.email },
  });

  if (!user) {
    throw new Error('No such user found');
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error('Invalid password');
  }

  //Create Auth token to further authenticate user actions if needed
  const token = jwt.sign(
    {
      userId: user.id,
    },
    APP_SECRET
  );

  return {
    token,
    user,
  };
}

module.exports = {
  signup,
  login,
};
