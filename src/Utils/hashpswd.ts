import bcrypt from "bcrypt";

const saltRounds = 10;

export function passwordHash(
  plainPassword: string,
) {
  return bcrypt.hashSync(plainPassword, saltRounds);
}

export function passwordCompare(
  plainPassword: string,
  hashedPassword: string,
) {
  return bcrypt.compareSync(plainPassword, hashedPassword);
}
