const users = [];

function cloneUser(user) {
  if (!user) return null;
  const copy = { ...user };
  delete copy.passwordHash;
  return copy;
}

function createUser(userInput) {
  const user = {
    ...userInput,
    _id: userInput._id || String(users.length + 1),
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: userInput.isActive !== false,
    permissions: userInput.permissions || []
  };

  users.push(user);
  return user;
}

function findUserByEmail(email) {
  return users.find((user) => user.email && user.email.toLowerCase() === email.toLowerCase()) || null;
}

function findUserById(id) {
  return users.find((user) => String(user._id) === String(id)) || null;
}

function getUsers() {
  return users;
}

module.exports = {
  users,
  createUser,
  findUserByEmail,
  findUserById,
  getUsers,
  cloneUser
};
