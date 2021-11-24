from random import randint

import numpy as np

from datab.database import Leaderboard_Entry
from datab.shared import db


class game_instance():

    def __init__(self, id, username):
        self.field = np.zeros((WIDTH, HEIGHT), dtype=int)
        self.id = id
        self.username = username
        self.step_counter = 0

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
            self.step_counter += 1
            self.robot_move()
            victory, robot_v = self.check_victory()
            return victory, robot_v

    def check_victory(self):
        list_of_angles = [self.field[::-1, :].diagonal(i) for i in range(-self.field.shape[0] + 1, self.field.shape[1])]
        list_of_angles.extend(self.field.diagonal(i) for i in range(self.field.shape[1] - 1, -self.field.shape[0], -1))

        for r in range(0, HEIGHT):
            list_of_angles.append(self.field[r, :])
        for c in range(0, WIDTH):
            list_of_angles.append(self.field[:, c])

        sublist = [1, 1]  # TODO: 5 db 1esre visszairni
        victory = check_grid(sublist, list_of_angles)
        sublist = [2, 2, 2, 2, 2]
        robot_victory = check_grid(sublist, list_of_angles)

        if victory:
            entry = Leaderboard_Entry(username=self.username, score=self.step_counter)
            db.session.add(entry)
            db.session.commit()

        return victory, robot_victory


def check_grid(sublist, list_of_angles):
    victory = False
    for m in list_of_angles:
        w = m.tolist()
        for idx in range(len(w) - len(sublist) + 1):
            if w[idx: idx + len(sublist)] == sublist:
                victory = True
                print('Victory:', victory)
                break
    return victory


P = 19
WIDTH = P  # x
HEIGHT = P  # y
