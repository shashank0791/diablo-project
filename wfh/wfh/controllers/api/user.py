import bcrypt
import pecan
from pecan import abort, rest, response
from sqlalchemy import exc
from sqlalchemy.orm import sessionmaker

from wfh.model import models

engine = models.engine
Session = sessionmaker(bind=engine)
session = Session()


class UserController(rest.RestController):
    def hash_password(self, password):
        return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    def get_user(self, username):
        return session.query(models.User).filter_by(username=username).first()

    @pecan.expose('json')
    def get_one(self, *args, **kwargs):
        user = self.get_user(args[0])
        response.status = 200
        return user.as_dict() if user else abort(404)

    @pecan.expose('json')
    def get_all(self):
        response.status = 200
        users = session.query(models.User).all()
        return [user.as_dict() for user in users]

    @pecan.expose()
    def post(self, *args, **kwargs):
        if args:
            abort(404)

        name = kwargs['name']
        username = kwargs['username']
        password = kwargs['password']
        email = kwargs['email']
        team = kwargs.get('team')
        photo_id = kwargs.get('photo_id')

        user = models.User(name=name, username=username, email=email,
                           password=self.hash_password(password))
        session.add(user)

        try:
            session.commit()
        except exc.IntegrityError:
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
