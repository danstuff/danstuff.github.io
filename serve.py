from datetime import datetime

from flask import Flask, render_template, request

from flask_mail import Mail, Message

from flask_wtf import FlaskForm
from wtforms import TextField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, Email

from apscheduler.schedulers.background import BackgroundScheduler

import atexit

from auth import MailUsername, MailPassword, MyEmail, SecretKey, NYTKey, OWMKey

app = Flask(__name__)
app.secret_key = SecretKey

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465 
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

app.config['MAIL_USERNAME'] = MailUsername
app.config['MAIL_PASSWORD'] = MailPassword

sender_name = "Danstuff Mail Bot"

weather_fmt = "{} - {} degrees, {}<br><br>"
weather_locs = ( "Poughkeepise,NY", "Westfield,NJ", "Great Barrington,MA" )

article_fmt = "<b>{}</b><br>{}<br><a href=\"{}\">Read More</a><br><br>"
article_categories = (("world", 2), ("us", 1), ("politics", 1),
                      ("technology", 4), ("science", 3), ("arts", 4),
                      ("food", 2), ("movies", 2))

my_email = MyEmail
mail = Mail(app)

s = BackgroundScheduler()

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
        #fetch chance of rain for given location
        r = request.get("api.openweathermap.org/data/2.5/weather?q={}&appid={}"
                        .format(loc, OWMKey)).json()

        temp = r["main"]["temp"]
        wthr = r["weather"]["description"]
        
        content = content + weather_fmt.format(loc, temp, wthr)
        
    for cat in article_categories:
        #fetch articles from ny times
        r = request.get("https://api.nytimes.com/svc/topstories/v2/{}.json?api-key={}"
                        .format(cat[0], NYTKey)).json()
                        
        #pull out the titles, bodies, and urls for desired number of articles
        for i in range(0, cat[1])
            title = r[i]["title"]
            body = r[i]["abstract"]
            aurl = r[i]["url"]
            
            content = content + article_fmt.format(title, body, aurl)
        
    #create message object, set recipient, set content, and send
    email = Message("Good morning! Here's your daily update", sender = sender_name)
    email.add_recipient(my_email)
    email.html = content
    
    mail.send(email)
    
def schedule():
    s.add_job(func=daily_update, trigger="interval", seconds=86400)
    s.start()

if __name__ == "__main__":
    schedule()
    app.run()

atexit.register(lambda: scheduler.shutdown())