module.exports.requireLogin = (req, res, next) => {
	if (!req.user)
   	res.redirect('/login');
	else
		next();
}
