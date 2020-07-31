const { APP_SECRET, getUserId } = require('../utils');

function users(parent, args, context) {
  return context.prisma.user.findMany();
}

function user(parent, args, context) {
  const userId = getUserId(context);

  return context.prisma.user.findOne({ where: { id: userId } });
}

module.exports = {
  users,
  user,
};
