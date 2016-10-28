import pecan
from pecan import abort, rest, response, secure

from wfh.auth import user_authenticated
from wfh.model import models


class WfhController(rest.RestController):
    @pecan.expose('json')
    def get_all(self):
        teams = models.session.query(models.Team).all()
        return [team.as_dict() for team in teams]

    @pecan.expose()
    def post(self, *args, **kwargs):
        name = kwargs.get('name')
        if not name:
            abort(404)
        team = models.Team(name=name)
        models.session.add(team)
        try:
            models.session.commit()
        except:
            abort(404)

        response.status = 201
        return

