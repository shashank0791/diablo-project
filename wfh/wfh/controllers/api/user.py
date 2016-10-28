import bcrypt
import pecan
from pecan import abort, rest, response
from sqlalchemy import exc

from wfh.model import models

class UserController(rest.RestController):
    def hash_password(self, password):
        return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    def get_user(self, username):
        return models.session.query(models.User).filter_by(
                username=username).first()

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
