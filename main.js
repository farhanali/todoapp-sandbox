

var base64 = require("./util/base64.js").getInstance();
var auth = require("./util/auth.js");
var login = require("./routes/login.js")
var tasks = require("./routes/tasks.js")

/* Route definition styles:
 *
 *  define(path, method, function)
 *  soap(path, soapAction, function)
 *
 */
Sandbox.define("/login", "POST", login.postLogin);
Sandbox.define("/tasks", "POST", tasks.createTask);
Sandbox.define("/tasks", "GET", tasks.readTasks);
Sandbox.define("/tasks", "DELETE", tasks.clearTasks);
Sandbox.define("/tasks/{id}", "PUT", tasks.updateTask);
Sandbox.define("/tasks/{id}", "GET", tasks.getTask);
Sandbox.define("/tasks/{id}", "DELETE", tasks.deleteTask);
