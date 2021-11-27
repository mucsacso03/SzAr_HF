import string
import threading
import time
from datetime import datetime
from random import SystemRandom

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


def find_game_in_games_list(id):
    try:
        return [x for x in Games if x.id == id][0]
    except:
        return None


def delete_game_instance(id):
    try:
        g = find_game_in_games_list(id)
        # print(Games)
        Games.remove(g)
        # print(Games)

    except Exception as e:
        print(e)


def delete_inactive_game(id):
    g = find_game_in_games_list(id)
    if g is None:
        return True
    if datetime.now() > g.delete_time:
        delete_game_instance(id)
        return True
    else:

        return False


def game_deleting_thread(id):
    while not delete_inactive_game(id):
        time.sleep(5)


# class DeleteGame(Resource):
#     def post(self):
#         content = request.get_json()
#         id = content['id']
#         delete_game_instance(id)
#         return str(200)


class Leaderboard(Resource):
    def get(self):
        # entry1 = Leaderboard_Entry(username='username', score=1)
        # entry2 = Leaderboard_Entry(username='rname', score=5)
        # entry3 = Leaderboard_Entry(username='username', score=3)
        # entry4 = Leaderboard_Entry(username='username', score=30)
        # entry5 = Leaderboard_Entry(username='username', score=21)
        # entry6 = Leaderboard_Entry(username='username', score=7)
        # entry7 = Leaderboard_Entry(username='username', score=13)
        # entry8 = Leaderboard_Entry(username='username', score=18)
        # db.session.add(entry1)
        # db.session.add(entry2)
        # db.session.add(entry3)
        # db.session.add(entry4)
        # db.session.add(entry5)
        # db.session.add(entry6)
        # db.session.add(entry7)
        # db.session.add(entry8)
        # db.session.commit()
        q = Leaderboard_Entry.query.all()
        q.sort(key=lambda x: x.score, reverse=False)
        q = q[:10]
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
            print('ACTIVE GAMES:', len(Games))
            print("REQUEST:")
            print(request.get_json())

            game = find_game_in_games_list(id)
            victory, robot_v = game.move(x, y)
            if victory:
                username = game.username
                delete_game_instance(id)
                return jsonify({"won": username})

            elif robot_v:
                delete_game_instance(id)
                return jsonify({"won": 'robot'})
            else:
                return jsonify({'won': '',
                                'field': game.get_field()})

        except Exception as e:
            print("ERROR")
            print(e)
            # return e TODO: only for debug
            return str(404)


def generate_id():
    while True:
        game_id = ''.join(SystemRandom().choice(string.digits) for _ in range(4))
        if find_game_in_games_list(game_id) is None:
            return int(game_id)


class NewGame(Resource):
    def post(self):
        content = request.get_json()
        username = content['username']
        global Games
        game_id = generate_id()
        # game_id = 123  # TODO: only for debug
        Games.append(game_instance(int(game_id), username))
        threading.Thread(target=game_deleting_thread, args=[game_id], daemon=True).start()

        # Itt is vissszaküldjük a pályát, hogy egyszerűbb dolgunk legyen
        game = find_game_in_games_list(game_id)

        return jsonify({'field': game.get_field(),
                        'game_id': int(game_id)})

        # return (game.get_field())
        # # return json.dumps({"data" : game.get_field()})
        # return json.dumps(int(game_id))  # ezt is, meg a fentit is kéne


api.add_resource(Move, "/move")
api.add_resource(NewGame, "/newgame")
api.add_resource(Leaderboard, "/leaderboard")

if __name__ == '__main__':
    app.run(debug=True)
