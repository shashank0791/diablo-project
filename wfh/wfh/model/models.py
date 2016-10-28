import bcrypt
from sqlalchemy import create_engine
from sqlalchemy import orm
from sqlalchemy import sql
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, ForeignKey
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
    team = Column(Integer, ForeignKey('team.id'))
    photo_id = Column(Integer, ForeignKey('photos.id'))

    def __repr__(self):
        return "<User(name='%s', username='%s', password='%s')>" % (
                             self.name, self.username, self.password)

    def verify_password(self, password):
        pwhash = bcrypt.hashpw(password.encode('utf-8'),
                                        bcrypt.gensalt())
        return password == pwhash


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
    create_date = Column(String(50))
    actual_date = Column(String(50))
    explaination = Column(Integer, ForeignKey('explanation.id'))


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
    explanation = Column(Integer, ForeignKey('explanation.id'))

Session = orm.sessionmaker(bind=engine)
session = Session()
Base.metadata.create_all(bind=engine)
