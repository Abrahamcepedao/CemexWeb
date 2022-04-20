from flask import Flask, jsonify, render_template, request, redirect, url_for
import os
from os.path import join, dirname, realpath
from functions.bertGroups import parseCSV
from functions.ldaclusters import parseCSVLDA
from database.users import *
from database.retrieveUserDefects import *
from security.validateUser import *
import json

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


#testing access token route
@app.route('/test-token', methods=['POST'])
def test():
    #get the username and access token from json
    username = request.json['user']
    access_token = request.json['accessToken']

    if validateUser(username, access_token):
        return jsonify({'message': 'Access token is valid'})
    else:
        return jsonify({'message': 'Access token is invalid'})

#----------------------------------------------------------------------------------------------------------------------
#CLUSTERING ROUTES
#----------------------------------------------------------------------------------------------------------------------

#Clusterize the data from files with BERT
@app.route("/clusterize", methods=['POST'])
def uploadFiles():
    #get the username and access token from data sent by the client
    json_data = json.loads(request.form["data"])

    username = json_data['user']
    access_token = json_data['accessToken']

    if validateUser(username, access_token):

        # get the uploaded file
        uploaded_file = request.files['file']
        if uploaded_file.filename != '':
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], uploaded_file.filename)
            # set the file path
            uploaded_file.save(file_path)
            # save the file
            result = parseCSV(file_path, username)

        # return the resulting dataframe
        return result
    else:
        return jsonify({'message': 'Access token is invalid'})

#Clusterize the data from files with LDA with custom number of topics
@app.route("/clusterize/<number_topics>", methods=['POST'])
def uploadFilesLDA(number_topics):

    #get the username and access token from data sent by the client
    json_data = json.loads(request.form["data"])

    username = json_data['user']
    access_token = json_data['accessToken']

    if validateUser(username, access_token):
        # get the uploaded file
        uploaded_file = request.files['file']
        if uploaded_file.filename != '':
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], uploaded_file.filename)
            # set the file path
            uploaded_file.save(file_path)
            # save the file
            result = parseCSVLDA(file_path, username, number_topics)

        # return the resulting dataframe
        return result
    else:
        return jsonify({'message': 'Access token is invalid'})

#----------------------------------------------------------------------------------------------------------------------
#DEFECTS OPERATIONS ROUTES
#----------------------------------------------------------------------------------------------------------------------

#Retrieve all defects
@app.route("/defects", methods=['POST'])
def retrieveAllDefects():
    #get the username and access token from json
    username = request.json['user']
    access_token = request.json['accessToken']

    if validateUser(username, access_token):
        #retrieve all defects
        result = retrieve_all_defects()

        if result:
            return result
        else:
            return jsonify({'message': 'Database is empty'})
    else:
        return jsonify({'message': 'Access token is invalid'})

#Get all defects uploaded by a user
@app.route("/defects/get", methods=['POST'])
def getUserDefects():
    #get the username and access token from json
    username = request.json['user']
    access_token = request.json['accessToken']


    if validateUser(username, access_token):
        data = retrieve_user_defects(username)
        if data:
            return data
        else:
            return jsonify({'message': 'User has no defects'})
    else:
        return jsonify({'message': 'Access token is invalid'})

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