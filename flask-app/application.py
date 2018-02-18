'''
Simple Flask application deployment to Amazon Web Services
Uses Elastic Beanstalk and RDS

'''

from flask import Flask, render_template, request, Response, send_from_directory
import redis

# Elastic Beanstalk initalization
application = Flask(__name__)
#application.debug=True
# change this to your own value
application.secret_key = 'cCEo2'

r = redis.StrictRedis(host='nse-quotes.egouhm.0001.aps1.cache.amazonaws.com',port=6379, db=0)
def event_stream():
    pubsub = r.pubsub()
    pubsub.subscribe('WordCountTopology')
    for message in pubsub.listen():
        #print message
        yield 'data: %s\n\n' % message['data']

@application.route('/')
@application.route('/index', methods=['GET', 'POST'])
def show_homepage():
  #Word Cloud = cloud.html and app-cloud.js
    return render_template("index.html")

@application.route('/stream')
def stream():
    return Response(event_stream(), mimetype="text/event-stream")

if __name__ == '__main__':
    application.run(host='0.0.0.0')
