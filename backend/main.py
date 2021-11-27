import json
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_restful import Api, Resource

from datab.database import Leaderboard_Entry
from datab.shared import db
from game import game_instance

app = Flask(__name__)
cors = CORS(app)
# cors = CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
CORS(app)
api = Api(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
# db = SQLAlchemy(app)
db.app = app
db.init_app(app)

# db.drop_all()
db.create_all()

Games = []


def delete_game_instance(id):
    try:
        G = [x for x in Games if x.id == id][0]
        # print(Games)
        Games.remove(G)
        # print(Games)

    except Exception as e:
        print(e)


class DeleteGame(Resource):
    def post(self):
        content = request.get_json()
        id = content['id']
        delete_game_instance(id)
        return str(200)


class Leaderboard(Resource):
    def get(self):
        q = Leaderboard_Entry.query.all()
        files = {}
        num = 1

        for row in q:
            files[num] = {
                "username": row.username,
                "score": row.score
            }
            num += 1
        return jsonify(files)


class Move(Resource):
    def post(self):
        try:
            content = request.get_json()
            x = int(content['x'])
            y = int(content['y'])
            id = int(content['id'])

            print("REQUEST:")
            print(request.get_json())

            G = [x for x in Games if x.id == id][0]
            victory, robot_v = G.move(x, y)
            if victory:
                username = G.username
                delete_game_instance(id)
                return jsonify({"won": username})

            elif robot_v:
                delete_game_instance(id)
                return jsonify({"won": 'robot'})
            else:
                return jsonify({'won': '',
                                'field': G.get_field()})

        except Exception as e:
            print("ERROR")
            print(e)
            # return e TODO: only for debug
            return str(404)


class NewGame(Resource):
    def post(self):
        content = request.get_json()
        username = content['username']
        global Games
        # id = ''.join(SystemRandom().choice(string.digits) for _ in range(2))
        id = 123  # TODO: only for debug
        Games.append(game_instance(int(id), username))

        # Itt is vissszaküldjük a pályát, hogy egyszerűbb dolgunk legyen
        G = [x for x in Games if x.id == id][0]
        return(G.get_field())
        # return json.dumps({"data" : G.get_field()})
        return json.dumps(int(id))  # ezt is, meg a fentit is kéne


api.add_resource(Move, "/move")
api.add_resource(NewGame, "/newgame")
api.add_resource(Leaderboard, "/leaderboard")

if __name__ == '__main__':
    app.run(debug=True)
