from datetime import datetime

from flask import Flask, render_template, request

from flask_sqlalchemy import SQLAlchemy

from flask_wtf import FlaskForm
from wtforms import TextField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, Email

app = Flask(__name__)
app.secret_key = 'devKey16821'

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/main.db'

db = SQLAlchemy(app)

#ContactMessage table stores all messages submitted via the contact form
class ContactMessage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    email = db.Column(db.String(128), nullable=False)
    message = db.Column(db.String(512), nullable=False)
    time = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return '<Msg %r %r %r %r>\n' % (self.name, self.email, self.message, self.time)

#ContactForm allows users to contact me by submitting their info
class ContactForm(FlaskForm):
    name = TextField("Name", [DataRequired("Please Enter Your Name.")])
    email = TextField("Email", [Email("Please Enter a Valid Email Address."),
        DataRequired("Please Enter an Email Address.")])
    message = TextAreaField("Message", [DataRequired("Please Enter a Message.")])
    submit = SubmitField("Submit")

#route / and /index requests to index.html
@app.route("/", methods=['GET', 'POST'])
@app.route("/index", methods=['GET', 'POST'])
def show_index():
    #fetch the contact form
    form=ContactForm()

    if request.method == 'GET':
        #route get requests to index.html
        return render_template("index.html", form=form)
    elif request.method == 'POST':
        if form.validate() == False:
            #if the form was not validated, return to index with errors
            return render_template("index.html", form=form)
        else:
            #Create new ContactMessage table entry
            msg = ContactMessage(
                name = form.name.data,
                email = form.email.data,
                message = form.message.data)

            #add it to the database and commit
            db.session.add(msg)
            db.session.commit()

            #inform the user their message was recieved
            return render_template("recieved.html")

if __name__ == "__main__":
    app.run()
