from datab.shared import db

class Leaderboard_Entry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=False, nullable=False)
    score = db.Column(db.Integer(), unique=False, nullable=False)

    def __repr__(self):
        return str(self.username + ',' + str(self.score) + ';')
