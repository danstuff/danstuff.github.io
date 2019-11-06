#create the database defined in serve.py
from serve import db
db.create_all()
print("Database Created")
