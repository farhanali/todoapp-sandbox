exports.authenticate = function(req) {
    state.users = state.users || [];

    var authHeader = req.get("Authorization");

    if (!authHeader) {
        return null;
    }

    var accessToken = authHeader.split(" ")[1];

    var authUser = _.find(state.users, { 'accessToken': accessToken });

    return authUser;
};
