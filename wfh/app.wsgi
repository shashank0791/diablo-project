# /opt/diablo-project/wfh/app.wsgi
from pecan.deploy import deploy
application = deploy('/opt/diablo-project/wfh/config.py')
