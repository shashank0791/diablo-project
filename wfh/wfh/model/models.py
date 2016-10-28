import bcrypt
from sqlalchemy import create_engine
from sqlalchemy import orm
from sqlalchemy.orm import relationship
from sqlalchemy import sql
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Date
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy_utils import database_exists, create_database

USER = "root"
PASSWORD = "stackdb"
IP = "localhost"
DB_NAME = "diablo"
DB_URL = "mysql://{}:{}@{}/{}".format(USER, PASSWORD, IP, DB_NAME)

engine = create_engine(DB_URL)
if not database_exists(engine.url):
    create_database(engine.url)

Base = declarative_base()


class JsonMixin(object):
   def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class User(JsonMixin, Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    username = Column(String(50), unique=True)
    password = Column(String(60))
    email = Column(String(50))
    team_id = Column(Integer, ForeignKey('team.id'))
    photo_id = Column(Integer, ForeignKey('photos.id'))

    authentication = relationship('Authentication', uselist=False)

    def __repr__(self):
        return "<User(name='%s', username='%s', password='%s')>" % (
                             self.name, self.username, self.password)

    @property
    def auth_key(self):
        return self.authentication.auth_key if self.authentication else ''

    @property
    def is_authenticated(self):
        return (self.authentication.is_valid if self.authentication else False)

    def verify_password(self, password):
        return (bcrypt.hashpw(password.encode('utf-8'), self.password) ==
                self.password)

    def hash_password(self, password):
        hashpw =  bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        self.password = hashpw

    @classmethod
    def get_user(cls, username):
        return session.query(cls).filter_by(username=username).first()

class Team(JsonMixin, Base):
    __tablename__ = 'team'
    id = Column(Integer, primary_key=True)
    name = Column(String(50))


class Photos(JsonMixin, Base):
    __tablename__ = 'photos'

    id = Column(Integer, primary_key=True)
    swift_hash = Column(String(50))
    desc = Column(String(50))


class Wfh(JsonMixin, Base):
    __tablename__ = 'wfh'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    create_date = Column(Date())
    actual_date = Column(Date())
    explanation_id = Column(Integer, ForeignKey('explanation.id'))


class Explanation(JsonMixin, Base):
    __tablename__ = 'explanation'

    id = Column(Integer, primary_key=True)
    desc = Column(String(50))
    count = Column(Integer)
    votes = Column(Integer)

class Votes(JsonMixin, Base):
    __tablename__ = 'votes'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    explanation_id = Column(Integer, ForeignKey('explanation.id'))


class Authentication(JsonMixin, Base):
    __tablename__ = 'authentication'

    id = Column(Integer, primary_key=True)
    datetime = Column(DateTime())
    user_id = Column(Integer, ForeignKey('users.id'))
    auth_key = Column(String(128), unique=True)

    @property
    def is_valid(self):
        now = datetime.datetime.now()
        valid = (self.datetime + datetime.datetime.timedelta(hours=1) < now)
        if not valid:
            self.revoke()

        return valid

    def revoke(self):
        session.delete(self)
        session.commit()

Session = orm.sessionmaker(bind=engine)
session = Session()
Base.metadata.create_all(bind=engine)
