
/*
 * POST /tasks
 *
 * To create a task.
 */
exports.createTask = function(req, res) {
    res.set('Content-Type', 'application/json');

    var user = auth.authenticate(req);
    if (!user || user.id != req.body.userId) {
        res.status(401);
        return res.render('401');
    }

    state.tasks = state.tasks || [];

    task = req.body;
    lastIndex = state.tasks.length - 1;
    task.id = (lastIndex < 0) ? 1 : state.tasks[lastIndex].id + 1;
    state.tasks.push(task);

    res.status(201);
    res.json(req.body);
};

/*
 * GET /tasks
 *
 * To read all tasks, if query parameter "active=true/false",
 * then return appropriate tasks.
 */
exports.readTasks = function(req, res){
    res.set('Content-Type', 'application/json');

    var user = auth.authenticate(req);
    if (!user) {
        res.status(401);
        return res.render('401');
    }

    state.tasks = state.tasks || [];

    var userTasks = _.filter(state.tasks, { "userId": user.id });

    var status = req.query.active;
    if (status) {
        userTasks = _.filter(userTasks, { "isActive": Boolean(status) });
    }

    res.status(200);
    res.json(userTasks);
};

/*
 * DELETE /tasks
 *
 * To clear all tasks.
 */
exports.clearTasks = function(req, res) {
    res.set('Content-Type', 'application/json');

    var user = auth.authenticate(req);
    if (!user) {
        res.status(401);
        return res.render('401');
    }

    state.tasks = state.tasks || [];
    _.remove(state.tasks, { 'userId': user.id });

    // set response body and send
    res.status(200);
    res.render('200');
};

/*
 * PUT /tasks/{id}
 *
 * To update a particular task.
 */
exports.updateTask = function(req, res) {
    res.set('Content-Type', 'application/json');
    state.tasks = state.tasks || [];

    var user = auth.authenticate(req);
    var task = _.find(state.tasks, { 'id': Number(req.params.id) });

    if (!task) {
        res.status(404);
        return res.render('404');
    }

    if (!user || user.id != task.userId) {
        res.status(401);
        return res.render('401');
    }

    task.name = req.body.name;
    task.isActive = req.body.isActive;

    state.tasks = _.reject(state.tasks, { 'id': task.id })
    state.tasks.push(task)

    res.status(200);
    res.json(task);
};

/*
 * GET /tasks/{id}
 *
 * To read a particular task.
 */
exports.getTask = function(req, res){
    res.set('Content-Type', 'application/json');
    state.tasks = state.tasks || [];

    var user = auth.authenticate(req);
    var task = _.find(state.tasks, { 'id': Number(req.params.id) });

    if (!task) {
        res.status(404);
        return res.render('404');
    }

    if (!user || user.id != task.userId) {
        res.status(401);
        return res.render('401');
    }

    res.status(200);
    res.json(task);
};

/*
 * DELETE /tasks/{id}
 *
 * T delete a particular task.
 */
exports.deleteTask = function(req, res) {
    res.set('Content-Type', 'application/json');
    state.tasks = state.tasks || [];

    var user = auth.authenticate(req);
    var task = _.find(state.tasks, { 'id': Number(req.params.id)});

    if (!task) {
        res.status(404);
        return res.render('404');
    }

    if (!user || user.id != task.userId) {
        res.status(401);
        return res.render('401');
    }

    state.tasks = state.tasks || [];
    state.tasks = _.reject(state.tasks, { 'id': task.id })

    res.status(200);
    res.render('200');
};

