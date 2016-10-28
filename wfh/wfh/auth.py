import datetime

from wfh.model import models

def user_authenticated(auth_key=None):
    now = datetime.datetime.now()
    authorized = models.session.query(
        models.Authentication).filter_by(auth_key=auth_key).first()

    verified = (
        authorized.datetime+datetime.timedelta(minutes=2) > now
        if authorized else False)
    if not verified:
        models.session.delete(authorized)
        models.session.commit()

    return bool(verified)
