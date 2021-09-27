module.exports = (req, res, next) => {
    if (req.session.user && req.cookies.connect.sid) {
        res.redirect('index', {
            username: req.session.user.username
        });
    } else {
        next();
    }
};