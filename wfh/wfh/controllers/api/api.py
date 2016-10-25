from wfh.controllers.api import user
from wfh.controllers.api import v1


class ApiController(object):
    version = v1.VersionController()
    users = user.UserController()
