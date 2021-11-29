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
CORS(app)
api = Api(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
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
        Games.remove(g)
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


class Leaderboard(Resource):
    def get(self):
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
                return jsonify({'won': username,
                                'board': game.get_board()})
            elif robot_v:
                delete_game_instance(id)
                return jsonify({'won': 'robot',
                                'board': game.get_board()})
            else:
                return jsonify({'won': '',
                                'board': game.get_board()})

        except Exception as e:
            print("ERROR")
            print(e)
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
        Games.append(game_instance(int(game_id), username))
        threading.Thread(target=game_deleting_thread, args=[game_id], daemon=True).start()

        game = find_game_in_games_list(game_id)
        return jsonify({'board': game.get_board(),
                        'game_id': int(game_id)})


api.add_resource(Move, "/move")
api.add_resource(NewGame, "/newgame")
api.add_resource(Leaderboard, "/leaderboard")

if __name__ == '__main__':
    app.run(debug=True)
