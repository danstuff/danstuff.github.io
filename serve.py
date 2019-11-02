from flask import Flask, render_template, request, flash

from flask_sqlalchemy import SQLAlchemy

from flask_wtf import FlaskForm
from wtforms import TextField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, Email

app = Flask(__name__)
app.secret_key = 'devKey16821'

class ContactForm(FlaskForm):
    name = TextField("Name", [DataRequired("Please Enter Your Name.")])
    email = TextField("Email", [Email("Please Enter a Valid Email Address."), DataRequired("Please Enter an Email Address.")])
    message = TextAreaField("Message", [DataRequired("Please Enter a Message.")])
    submit = SubmitField("Submit")

#route / and /index requests to index.html
@app.route("/", methods=['GET', 'POST'])
@app.route("/index", methods=['GET', 'POST'])
def show_index():
    form=ContactForm()

    if request.method == 'GET':
        return render_template("index.html", form=form)
    elif request.method == 'POST':
        if form.validate() == False:
            return render_template("index.html", form=form)
        else:
            return render_template("recieved.html")

if __name__ == "__main__":
    app.run()
