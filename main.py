import json
from flask import Flask, request
from flask_restful import Api, Resource
from random import randint

import numpy as np

from datab.shared import db

app = Flask(__name__)
api = Api(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
# db = SQLAlchemy(app)
db.app = app
db.init_app(app)

db.drop_all()
db.create_all()

P = 10
WIDTH = P  # x
HEIGHT = P  # y

G = None


class game_instance1():

    def __init__(self):
        self.field = np.zeros((WIDTH, HEIGHT), dtype=int)

    def get_field(self):
        return self.field.tolist()

    def robot_move(self):
        moved = True
        while moved:
            indexH = randint(0, HEIGHT - 1)
            indexW = randint(0, WIDTH - 1)
            if self.field[indexH, indexW] == 0:
                self.field[indexH, indexW] = 2
                moved = False

    def move(self, x, y, user=1):
        x -= 1
        y -= 1
        if 0 <= x < WIDTH and 0 <= y < HEIGHT and self.field[y, x] == 0:
            self.field[y, x] = user
            self.robot_move()
            return self.check_victory()

    def check_victory(self):
        list_of_angles = [self.field[::-1, :].diagonal(i) for i in range(-self.field.shape[0] + 1, self.field.shape[1])]
        list_of_angles.extend(self.field.diagonal(i) for i in range(self.field.shape[1] - 1, -self.field.shape[0], -1))

        for r in range(0, HEIGHT):
            list_of_angles.append(self.field[r, :])
        for c in range(0, WIDTH):
            list_of_angles.append(self.field[:, c])

        victory = False
        sublist = [1, 1]
        for m in list_of_angles:
            w = m.tolist()
            for idx in range(len(w) - len(sublist) + 1):
                if w[idx: idx + len(sublist)] == sublist:
                    victory = True
                    print('Victory:', victory)
                    break

        return victory


class move(Resource):
    def post(self):
        content = request.get_json()
        x = content['x']
        y = content['y']
        # global G TODO: ide ez kéne, csak jelenleg nincs elmentve az állapot
        G = game_instance1()
        victory = G.move(x, y)
        if victory:
            return {'jatekos': 'nyert'}
        else:
            return json.dumps(G.get_field())


class newgame(Resource):
    def post(self):
        global G
        G = game_instance1()
        return json.dumps(G.get_field())


api.add_resource(move, "/move")
api.add_resource(newgame, "/newgame")

if __name__ == '__main__':
    app.run(debug=True)
