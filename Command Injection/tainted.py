import os
import subprocess
from flask import Flask, request
app = Flask(__name__)

# curl -X GET "http://localhost:5000/tainted7/touch%20HELLO"
@app.route("/tainted7/<something>")
def test_sources_7(something):
    allowed_commands = ['ls', 'pwd', 'whoami']
    parts = request.remote_addr.split()
    command = parts[0]

    if command not in allowed_commands:
        raise ValueError('Invalid command')

    result = subprocess.run(parts, capture_output=True, text=True, shell=False)
    if result.returncode != 0:
        print('Error occurred')
    print(result.stdout)

    return "foo"

if __name__ == "__main__":
	app.run(debug=True)
