from flask import Flask, jsonify, render_template, request, redirect, url_for
import os
from os.path import join, dirname, realpath
from functions.bertGroups import parseCSV
from functions.ldaclusters import parseCSVLDA

def create_app():
    app = Flask(__name__)
    return app

app = create_app()

# Upload folder
UPLOAD_FOLDER = 'static/files'
app.config['UPLOAD_FOLDER'] =  UPLOAD_FOLDER

#default route
@app.route('/', methods=['POST', 'GET'])
def index():
    #return a json object with a message
    return jsonify({'message': 'Hello World!'})

#Clusterize the data from files with BERT
@app.route("/clusterize", methods=['POST'])
def uploadFiles():
    # get the uploaded file
    uploaded_file = request.files['file']
    if uploaded_file.filename != '':
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], uploaded_file.filename)
        # set the file path
        uploaded_file.save(file_path)
        # save the file
        result = parseCSV(file_path)

    # return the resulting dataframe
    return result

#Clusterize the data from files with LDA with custom number of topics
@app.route("/clusterize/<number_topics>", methods=['POST'])
def uploadFilesLDA(number_topics):
    # get the uploaded file
    uploaded_file = request.files['file']
    if uploaded_file.filename != '':
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], uploaded_file.filename)
        # set the file path
        uploaded_file.save(file_path)
        # save the file
        result = parseCSVLDA(file_path, number_topics)

    # return the resulting dataframe
    return result

if __name__ == '__main__':
    app.run(debug=True,)