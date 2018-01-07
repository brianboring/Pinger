import subprocess
import os
import webbrowser
from flask import Flask
from flask import render_template

webbrowser.open('http://0.0.0.0:8000/')

app = Flask(__name__)

@app.route('/')
def pinger():
    with open(os.devnull, "wb") as limbo:
        responses = []
        for n in range(1, 11):
            ip="192.168.1.{0}".format(n)
            result=subprocess.Popen(["ping", "-c", "1", "-n", "-W", "2", ip],
                    stdout=limbo, stderr=limbo).wait()
            if result:
                responses.append("{} inactive".format(ip))
            else:
                responses.append("{} active".format(ip))
        return render_template("index.html", responses=responses)

app.run(debug=True, port=8000, host='0.0.0.0')
