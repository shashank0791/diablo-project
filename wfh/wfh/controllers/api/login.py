import datetime
import uuid

import pecan
from pecan import abort
from pecan import response
from pecan import rest

from wfh import auth
from wfh.model import models


class LoginController(rest.RestController):
    @pecan.expose('json')
    def post(self, *args, **kwargs):
        username = kwargs.get('username')
        password = kwargs.get('password')

        user = models.User.get_user(username)
        if not user:
            abort(404)

        if not user.verify_password(password):
            abort(403)

        auth_key = self.authorize(user)

        response.status = 200
        return {'auth_key': auth_key}

    def authorize(self, user):
        if user.authentication:
            return user.authentication.auth_key

        auth_key = uuid.uuid4()
        authorized = models.Authentication(
            user_id=user.id,
            datetime=datetime.datetime.now(),
            auth_key=auth_key)
        models.session.add(authorized)
        models.session.commit()
        return str(auth_key)
