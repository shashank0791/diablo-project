import datetime

import pecan
from pecan import abort, rest, response, secure

from wfh.auth import user_authenticated
from wfh.model import models


class WfhController(rest.RestController):
    def get_user_id(self, auth_key):
        authenticated = models.session.query(models.Authentication).filter_by(
                auth_key=auth_key).first()
        if authenticated:
            return int(authenticated.user_id)
        else:
            abort(401)

    def create_explanation(self, desc):
        explanation = models.Explanation(desc=desc)
        models.session.add(explanation)
        models.session.commit()
        models.session.refresh(explanation)
        return explanation

    def create_wfh(self, user_id, explanation, actual_date=None):
        create_date = datetime.datetime.now()
        actual_date = actual_date or create_date

        wfh = models.Wfh(user_id=user_id, explanation_id=int(explanation.id),
                         create_date=create_date, actual_date=actual_date)
        models.session.add(wfh)
        models.session.commit()
        models.session.refresh(wfh)
        return wfh

    @pecan.expose()
    def post(self, *args, **kwargs):
        auth_key = kwargs.get('auth_key')
        user_id = self.get_user_id(auth_key)
        desc = kwargs.get('desc')
        actual_date = kwargs.get('actual_date')

        explanation = self.create_explanation(desc)
        wfh = self.create_wfh(user_id, explanation, actual_date)

        response.status = 201
        return

