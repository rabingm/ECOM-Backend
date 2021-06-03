import bcrypt from "bcrypt";

const saltRound = 10;

export const hashPassword = (plainPassword) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(bcrypt.hashSync(plainPassword, saltRound));
    } catch (error) {
      reject(error);
    }
  });
};

export const comparePassword = (plainPassword, hashedPasswordFromDB) => {
  return new Promise((resolve, reject) => {
    try {
      bcrypt.compare(
        plainPassword,
        hashedPasswordFromDB,
        function (error, result) {
          if (error) resolve(error);
          resolve(result);
        }
      );
    } catch (error) {
      reject(error);
    }
  });
};
