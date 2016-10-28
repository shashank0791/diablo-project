from pecan import secure

from wfh.controllers.api import team
from wfh.controllers.api import user
from wfh.controllers.api import explanation
from wfh.controllers.api import v1
from wfh.controllers.api import login


class ApiController(object):
    login = login.LoginController()

    teams = team.TeamController()
    users = user.UserController()
    wfh = explanation.WfhController()
    version = v1.VersionController()
