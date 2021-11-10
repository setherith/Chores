import mysql.connector

class DatabaseConnection:

    db = None

    def __init__(self):
        self.db = mysql.connector.connect(
        host="localhost",
        username="root",
        password="password123",
        database="chores"
    )

    def execute(self, query):
        cur = self.db.cursor()
        cur.execute(query)
        return cur.fetchall()