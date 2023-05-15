const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userSchema = require("../schemas/userSchema");
const protected = require("../middleware/protected");

//register
router.post("/api/register", async (req, res) => {
  try {
    var emailExists = await userSchema.findOne({ email: req.body.email });
    if (emailExists) {
      return res.status(400).json({ error: "Email already exists" });
    }
    var FirstNameExists = await userSchema.findOne({
      firstname: req.body.firstname,
    });
    if (FirstNameExists) {
      return res.status(400).json({ error: "FirstName already exists" });
    }
    var LastNameExists = await userSchema.findOne({
      lastname: req.body.lastname,
    });
    if (LastNameExists) {
      return res.status(400).json({ error: "LastName already exists" });
    }

    var hash = await bcrypt.hash(req.body.password, 10);

    const user = await new userSchema({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      mobile: req.body.mobile,
      role: req.body.role || "customer",
      password: hash,
      address1: req.body.address1,
      address2: req.body.address2,
      photoUrl: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
      status: req.body.status,
    });

    const data = await user.save();
    res.send(data);
  } catch (error) {
    if (error) {
      res.status(400).json({ er: error });
    }
  }
});

//login
router.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "please add email or password" });
  }
  userSchema.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "Email not exists" });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          // res.json({message:"successfully signed in"})
          const token = jwt.sign(
            { _id: savedUser._id, email: savedUser.email },
            process.env.JWT_SECRET
          );
          const { _id, email, role, status } = savedUser;
          res.json({ token, user: { _id, email, role, status } });
        } else {
          return res.status(422).json({ error: "Password not exists" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

//protected route
router.get("/api/protected", protected, (req, res) => {
  res.send("hello user" + req.user.email);
});

//all users
router.get("/api/allusers", protected, async (req, res) => {
  await userSchema
    .find()
    .then((allusers) => {
      res.json(allusers);
    })
    .catch((err) => {
      console.log(err);
    });
});

//user by id
router.get("/api/myuser", protected, (req, res) => {
  userSchema
    .findById(req.user._id)
    .then((myprofile) => {
      res.json(myprofile);
    })
    .catch((err) => {
      console.log(err);
    });
});

//user updated
router.put("/api/edituser/:id", protected, async (req, res) => {
  var update = await userSchema.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.json(update);
});

//user delete
router.delete("/api/deluser/:id", protected, async (req, res) => {
  const deleteProfile = await userSchema.findOneAndDelete(
    { _id: req.params.id },
    { $pull: req.body }
  );
  res.status(200).json(deleteProfile);
});

module.exports = router;
