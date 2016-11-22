/*
 * POST /login
 *
 * Login or register user.
 */
exports.postLogin = function(req, res) {
    res.set('Content-Type', 'application/json');
    res.set('Content-Type', 'application/json');

    // retrieve users or, if there are none, init to empty array
    state.users = state.users || [];

    var email = req.body.email;
    var password = req.body.password;

    // find user with email
    var user = _.find(state.users, {
        "email": email
    });

    // if user with email doesn't exist, create new one with email and password,
    // return response with user info
    if (!user) {
        user = req.body;

        lastIndex = state.users.length - 1;
        user.id = (lastIndex < 0) ? 1 : state.users[lastIndex].id + 1;
        user.accessToken = base64.encode(user.email + ':' + user.password);

        state.users.push(user);

        res.status(201);
        return res.json(user);
    }

    // if user with email exist, match with password
    var user = _.find(state.users, {
        "email": email,
        "password" : password
    });

    // if email & password doesn't match
    if (!user) {
        res.status(401);
        return res.render('401');
    }

    res.status(200);
    return res.json(user);
};
