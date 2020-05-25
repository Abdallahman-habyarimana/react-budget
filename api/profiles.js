const express = require("express");
const request = require("request");
const config = require("config");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const Profile = require("../models/Profile");
const User = require("../models/User");

//@route GET api/profile/me
//@desc Get current users profile
//@access Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate("user", ["name"]);
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route POST api/profile
//@desc Create or update user profile
//@access Private

router.post(
  "/",
  [
    auth,
    [
      check("dob", "Date of Birth is required")
        .not()
        .isEmpty(),
      check("location", "Location is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array });
    }

    const { dob, location } = req.body;

    //Build profile Object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (dob) profileFields.dob = dob;
    if (location) profileFields.location = location;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        //update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      // Create
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route GET api/profile
//@desc Get all profiles
//@access Public

router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route GET budget/api/profile/user/:user_id
//@desc Get profiles by User Id
//@access Public

router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate("user", ["name"]);

    if (!profile) return res.status(400).json({ msg: "Profile not found" });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).send("Server Error");
  }
});

//@route DELETE /budget/api/profile
//@desc Delete profile, user & posts
//@access Private

router.delete("/", auth, async (req, res) => {
  try {
    // remove users posts
    await Post.deleteMany({ user: req.user.id });
    //Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    //Remove user
    await Profile.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route PUT api/profile/experience
//@desc Add profile experience
//@access Private

router.put(
  "/expence",
  [
    auth,
    [
      check("description", "Description is required")
        .not()
        .isEmpty(),
      check("money", "Amount is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { description, money, date, month } = req.body;

    const newExp = {
      description,
      money,
      date,
      month
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExp);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route DELETE api/profile/expense/:exp_id
//@desc Delet expence from profile
//@access Private

router.delete("/expence/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate("user", ["name"]);

    // Get remove index
    const removeIndex = profile.experience
      .map(item => item.id)
      .indexOf(req.params.exp_id);

    profile.experience.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route PUT api/profile/gain
//@desc Add profile gain
//@access Private

router.put(
  "/gain",
  [
    auth,
    [
      check("description", "Description is required")
        .not()
        .isEmpty(),
      check("money", "Amount is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newEdu);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route DELETE api/profile/gain/:gain_id
//@desc Delete Gain from profile
//@access Private

router.delete("/gain/:gain_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate("user", ["name"]);

    // Get remove index
    const removeIndex = profile.gain
      .map(item => item.id)
      .indexOf(req.params.gain_id);

    profile.education.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//Exports the route
module.exports = router;
