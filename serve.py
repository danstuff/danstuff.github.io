from datetime import datetime

from flask import Flask, render_template, request

from flask_mail import Mail, Message

from flask_wtf import FlaskForm
from wtforms import TextField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, Email

from auth import MailUsername, MailPassword, MyEmail, SecretKey, NYTKey, GuaKey APKey, OWMKey

app = Flask(__name__)
app.secret_key = SecretKey

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465 
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

app.config['MAIL_USERNAME'] = MailUsername
app.config['MAIL_PASSWORD'] = MailPassword

sender_name = "Danstuff Mail Bot"

weather_fmt = "{} - {}% chance of rain.<br><br>"
article_fmt = "<b>{}</b><br>{}<br><a href=\"{}\">Read More</a><br><br>"

weather_locs = { "Poughkeepise,NY", "Westfield,NJ", "Great Barrington,MA" }
articles_per_site = 3

my_email = MyEmail
mail = Mail(app)

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
            #notify me that someone sent a message 
            email = Message("Someone Contacted You", sender = sender_name)
            email.add_recipient(my_email)
            email.html = "New Message from {}, {}: <br><br> {}".format(
                    form.name.data, form.email.data, form.message.data)

            mail.send(email)

            #inform the user their message was recieved
            return render_template("recieved.html")
            
#function to be executed daily; my daily update
def daily_update():
    content = ""
    
    for loc in weather_locs:
        #TODO fetch chance of rain for given location
        chance = 0
        content = content + weather_fmt.format(loc, chance)
        
    for i in range(0, articles_per_site):
        #TODO fetch article title, content, and URL
        title = "Article Title"
        body = "Article body"
        aurl = "https://www.google.com/"
        content = content + article_fmt.format(title, body, aurl)
        
    email = Message("Here's your daily update", sender = sender_name)
    email.add_recipient(my_email)
    email.html = content
    
    mail.send(email)

if __name__ == "__main__":
    app.run()
