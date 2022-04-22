from flask import Flask, jsonify, render_template, request, redirect, url_for, send_file
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_talisman import Talisman
import os
from os.path import join, dirname, realpath
from functions.bertGroups import parseCSV, bert_clusters
from functions.ldaclusters import parseCSVLDA, lda_clusters
from database.users import *
from database.retrieveUserDefects import *
from security.validateUser import *
from functions.verifyFile import verifyFile
import logging
import json
import time

#----------------------------------------------------------------------------------------------------------------------
#CONFIGURATION
#----------------------------------------------------------------------------------------------------------------------


#create app and start it
def create_app():
    app = Flask(__name__)
    return app

app = create_app()


# Upload folder
UPLOAD_FOLDER = 'static/files'
app.config['UPLOAD_FOLDER'] =  UPLOAD_FOLDER

#----------------------------------------------------------------------------------------------------------------------
#DDOS PROTECTION AND HTTPS ENFORCEMENT
#----------------------------------------------------------------------------------------------------------------------

Talisman(app)

limiter = Limiter(app, key_func=get_remote_address, default_limits=["1000 per day", "100 per hour"])


#----------------------------------------------------------------------------------------------------------------------
#LOGGING
#----------------------------------------------------------------------------------------------------------------------

#get starting timestamp
start_time = str(time.time())
#start_time+record.log
filename_log = "./static/logs/"+start_time+"_record.log"

#turn on in production
#logging.basicConfig(filename=filename_log, level=logging.DEBUG, format=f'%(asctime)s %(levelname)s %(name)s %(threadName)s : %(message)s')

#----------------------------------------------------------------------------------------------------------------------
#BASIC ROUTES
#----------------------------------------------------------------------------------------------------------------------

#default route
@app.route('/', methods=['POST', 'GET'])
def index():
    #return a json object with a message
    return jsonify({'message': 'Hello World!, this is the API for the DefectsCemex project. Find documentation here: https://github.com/AlejandroGC/CemexGO'})



#ping route
@app.route('/ping', methods=['POST', 'GET'])
@limiter.exempt
def ping():
    #return a json object with a message
    return jsonify({'message': 'pong'})


#download template file for defects
@app.route('/downloadTemplate', methods=['GET'])
@limiter.limit("1 per minute", override_defaults=False)
def downloadTemplate():
    #sends csv file to the user
    return send_file('./static/Templates/Defects_Template.csv', mimetype='text/csv', as_attachment=True)


#----------------------------------------------------------------------------------------------------------------------
#ISSUE Type ROUTES
#----------------------------------------------------------------------------------------------------------------------

#Retrieve all the issue types
@app.route('/issue-types', methods=['POST'])
def issue_types():
    try:
        #get the username and access token from json
        username = request.json['user']
        access_token = request.json['accessToken']

        if validateUser(username, access_token):
            #get the issue types from the database
            issue_types = retrieve_issue_types()

            #check if the issue types are empty
            if issue_types.empty:
                return jsonify({'message': 'No issue types found'})
            else:
                #return the issue types as a json object
                return issue_types.to_json(orient='records')
        else:
            return jsonify({'message': 'Access token is invalid'})          
    except:
        return jsonify({'message': 'Error retrieving issue types'})

#----------------------------------------------------------------------------------------------------------------------
#CLUSTERING ROUTES
#----------------------------------------------------------------------------------------------------------------------

#Clusterize the data from files with BERT
@app.route("/clusterize", methods=['POST'])
def uploadFiles():
    
    try:
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
                
                #check if the file is a csv and is not valid:
                if verifyFile(file_path) == False:
                    return jsonify({'message': 'File is not a valid CSV'})

                # save the file
                result = parseCSV(file_path, username)

            # return the resulting dataframe
            return result
        else:
            return jsonify({'message': 'Access token is invalid'})
    except:
        return jsonify({'message': 'Error uploading file'})


#Clusterize the data from files with LDA with custom number of topics
@app.route("/clusterize/<number_topics>", methods=['POST'])
def uploadFilesLDA(number_topics):

    try:
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

                #check if the file is a csv and is not valid:
                if verifyFile(file_path) == False:
                    return jsonify({'message': 'File is not a valid CSV'})

                # save the file
                result = parseCSVLDA(file_path, username, number_topics)

            # return the resulting dataframe
            return result
        else:
            return jsonify({'message': 'Access token is invalid'})
    except:
        return jsonify({'message': 'Error uploading files'})

