from flask import Flask, jsonify, render_template, request, redirect, url_for
import os
from os.path import join, dirname, realpath
from functions.bertGroups import parseCSV, bert_clusters
from functions.ldaclusters import parseCSVLDA, lda_clusters
from database.users import *
from database.retrieveUserDefects import *
from security.validateUser import *
import json
import time


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

        #rename the file to filename+timestamp+username+filetype
        filename = uploaded_file.filename
        filename = filename.split('.')
        filename = filename[0] + '_' + str(int(time.time())) + '_' + username + '.' + filename[1]


        if uploaded_file.filename != '':
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
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

        #rename the file to filename+timestamp+username+filetype
        filename = uploaded_file.filename
        filename = filename.split('.')
        filename = filename[0] + '_' + str(int(time.time())) + '_' + username + '.' + filename[1]

        if uploaded_file.filename != '':
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
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
    analysis = request.json['analysis']

    if validateUser(username, access_token):
        #retrieve all defects
        result = retrieve_all_defects()

        if result:
            if analysis == "none":
                return result.to_json(orient='records')
            elif analysis == "default":
                return bert_clusters(result)
            #check if analysis is a number
            elif analysis.isdigit():
                return lda_clusters(result, analysis)
            else:
                return result.to_json(orient='records')
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
    analysis = request.json['analysis']


    if validateUser(username, access_token):
        result = retrieve_user_defects(username)
        if result:
            if analysis == "none":
                return result.to_json(orient='records')
            elif analysis == "default":
                return bert_clusters(result)
            #check if analysis is a number
            elif analysis.isdigit():
                return lda_clusters(result, analysis)
            else:
                return result.to_json(orient='records')
        else:
            return jsonify({'message': 'User has no defects'})
    else:
        return jsonify({'message': 'Access token is invalid'})

#Retrieve all defects by date range
@app.route("/defects/date", methods=['POST'])
def retrieveDefectsByDate():
    #get the username and access token from json
    username = request.json['user']
    access_token = request.json['accessToken']
    analysis = request.json['analysis']

    if validateUser(username, access_token):
        #get the date range
        start_date = request.json['startDate']
        end_date = request.json['endDate']

        #retrieve all defects
        result = retrieve_defects_date_range(start_date, end_date)

        if result:
            if analysis == "none":
                return result.to_json(orient='records')
            elif analysis == "default":
                return bert_clusters(result)
            #check if analysis is a number
            elif analysis.isdigit():
                return lda_clusters(result, analysis)
            else:
                return result.to_json(orient='records')
        else:
            return jsonify({'message': 'No defects in the specified date range'})
    else:
        return jsonify({'message': 'Access token is invalid'})

#Retrieve all defects by date range by user
@app.route("/defects/date/get", methods=['POST'])
def retrieveDefectsByDateUser():
    #get the username and access token from json
    username = request.json['user']
    access_token = request.json['accessToken']
    analysis = request.json['analysis']

    if validateUser(username, access_token):
        #get the date range
        start_date = request.json['startDate']
        end_date = request.json['endDate']

        #retrieve all defects
        result = retrieve_user_defects_date_range(username, start_date, end_date)

        if result:
            if analysis == "none":
                return result.to_json(orient='records')
            elif analysis == "default":
                return bert_clusters(result)
            #check if analysis is a number
            elif analysis.isdigit():
                return lda_clusters(result, analysis)
            else:
                return result.to_json(orient='records')
        else:
            return jsonify({'message': 'No defects in the specified date range'})
    else:
        return jsonify({'message': 'Access token is invalid'})

#Retrieve all defects by Issue Type
@app.route("/defects/issue", methods=['POST'])
def retrieveDefectsByIssue():
    #get the username and access token from json
    username = request.json['user']
    access_token = request.json['accessToken']
    analysis = request.json['analysis']

    if validateUser(username, access_token):
        #get the issue type
        issue_type = request.json['issueType']

        #retrieve all defects
        result = retrieve_defects_by_issue_type(issue_type)

        if result:
            if analysis == "none":
                return result.to_json(orient='records')
            elif analysis == "default":
                return bert_clusters(result)
            #check if analysis is a number
            elif analysis.isdigit():
                return lda_clusters(result, analysis)
            else:
                return result.to_json(orient='records')
        else:
            return jsonify({'message': 'No defects of the specified issue type'})
    else:
        return jsonify({'message': 'Access token is invalid'})

#Retrieve all defects by Issue Type by user
@app.route("/defects/issue/get", methods=['POST'])
def retrieveDefectsByIssueUser():
    #get the username and access token from json
    username = request.json['user']
    access_token = request.json['accessToken']
    analysis = request.json['analysis']

    if validateUser(username, access_token):
        #get the issue type
        issue_type = request.json['issueType']

        #retrieve all defects
        result = retrieve_defects_by_issue_type_user(issue_type,username)

        if result:
            if analysis == "none":
                return result.to_json(orient='records')
            elif analysis == "default":
                return bert_clusters(result)
            #check if analysis is a number
            elif analysis.isdigit():
                return lda_clusters(result, analysis)
            else:
                return result.to_json(orient='records')
        else:
            return jsonify({'message': 'No defects of the specified issue type'})
    else:
        return jsonify({'message': 'Access token is invalid'})


#retrieve defects by Issue Type by date range
@app.route("/defects/issue/date", methods=['POST'])
def retrieveDefectsByCategoryIssueDate():
    #get the username and access token from json
    username = request.json['user']
    access_token = request.json['accessToken']
    analysis = request.json['analysis']

    if validateUser(username, access_token):
        #get the category and issue type
        issue_type = request.json['issueType']
        start_date = request.json['startDate']
        end_date = request.json['endDate']

        #retrieve all defects
        result = retrieve_defects_by_issue_type_date_range(issue_type, start_date, end_date)

        if result:
            if analysis == "none":
                return result.to_json(orient='records')
            elif analysis == "default":
                return bert_clusters(result)
            #check if analysis is a number
            elif analysis.isdigit():
                return lda_clusters(result, analysis)
            else:
                return result.to_json(orient='records')
        else:
            return jsonify({'message': 'No defects of the specified issue type or date range'})
    else:
        return jsonify({'message': 'Access token is invalid'})

#Retrieve defects by category by date range by user
@app.route("/defects/category/date/get", methods=['POST'])
def retrieveDefectsByCategoryIssueDateUser():
    #get the username and access token from json
    username = request.json['user']
    access_token = request.json['accessToken']
    analysis = request.json['analysis']

    if validateUser(username, access_token):
        #get the category and issue type
        issue_type = request.json['issueType']
        start_date = request.json['startDate']
        end_date = request.json['endDate']

        #retrieve all defects
        result = retrieve_defects_by_issue_type_user_date_range(issue_type, username, start_date, end_date)

        if result:
            if analysis == "none":
                return result.to_json(orient='records')
            elif analysis == "default":
                return bert_clusters(result)
            #check if analysis is a number
            elif analysis.isdigit():
                return lda_clusters(result, analysis)
            else:
                return result.to_json(orient='records')
        else:
            return jsonify({'message': 'No defects of the specified issue type or date range'})
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