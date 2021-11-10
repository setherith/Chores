# Chores
A reward board for helpful folk

# Key Points
- Hosted on a Node server for convience of deploying on a local server such as a Raspberry Pi or other.
- Post a chore on the board, offer a reward and see who completes it.
- Uses open software to share with the world!

# Notes
There are currently two user accounts setup:

* test_user
* admin_user

Both have a password of "password123"

# Setup
docker build -t setherith/chores-db . -f Dockerfile.db
docker build -t setherith/chores-web . -f Dockerfile.web

# Start
docker run --name db -d -p 3306:3306 setherith/chores-db
docker run --name web --link db -d -p 80:8080 setherith/chores-web

# Flask
cd ./web
set FLASK_APP=app
set FLASK_DEBUG=1
flask run --host=0.0.0.0

# Docker Notes
docker rm $(docker ps --filter status=exited -q)