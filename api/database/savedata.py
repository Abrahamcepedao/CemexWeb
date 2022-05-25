import pymongo
from pymongo import MongoClient
from functions.auxiliary import *
from security.accessToken import *
from functions.auxiliary import *
from functions.changeDateFormat import *
import pandas as pd



def create_data_defects(df):
    myclient = MongoClient("mongodb+srv://SeaWar741:CemexGo2022@cluster0.4glnz.mongodb.net")

    mydb = myclient["defectsCemex"]

    mycol = mydb["defects"]

    #drop frist row (header)
    df = df.drop(df.index[0])
    #drop Data column
    df = df.drop(columns=["Data"])
    
    #get first value of Created column
    first_value = df["Created"].loc[df.index[0]]
    #check if lenght of Created values is equal to 13
    if len(first_value) == 13 or len(first_value) == 14:
        #change all created to iso8601
        df["Created"] = df["Created"].apply(to_iso8601)
    
    #check if the issue already exists in the database
    for index, row in df.iterrows():
        if mycol.find_one({"Issue key":row['Issue key']}):
            #print issue key already exists
            print(row['Issue key'] + " already exists")
        else:
            #insert the issue
            x = mycol.insert_one(row.to_dict())

    return True
