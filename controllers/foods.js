const express = require("express");
const router = express.Router();

const User = require("../models/user.js");

// ----------- Endpoints------------
router.get("/", async function (req, res) {

    if (req.session.user) {
        try {
            const currentUser = await User.findById(req.session.user._id);

            res.render("foods/index.ejs", { foods: currentUser.pantry });
        } catch (error) {
            console.log(error);
            res.redirect("/");
        }
    } else {
        res.redirect("/");
    }
});

router.get("/new", function (req, res) {
    res.render("foods/new.ejs");
});

router.post("/", async function (req, res) {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.pantry.push(req.body);

        await currentUser.save();
        // console.log(currentUser);

        res.redirect(`/users/${currentUser._id}/foods`);
    } catch (error) {
        console.log(error);
        res.render("foods/new.ejs", { errorMessage: "Please try again later" });
    }
});

// ----------------------------------

module.exports = router;