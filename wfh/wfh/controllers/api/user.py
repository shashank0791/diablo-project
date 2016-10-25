import pecan
from pecan import abort, rest, response


class UserController(rest.RestController):
    @pecan.expose('json')
    def get(self, *args):
        # TODO: retrieve list of users from DB
        return {'user1': 'user1'}

    @pecan.expose()
    def post(self, *args, **kwargs):
        # TODO: create new user
        if not args:
            abort(404)

        response.status = 201
        return

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
