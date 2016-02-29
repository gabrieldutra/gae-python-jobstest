# coding: utf-8
# pylint: disable=too-few-public-methods, no-self-use, missing-docstring, unused-argument
"""
Provides API logic relevant to users
"""
from flask_restful import reqparse, inputs, Resource

import auth
import util
import model
import math

from main import API
from model import User, UserValidator
from model import Position
from api.helpers import ArgumentValidator, make_new_list_response, make_list_response, make_empty_ok_response
from flask import request, g
from pydash import _
from api.decorators import model_by_key, user_by_username, authorization_required, admin_required


@API.resource('/api/v1/positions')
class PositionsAPI(Resource):
    """Gets list of users. Uses ndb Cursor for pagination. Obtaining users is executed
    in parallel with obtaining total count via *_async functions
    """
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('created_at')
        parser.add_argument('title')
        parser.add_argument('location')
        parser.add_argument('type_')
        parser.add_argument('description')
        parser.add_argument('how_to_apply')
        parser.add_argument('company')
        parser.add_argument('company_url')
        parser.add_argument('company_logo')
        parser.add_argument('url')
        args = parser.parse_args()
        position_db = model.Position(
            created_at=args.created_at,
            title=args.title,
            location=args.location,
            type_=args.type_,
            description=args.description,
            how_to_apply=args.how_to_apply,
            company=args.company,
            company_url=args.company_url,
            company_logo=args.company_logo,
            url=args.url
        )
        position_db.put()
        return position_db.to_dict(include=Position.get_public_properties()), 201


    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('cursor', type=ArgumentValidator.create('cursor'))
        parser.add_argument('page')
        parser.add_argument('keyword')
        parser.add_argument('location')
        args = parser.parse_args()

        keyw = args.get('keyword')
        loc = args.get('location')
        page = args.get('page')

        if not keyw:
            keyw = ""
        if not loc:
            loc = ""

        if not page:
            page=0
        else:
            page=int(page)

        positions_future = Position.query() \
            .order(-Position.created) \
            .fetch_page_async(10000, start_cursor=args.get('cursor'))

        total_count_future = Position.query().count_async(keys_only=True)
        positions, next_cursor, more = positions_future.get_result()

        positions = [p.to_dict(include=Position.get_public_properties()) for p in positions]
        pos = []
        pos = [elem for elem in positions if (elem["title"].find(keyw) != -1 or elem["description"].find(keyw) != -1) and elem["location"].find(loc) != -1]

        ipage=10

        until=((page+1)*ipage)
        if until > len(pos):
            until=len(pos)

        npos = pos[page*ipage:until]

        pages=math.ceil(len(pos)/float(ipage))

        # for x in range(0,len(positions)):
        #     if positions[x]["title"].find(keyw) != -1:
        #         pos.append(positions[x])
        return make_new_list_response(npos, pages, len(npos), len(pos), page*ipage)

@API.resource('/api/v1/positions/<string:key>')
class PositionByKeyAPI(Resource):
    @model_by_key
    def get(self, key):
        return g.model_db.to_dict(include=Position.get_public_properties())

    @model_by_key
    def delete(self, key):
        g.model_key.delete()
        return make_empty_ok_response()

    @model_by_key
    def put(self, key):
        """Updates user's properties"""
        update_properties = ['created_at', 'title', 'location', 'type_', 'description',
                         'how_to_apply', 'company', 'company_url', 'company_logo', 'url']

        new_data = _.pick(request.json, update_properties)
        g.model_db.populate(**new_data)
        g.model_db.put()
        return make_empty_ok_response()
