const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const dotenv = require("dotenv");
const User = require("./public/scripts/models/User");
const isAuth = require("./public/scripts/middlewares/is-auth");
const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;

const store = new MongoDBStore({
  uri: "mongodb+srv://jabirtisou:ikwilinloggen@cluster0.kotgm.mongodb.net/footballmatch",
  collection: "sessions",
});
mongoose
  .connect(
    "mongodb+srv://jabirtisou:ikwilinloggen@cluster0.kotgm.mongodb.net/footballmatch",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// Middlewares
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(cors());
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  next();
});
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch((err) => {
      next(new Error(err));
    });
});

//Routes
app.get("/", home);
app.post("/login", login);
app.post("/user", addUser);
app.get("/findmatch", isAuth, findMatch);
app.post("/like/:userId", isAuth, likeUser);
app.post("/reset/:userId", isAuth, resetUser);
app.post("/dislike/:userId", isAuth, dislikeUser);
app.get("/likelist", isAuth, likeList);
app.get("/myprofile", isAuth, profile);
//Routes functions
function home(req, res) {
  User.find()
    .then((users) => {
      res.render("login", {
        title: "Pick a user",
        users,
      });
    })
    .catch((err) => console.log(err.message));
}
// login
function login(req, res, next) {
  const { user } = req.body;
  req.session.isLoggedIn = true;
  req.session.user = user;
  res.redirect("/findmatch");
}
// Wie is gebruiker functie
function addUser(req, res, next) {
  const { firstName, lastName, age, description } = req.body;
  const user = new User({
    firstName,
    lastName,
    age,
    description,
  });
  user
    .save()
    .then((user) => {
      res.status(200).json(user);
      // eslint-disable-next-line no-console
    })
    .catch((err) => console.log(err.message));
}
// Findmatch users
function findMatch(req, res, next) {
  console.log("Logged in user:", req.session.user);
  const userID = req.session.user;
  User.findById(userID)
    .then((loggedInUser) => {
      const userLikes = [
        ...loggedInUser.likes,
        ...loggedInUser.dislikes,
        userID,
      ];
      console.log("userLikes", userLikes);
      User.find({
        _id: {
          $nin: userLikes,
        },
      })
        .then((users) => {
          res.render("findmatch", {
            title: "find it",
            users,
          });
        })
        .catch((err) => err.message);
    })
    .catch((err) => console.log(err.message));
}

// Like functie
function likeUser(req, res) {
  const { likingID } = req.body;
  const lUser = req.session.user;
  User.findById(lUser)
    .then((likingUser) => {
      likingUser.likes.push(likingID);
      likingUser
        .save()
        .then((newLikingUser) => {
          const userId = req.params.userId;
          User.findById(userId)
            .then((likedUser) => {
              likedUser.likedBy.push(lUser);
              likedUser
                .save()
                .then((newLikedUser) => {
                  console.log("Liked User Updated!");
                  if (newLikedUser.likes.includes(lUser)) {
                    console.log("Match found!");
                    User.findByIdAndUpdate(
                      {
                        _id: userId,
                      },
                      {
                        $pullAll: {
                          pending: [userId],
                        },
                      },
                      {
                        useFindAndModify: false,
                      }
                    )
                      .then((updatedLikedUser) => {
                        newLikingUser.matches.push(userId);
                        newLikingUser.matches.push(lUser);
                        newLikingUser
                          .save()
                          .then((savedNewLikingUser) => {
                            updatedLikedUser
                              .save()
                              .then((newUpdatedLikedUser) => {
                                console.log("Update Made!");
                              });
                          })
                          .catch((err) => console.log(err));
                      })
                      .catch((err) => console.log(err));
                  } else {
                    console.log("pending...");
                    newLikingUser.pending.push(userId);
                    newLikingUser
                      .save()
                      .then(() => {
                        console.log("pending update made");
                        res.redirect("/findmatch");
                      })
                      .catch((err) => console.log(err));
                  }
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
          console.log("Liking User Updated!");
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

// Like verwijderen
function resetUser(req, res) {
  const userId = req.params.userId;
  const loggedInUserId = req.session.user;
  User.updateOne(
    {
      _id: loggedInUserId,
    },
    {
      $pullAll: {
        likes: [userId],
      },
    }
  )
    .then(() => {
      User.updateOne(
        {
          _id: loggedInUserId,
        },
        {
          $pullAll: {
            pending: [userId],
          },
        }
      )
        .then(() => {
          console.log("successfully reset");
          res.redirect("/findmatch");
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => {
      console.log(err);
    });
}

// dislike functie
function dislikeUser(req, res) {
  const { dislikingID } = req.body;
  let dislikes = [];
  dislikes.push(dislikingID);
  const dUser = req.session.user;
  User.findById(dUser)
    .then((dislikingUser) => {
      dislikingUser.dislikes.push(dislikes);
      dislikingUser
        .save()
        .then((newDislikingUser) => {
          let dislikedBy = [];
          dislikedBy.push(dUser);
          const userId = req.params.userId;
          User.findById(userId)
            .then((dislikedUser) => {
              dislikedUser.dislikedBy.push(dislikedBy);
              dislikedUser
                .save()
                .then((newDislikedUser) => {
                  res.redirect("/findmatch");
                })
                .catch((err) => console.log(err.message));
            })
            .catch((err) => console.log(err.message));
        })
        .catch((err) => console.log(err.message));
    })
    .catch((err) => console.log(err));
}

// Match en pending lijst
function likeList(req, res) {
  const userID = req.session.user;
  User.findById(userID)
    .then((user) => {
      const userMatches = [...user.matches];
      const usersPending = [...user.pending];
      console.log("userMatches", userMatches);
      User.find({
        _id: userMatches,
      })
        .then((matchedUsers) => {
          User.find({
            _id: usersPending,
          })
            .then((pendingUsers) => {
              res.render("likelist", {
                title: "My Like list",
                matchedUsers,
                pendingUsers,
              });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => err.message);
    })
    .catch((err) => console.log(err));
}

// My Profile
function profile(req, res) {
  const userID = req.session.user;
  User.findById(userID)
    .then((user) => {
      res.render("myprofile", {
        title: "My profile",
        user,
      });
    })
    .catch((err) => console.log(err));
}

app.use(function (_req, res, next) {
  res.status(404).send("Sorry can't find that.");
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
