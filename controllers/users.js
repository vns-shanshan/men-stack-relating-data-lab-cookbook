const express = require("express");
const router = express.Router();

const User = require("../models/user");

router.get("/", async function (req, res) {
    try {
        const allUsers = await User.find({});

        res.render("users/index.ejs", { users: allUsers })
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
});

router.get("/:userId", async function (req, res) {
    try {
        const currentUser = await User.findOne({ _id: req.params.userId });
        const pantryInCurrentUser = currentUser.pantry;
        res.render("users/show.ejs", { foods: pantryInCurrentUser });
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
});

module.exports = router;