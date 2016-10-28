from pecan.secure import SecureController, secure

from wfh.controllers.api import api
from wfh.auth import user_authenticated


class RootController(object):
    api = api.ApiController()
