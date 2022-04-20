import pymongo
from pymongo import MongoClient
from functions.auxiliary import *
from security.accessToken import *
from functions.auxiliary import *
from functions.changeDateFormat import *
import pandas as pd

#retrieve all defects 
def retrieve_all_defects():
    myclient = MongoClient("mongodb+srv://SeaWar741:CemexGo2022@cluster0.4glnz.mongodb.net")

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
        return df.to_json(orient='records')



#retrieve defects uploaded by a user
def retrieve_user_defects(user):
    myclient = MongoClient("mongodb+srv://SeaWar741:CemexGo2022@cluster0.4glnz.mongodb.net")

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
        return df.to_json(orient='records')


#retrieve defects uploaded by a user in a specific date range
def retrieve_user_defects_date_range(user, start_date, end_date):
    myclient = MongoClient("mongodb+srv://SeaWar741:CemexGo2022@cluster0.4glnz.mongodb.net")

    mydb = myclient["defectsCemex"]

    mycol = mydb["defects"]

    #change the date format from iso8601 to dd/mm/yyyy hh:mm
    start_date = to_ddmmyyyy(start_date)
    end_date = to_ddmmyyyy(end_date)

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
        return df.to_json(orient='records')

