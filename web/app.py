from flask import Flask, render_template, url_for
from database import DatabaseConnection

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/tasks')
def task():
    dc = DatabaseConnection()
    tasks = []
    
    for id, name, created, creator, complete in dc.execute("select * from tasks"):
        tasks.append({"id": id, "name": name, "created": created, "creator": creator, "complete": complete})

    return render_template('tasks.html', tasks=tasks)

if __name__ == "__main__":
    app.run(debug=True)