import bcrypt from "bcrypt";

const saltRounds = 10;

export function hashPassword(
  plainPassword: string
) {
  return bcrypt.hashSync(plainPassword, saltRounds);
};

export function compareWithHash(
  plainPassword: string, 
  hashedPassword: string
) {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};

