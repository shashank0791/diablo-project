import datetime
import uuid

import bcrypt
import pecan
from pecan import abort, rest, response
from sqlalchemy import exc, update

from wfh.auth import user_authenticated
from wfh.model import models

class UserController(rest.RestController):
    @pecan.expose('json')
    def get_one(self, *args, **kwargs):
        user = models.User.get_user(args[0])
        response.status = 200
        return user.as_dict() if user else abort(404)

    @pecan.expose('json')
    def get_all(self):
        response.status = 200
        users = models.session.query(models.User).all()
        return [user.as_dict() for user in users]

    @pecan.expose()
    def post(self, *args, **kwargs):
        if args:
            abort(404)

        name = kwargs.get('name')
        username = kwargs.get('username')
        password = kwargs.get('password')
        email = kwargs.get('email')
        team_id = kwargs.get('team_id')
        photo_id = kwargs.get('photo_id')

        user = models.User(name=name, username=username, email=email,
                           team_id=team_id)
        user.hash_password(password)

        models.session.add(user)

        try:
            models.session.commit()
        except (exc.IntegrityError, exc.InvalidRequestError):
            # Duplicated Entry (the same username)
            response.status = 409
        else:
            # Created new record
            response.status = 201

        return
