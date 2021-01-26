const db = require("../../db-config");
const bcrypt = require("bcrypt");

// sign up
const signUp = async (creds) => {
  try {
    const { username, email, password } = creds;

    // use bcrypt to hash the password
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    // add user to database
    const response = await db.transaction((trx) => {
      trx
        .insert({
          hash,
          email,
        })
        .into("register")
        .returning("email")
        .then((loginEmail) => {
          return trx("users")
            .returning("*")
            .insert({
              email: loginEmail[0],
              username,
              joined: new Date(),
            })
            .then((user) => {
              return user[0];
            });
        })
        .then(trx.commit)
        .catch(trx.rollback);
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

// sign in
const signIn = async (creds) => {
  try {
    const { email, password } = creds;

    const response = db
      .select("email", "hash")
      .from("register")
      .where("email", "=", email)
      .then((data) => {
        const isValid = bcrypt.compareSync(password, data[0].hash);

        if (isValid) {
          return db
            .select("*")
            .from("users")
            .where("email", "=", email)
            .then((user) => {
              return user[0];
            })
            .catch((err) => {
              throw err;
            });
        } else {
          return { message: "wrong credentials" };
        }
      });
    return response;
  } catch (error) {
    throw err;
  }
};

module.exports = { signIn, signUp };