#----------------------------------------------------------------------------------------------------------------------
#DEFECTS OPERATIONS ROUTES
#----------------------------------------------------------------------------------------------------------------------

#Retrieve all defects
@app.route("/defects", methods=['POST'])
def retrieveAllDefects():

    try:
        #get the username and access token from json
        username = request.json['user']
        access_token = request.json['accessToken']
        analysis = request.json['analysis']

        if validateUser(username, access_token):
            #retrieve all defects
            result = retrieve_all_defects()

            #check if the result is not a bool value or empty
            if  type(result) != bool:
                if result.empty == False:
                    if analysis == "none":
                        return result.to_json(orient='records')
                    elif analysis == "default":
                        return bert_clusters(result)
                    #check if analysis is a number
                    elif str(analysis).isdigit():
                        return lda_clusters(result, analysis)
                    else:
                        return result.to_json(orient='records')
                else:
                    return jsonify({'message': 'Database is empty'})
            else:
                    return jsonify({'message': 'Database is empty'})
        else:
            return jsonify({'message': 'Access token is invalid'})
    except:
        return jsonify({'message': 'Error retrieving defects'})

#Get all defects uploaded by a user
@app.route("/defects/get", methods=['POST'])
def getUserDefects():

    try:
        #get the username and access token from json
        username = request.json['user']
        access_token = request.json['accessToken']
        analysis = request.json['analysis']


        if validateUser(username, access_token):
            result = retrieve_user_defects(username)
            #check if the result is not a bool value or empty
            if  type(result) != bool:
                if result.empty == False:
                    if analysis == "none":
                        return result.to_json(orient='records')
                    elif analysis == "default":
                        return bert_clusters(result)
                    #check if analysis is a number
                    elif str(analysis).isdigit():
                        return lda_clusters(result, analysis)
                    else:
                        return result.to_json(orient='records')
                else:
                    return jsonify({'message': 'User has no defects'})
            else:
                return jsonify({'message': 'User has no defects'})
        else:
            return jsonify({'message': 'Access token is invalid'})
    except:
        return jsonify({'message': 'Error retrieving defects'})

#Retrieve all defects by date range
@app.route("/defects/date", methods=['POST'])
def retrieveDefectsByDate():

    try:
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

            #check if the result is not a bool value or empty
            if  type(result) != bool:
                if  result.empty == False:
                    if analysis == "none":
                        return result.to_json(orient='records')
                    elif analysis == "default":
                        return bert_clusters(result)
                    #check if analysis is a number
                    elif str(analysis).isdigit():
                        return lda_clusters(result, analysis)
                    else:
                        return result.to_json(orient='records')
                else:
                    return jsonify({'message': 'No defects in the specified date range'})
            else:
                return jsonify({'message': 'No defects in the specified date range'})
        else:
            return jsonify({'message': 'Access token is invalid'})
    except:
        return jsonify({'message': 'Error retrieving defects'})

#Retrieve all defects by date range by user
@app.route("/defects/date/get", methods=['POST'])
def retrieveDefectsByDateUser():

    try:
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

            #check if the result is not a bool value or empty
            if  type(result) != bool:
                if  result.empty == False:
                    if analysis == "none":
                        return result.to_json(orient='records')
                    elif analysis == "default":
                        return bert_clusters(result)
                    #check if analysis is a number
                    elif str(analysis).isdigit():
                        return lda_clusters(result, analysis)
                    else:
                        return result.to_json(orient='records')
                else:
                    return jsonify({'message': 'No defects in the specified date range'})
            else:
                return jsonify({'message': 'No defects in the specified date range'})
        else:
            return jsonify({'message': 'Access token is invalid'})
    except:
        return jsonify({'message': 'Error retrieving defects'})

#Retrieve all defects by Issue Type
@app.route("/defects/issue", methods=['POST'])
def retrieveDefectsByIssue():

    try:
        #get the username and access token from json
        username = request.json['user']
        access_token = request.json['accessToken']
        analysis = request.json['analysis']

        if validateUser(username, access_token):
            #get the issue type
            issue_type = request.json['issueType']

            #retrieve all defects
            result = retrieve_defects_by_issue_type(issue_type)

            #check if the result is not a bool value or empty
            if  type(result) != bool:
                if  result.empty == False:
                    if analysis == "none":
                        return result.to_json(orient='records')
                    elif analysis == "default":
                        return bert_clusters(result)
                    #check if analysis is a number
                    elif str(analysis).isdigit():
                        return lda_clusters(result, analysis)
                    else:
                        return result.to_json(orient='records')
                else:
                    return jsonify({'message': 'No defects of the specified issue type'})
            else:
                return jsonify({'message': 'No defects of the specified issue type'})
        else:
            return jsonify({'message': 'Access token is invalid'})
    except:
        return jsonify({'message': 'Error retrieving defects'})

