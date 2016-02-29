"""Provides implementation of User model and User"""
from __future__ import absolute_import

from google.appengine.ext import ndb
import model
import hashlib

class Position(model.Base):
    created_at = ndb.StringProperty(default='')
    title = ndb.StringProperty(default='')
    location = ndb.StringProperty(default='')
    type_ = ndb.StringProperty(default='')
    description = ndb.TextProperty(default='')
    how_to_apply = ndb.StringProperty(default='')
    company = ndb.StringProperty(default='')
    company_url = ndb.StringProperty(default='')
    company_logo = ndb.StringProperty(default='')
    url = ndb.StringProperty(default='')

    PUBLIC_PROPERTIES = ['created_at', 'title', 'location', 'type_', 'description',
                     'how_to_apply', 'company', 'company_url', 'company_logo', 'url']
