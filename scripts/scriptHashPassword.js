const bcrypt = require('bcryptjs');

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

async function main() {
  const hashedPassword = await hashPassword('test');
  console.log('Hashed password:', hashedPassword);
}

main();
