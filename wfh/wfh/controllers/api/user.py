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
    @pecan.expose('json')
    def get_one(self, *args, **kwargs):
        user = session.query(models.User).filter_by(username=args[0]).first()
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

        hashed_password = bcrypt.hashpw(password.encode('utf-8'),
                                        bcrypt.gensalt())
        user = models.User(name=name, username=username,
                           password=hashed_password, email=email)
        session.add(user)
        try:
            session.commit()
        except exc.IntegrityError:
            response.status = 409
        else:
            response.status = 201
        return response

    @pecan.expose()
    def put(self, *args, **kwargs):
        # TODO: update existing user
        # TODO: idempotent PUT (return 200 or 204)
        if not args:
            abort(404)

        response.status = 204
        return

    @pecan.expose()
    def delete(self, *args):
        # TODO: idempotent DELETE
        if not args:
            abort(404)

        response.status = 200
        return response
