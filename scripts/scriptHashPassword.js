const bcrypt = require('bcryptjs');

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

async function main() {
  const hashedPassword = await hashPassword('h');
  console.log('Hashed password:', hashedPassword);

  const hashedPassword2 = await hashPassword('h2');
  console.log('Hashed password 2:', hashedPassword2);
}

main();
