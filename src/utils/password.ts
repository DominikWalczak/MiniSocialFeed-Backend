import bcrypt from 'bcrypt';
// porównanie zahashowanego hasła z podanym przez użytkownika
const comparePassword = (plain: string, hash: string) => bcrypt.compare(plain, hash);
// hashowanie hasła do bazy danych
const hashPassword = (plain: string) => bcrypt.hash(plain, Number(process.env.BCRYPT_SALT_ROUNDS));

export {comparePassword, hashPassword};