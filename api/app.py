from flask import Flask, jsonify, render_template, request, redirect, url_for
import os
from os.path import join, dirname, realpath
from functions.bertGroups import parseCSV
from functions.ldaclusters import parseCSVLDA
from database.users import *

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


#----------------------------------------------------------------------------------------------------------------------
#CLUSTERING ROUTES
#----------------------------------------------------------------------------------------------------------------------

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


#----------------------------------------------------------------------------------------------------------------------
#USER ROUTES
#----------------------------------------------------------------------------------------------------------------------

#Create user
@app.route("/user/create", methods=['POST'])
def createUser():
    request_json = request.get_json()
    user = request_json.get('user')
    pasword = request_json.get('password')

    #check if user and password are not empty
    if user and pasword:
        #check if user exists
        if create_user(user,pasword):
            return jsonify({'message': 'User created successfully'})
        else:
            return jsonify({'message': 'User already exists'})

    else:
        return jsonify({'message': 'User or password cannot be empty'})


#Login user
@app.route("/user/login", methods=['POST'])
def loginUser():
    request_json = request.get_json()
    user = request_json.get('user')
    pasword = request_json.get('password')

    #check if user and password are not empty
    if user and pasword:
        #check if user exists
        accepted,access_token = login_user(user,pasword)
        if accepted:
            return jsonify({'message': 'User logged in successfully', 'accessToken': access_token})
        else:
            return jsonify({'message': 'User does not exist or credentials are incorrect'})

    else:
        return jsonify({'message': 'User or password cannot be empty'})

#----------------------------------------------------------------------------------------------------------------------
#MAIN
#----------------------------------------------------------------------------------------------------------------------

if __name__ == '__main__':
    app.run(debug=True,)