#Retrieve all defects by Issue Type by user
@app.route("/defects/issue/get", methods=['POST'])
def retrieveDefectsByIssueUser():

    try:
        #get the username and access token from json
        username = request.json['user']
        access_token = request.json['accessToken']
        analysis = request.json['analysis']

        if validateUser(username, access_token):
            #get the issue type
            issue_type = request.json['issueType']

            #retrieve all defects
            result = retrieve_defects_by_issue_type_user(issue_type,username)

            #check if the result is not a bool value or empty
            if  type(result) != bool:
                if  result.empty == False:
                    if analysis == "none":
                        return result.to_json(orient='records')
                    elif analysis == "default":
                        return bert_clusters(result)
                    #check if analysis is a number
                    elif str(analysis).isdigit():
                        return lda_clusters(result, analysis)
                    else:
                        return result.to_json(orient='records')
                else:
                    return jsonify({'message': 'No defects of the specified issue type'})
            else:
                return jsonify({'message': 'No defects of the specified issue type'})
        else:
            return jsonify({'message': 'Access token is invalid'})
    except:
        return jsonify({'message': 'Error retrieving defects'})


#retrieve defects by Issue Type by date range
@app.route("/defects/issue/date", methods=['POST'])
def retrieveDefectsByCategoryIssueDate():

    try:
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

            #check if the result is not a bool value or empty
            if  type(result) != bool:
                if  result.empty == False:
                    if analysis == "none":
                        return result.to_json(orient='records')
                    elif analysis == "default":
                        return bert_clusters(result)
                    #check if analysis is a number
                    elif str(analysis).isdigit():
                        return lda_clusters(result, analysis)
                    else:
                        return result.to_json(orient='records')
                else:
                    return jsonify({'message': 'No defects of the specified issue type or date range'})
            else:
                return jsonify({'message': 'No defects of the specified issue type or date range'})
        else:
            return jsonify({'message': 'Access token is invalid'})
    except:
        return jsonify({'message': 'Error retrieving defects'})

#Retrieve defects by category by date range by user
@app.route("/defects/category/date/get", methods=['POST'])
def retrieveDefectsByCategoryIssueDateUser():

    try:
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

            #check if the result is not a bool value or empty
            if  type(result) != bool:
                if  result.empty == False:
                    if analysis == "none":
                        return result.to_json(orient='records')
                    elif analysis == "default":
                        return bert_clusters(result)
                    #check if analysis is an integer
                    elif str(analysis).isdigit():
                        return lda_clusters(result, analysis)
                    else:
                        return result.to_json(orient='records')
                else:
                    return jsonify({'message': 'No defects of the specified issue type or date range'})
            else:
                return jsonify({'message': 'No defects of the specified issue type or date range'})
        else:
            return jsonify({'message': 'Access token is invalid'})
    except:
        return jsonify({'message': 'Error retrieving defects'})


#----------------------------------------------------------------------------------------------------------------------
#USER ROUTES
#----------------------------------------------------------------------------------------------------------------------


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


#Create user
@app.route("/user/create", methods=['POST'])
def createUser():
    
    try:
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
    except:
        return jsonify({'message': 'Error creating user'})


#Login user
@app.route("/user/login", methods=['POST'])
def loginUser():

    try:
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
    except: 
        return jsonify({'message': 'Error logging in user'})


#Change password
@app.route("/user/changePassword", methods=['POST'])
def changePassword():

    try:
        request_json = request.get_json()
        user = request_json.get('user')
        access_token = request_json.get('accessToken')
        new_pasword = request_json.get('newPassword')

        #check if user and password are not empty
        if user and access_token and new_pasword:
            #validate user
            if validateUser(user,access_token):
                #change password
                if change_password(user,new_pasword):
                    return jsonify({'message': 'Password changed successfully'})
                else:
                    return jsonify({'message': 'Password could not be changed'})
            else:
                return jsonify({'message': 'Access token is invalid'})
        else:
            return jsonify({'message': 'User or access token or new password cannot be empty'})
    except:
        return jsonify({'message': 'Error changing password'})

#----------------------------------------------------------------------------------------------------------------------
#MAIN
#----------------------------------------------------------------------------------------------------------------------

if __name__ == '__main__':
    app.run(debug=True,)