import pymongo
from pymongo import MongoClient
from functions.auxiliary import *
from security.accessToken import *
from functions.auxiliary import *
from functions.changeDateFormat import *
import pandas as pd

myclient = MongoClient("mongodb+srv://SeaWar741:CemexGo2022@cluster0.4glnz.mongodb.net")

#retrieve all defects 
def retrieve_all_defects():

    mydb = myclient["defectsCemex"]

    mycol = mydb["defects"]

    #get all defects
    mydoc = mycol.find()

    #convert to dataframe
    df = pd.DataFrame(list(mydoc))

    #if the database is empty, return an empty list
    if df.empty:
        return False
    else:
        #drop the _id column and User column
        df = df.drop(columns=['_id','User'])

        #convert the dataframe to json
        return df



#retrieve defects uploaded by a user
def retrieve_user_defects(user):

    mydb = myclient["defectsCemex"]

    mycol = mydb["defects"]

    #get all defects uploaded by the user
    myquery = {"User":user}

    mydoc = mycol.find(myquery)

    #convert to dataframe
    df = pd.DataFrame(list(mydoc))

    #if the user has no defects, return an empty list
    if df.empty:
        return False
    else:
        #drop the _id column and User column
        df = df.drop(columns=['_id','User'])

        #convert the dataframe to json
        return df



#retrieve defects uploaded in an specific date range
def retrieve_defects_date_range(start_date, end_date):

    mydb = myclient["defectsCemex"]

    mycol = mydb["defects"]


    start_date = start_date
    end_date = end_date

    #get all defects uploaded in the date range
    myquery = {"Created": {"$gte": start_date, "$lte": end_date}}

    mydoc = mycol.find(myquery)

    #convert to dataframe
    df = pd.DataFrame(list(mydoc))

    #if the database is empty, return an empty list
    if df.empty:
        return False
    else:
        #drop the _id column and User column
        df = df.drop(columns=['_id','User'])

        #convert the dataframe to json
        return df



#retrieve defects uploaded by a user in a specific date range
def retrieve_user_defects_date_range(user, start_date, end_date):

    mydb = myclient["defectsCemex"]

    mycol = mydb["defects"]

    start_date = start_date
    end_date = end_date

    #get all defects uploaded by the user in the date range
    myquery = {"User":user, "Created": {"$gte": start_date, "$lte": end_date}}

    mydoc = mycol.find(myquery)

    #convert to dataframe
    df = pd.DataFrame(list(mydoc))

    #if the user has no defects in the date range, return an empty list
    if df.empty:
        return False
    else:
        #drop the _id column and User column
        df = df.drop(columns=['_id','User'])

        #convert the dataframe to json
        return df



#retrieve defects by Issue Type
def retrieve_defects_by_issue_type(issue_type):

    mydb = myclient["defectsCemex"]

    mycol = mydb["defects"]

    #get all defects by the issue type
    myquery = {"Issue Type":issue_type}

    mydoc = mycol.find(myquery)

    #convert to dataframe
    df = pd.DataFrame(list(mydoc))

    #if the database is empty, return an empty list
    if df.empty:
        return False
    else:
        #drop the _id column and User column
        df = df.drop(columns=['_id','User'])

        #convert the dataframe to json
        return df



#retrieve defects by Issue Type by a user
def retrieve_defects_by_issue_type_user(issue_type, user):

    mydb = myclient["defectsCemex"]

    mycol = mydb["defects"]

    #get all defects by the issue type and user
    myquery = {"Issue Type":issue_type, "User":user}

    mydoc = mycol.find(myquery)

    #convert to dataframe
    df = pd.DataFrame(list(mydoc))

    #if the user has no defects in the date range, return an empty list
    if df.empty:
        return False
    else:
        #drop the _id column and User column
        df = df.drop(columns=['_id','User'])

        #convert the dataframe to json
        return df



#retrieve defects by Issue Type in a specific date range
def retrieve_defects_by_issue_type_date_range(issue_type, start_date, end_date):

    mydb = myclient["defectsCemex"]

    mycol = mydb["defects"]

    #get all defects by the issue type in the date range
    myquery = {"Issue Type":issue_type, "Created": {"$gte": start_date, "$lte": end_date}}

    mydoc = mycol.find(myquery)

    #convert to dataframe
    df = pd.DataFrame(list(mydoc))

    #if the database is empty, return an empty list
    if df.empty:
        return False
    else:
        #drop the _id column and User column
        df = df.drop(columns=['_id','User'])

        #convert the dataframe to json
        return df



#retrieve defects by Issue Type by a user in a specific date range
def retrieve_defects_by_issue_type_user_date_range(issue_type, user, start_date, end_date):

    mydb = myclient["defectsCemex"]

    mycol = mydb["defects"]

    #get all defects by the issue type and user in the date range
    myquery = {"Issue Type":issue_type, "User":user, "Created": {"$gte": start_date, "$lte": end_date}}

    mydoc = mycol.find(myquery)

    #convert to dataframe
    df = pd.DataFrame(list(mydoc))

    #if the user has no defects in the date range, return an empty list
    if df.empty:
        return False
    else:
        #drop the _id column and User column
        df = df.drop(columns=['_id','User'])

        #convert the dataframe to json
        return df

