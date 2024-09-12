function passUserToView(req, res, next) {
    // if user signed in pass req.session.user to res.locals.user
    // Otherwise, set it to null
    res.locals.user = req.session.user ? req.session.user : null;
    next();
};

module.exports = passUserToView;