const db = require("../../db-config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const redis = require("redis");

// redis client
const redisClient = redis.createClient();

// get all users
const getUsers = () => {
  return db("users");
};

// get user by id
const getUserById = (id) => {
  return db("users").where("id", "=", id);
};

// sign up
const signUp = async (creds) => {
  try {
    //destructuring
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
    throw err;
  }
};

// sign in
const signIn = async (creds) => {
  try {
    const { email, password } = creds;
    // compare the hash of the submitted password, with the hash stored in the database
    const response = db
      .select("email", "hash")
      .from("register")
      .where("email", "=", email)
      .then((data) => {
        const isValid = bcrypt.compareSync(password, data[0].hash);
        // if the hashes match, return the user
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
          // if the hashes don't match, respond with this error message
          return { message: "wrong credentials" };
        }
      });
    return response;
  } catch (error) {
    throw err;
  }
};

// function to store the toekn in redis database
const setToken = (key, value) => {
  return Promise.resolve(redisClient.set(key, value));
};

// retrieve token from redis database
const getRedisSessionData = (redisClient, authorization) => {
  return new Promise((resolve, reject) => {
    redisClient.get(authorization, (err, reply) => {
      if (err) reject(err);

      resolve({ id: reply });
    });
  });
};

const signToken = (email) => {
  const jwtPayload = { email };
  return jwt.sign(jwtPayload, process.env.JWT_SECRET);
};

const createUserSession = (user) => {
  const { email, id } = user;
  const token = signToken(email);
  return setToken(token, id)
    .then(() => {
      return { success: true, id, token };
    })
    .catch((err) => console.log("error" + err));
};

const signInAuthentication = (credentials, authorization) => {
  return authorization
    ? getRedisSessionData(redisClient, authorization)
    : signIn(credentials)
        .then((data) =>
          data.email && data.id ? createUserSession(data) : Promise.reject(data)
        )
        .then((session) => {
          return session;
        })
        .catch((err) => console.log(err));
};

module.exports = {
  signIn,
  signUp,
  signInAuthentication,
  getUserById,
  getUsers,
};
