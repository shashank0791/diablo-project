import datetime
import uuid

import bcrypt
import pecan
from pecan import abort, rest, response, secure
from sqlalchemy import exc, update

from wfh.auth import user_authenticated
from wfh.model import models

class UserController(rest.RestController):
    _custom_actions = {
        'login': ['POST'],
    }

    def authorize(self, user):
        authorized = models.session.query(
            models.Authentication).filter_by(user_id=user.id).first()

        now = datetime.datetime.now()
        if authorized:
            models.session.query(
                models.Authentication).filter(
                id==authorized.id).update({'datetime': now})
            auth_key = authorized.auth_key

        else:
            auth_key = uuid.uuid4()
            authorized = models.Authentication(
                user_id=user.id, datetime=now, auth_key=auth_key)
            models.session.add(authorized)
            models.session.commit()
        return str(auth_key)

    def authorized(self, auth_key):
        authorized = models.session.query(
            models.Authentication).filter_by(auth_key=auth_key).first()

        return bool(authorized)

    def hash_password(self, password):
        return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    def verify_password(self, user, password):
        return (bcrypt.hashpw(password.encode('utf-8'), user.password) ==
                user.password)

    def get_user(self, username):
        return models.session.query(models.User).filter_by(
                username=username).first()

    @pecan.expose('json')
    def login(self, *args, **kwargs):
        username = kwargs.get('username')
        password = kwargs.get('password')

        user = self.get_user(username)
        if not user:
            abort(404)

        if not self.verify_password(user, password):
            abort(403)

        auth_key = self.authorize(user)

        response.status = 200
        return {'auth_key': auth_key}

    @pecan.expose('json')
    def get_one(self, *args, **kwargs):
        user = self.get_user(args[0])
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

        name = kwargs['name']
        username = kwargs['username']
        password = kwargs['password']
        email = kwargs['email']
        team_id = kwargs.get('team_id')
        photo_id = kwargs.get('photo_id')

        user = models.User(name=name, username=username, email=email,
                           password=self.hash_password(password),
                           team_id=team_id)
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

    @pecan.expose()
    def put(self, *args, **kwargs):
        # NOTE: Currently not supported
        abort(404)

    @pecan.expose()
    def delete(self, *args):
        # NOTE: Prohibit from deleting user
        abort(404)
