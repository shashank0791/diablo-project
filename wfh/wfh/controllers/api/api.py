from wfh.controllers.api import team
from wfh.controllers.api import user
from wfh.controllers.api import explanation
from wfh.controllers.api import v1
from wfh.controllers.api import login

class ApiController(object):
    version = v1.VersionController()
    users = user.UserController()
    teams = team.TeamController()
    wfh = explanation.WfhController()
    login = login.LoginController()
