import sqlalchemy as sa

from sqlalchemy import create_engine
from sqlalchemy import orm
from sqlalchemy import sql
from sqlalchemy.ext.declarative import declarative_base as dec_base
from sqlalchemy import Column, Integer, String, ForeignKey

engine = create_engine('mysql://root:root@localhost/diablo', echo=True)
Base = dec_base()

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    username = Column(String(50))
    password = Column(String(50))
    email = Column(String(50))
    team = Column(Integer, ForeignKey('team.id'))
    photo_id = Column(Integer, ForeignKey('photos.id'))

    def __repr__(self):
        return "<User(name='%s', username='%s', password='%s')>" % (
                             self.name, self.username, self.password)


class Team(Base):
    __tablename__ = 'team'
    id = Column(Integer, primary_key=True)
    name = Column(String(50))


class Photos(Base):
    __tablename__ = 'photos'

    id = Column(Integer, primary_key=True)
    swift_hash = Column(String(50))
    desc = Column(String(50))


class Wfh(Base):
    __tablename__ = 'wfh'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    create_date = Column(String(50))
    actual_date = Column(String(50))
    explaination = Column(Integer, ForeignKey('explaination.id'))


class Explaination(Base):
    __tablename__ = 'explaination'

    id = Column(Integer, primary_key=True)
    desc = Column(String(50))
    count = Column(Integer)
    votes = Column(Integer)

class Votes(Base):
    __tablename__ = 'votes'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    explaination = Column(Integer, ForeignKey('explaination.id'))

Session = orm.sessionmaker(bind=engine)
session = Session()
Base.metadata.create_all(bind=engine)
