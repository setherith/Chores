from flask import Flask
from database import DatabaseConnection

app = Flask(__name__)

@app.route('/')
def index():
    dc = DatabaseConnection()
    tasks = []
    
    for id, name, created, creator, complete in dc.execute("select * from tasks"):
        tasks.append({"name": name})

    print (tasks)
    return tasks[0]


app.run(debug=True)