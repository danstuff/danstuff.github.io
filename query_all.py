#query the database by importing ContactMessage from serve.py
from serve import ContactMessage
print(ContactMessage.query.all())
