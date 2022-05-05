import pymongo
from pymongo import MongoClient
from functions.auxiliary import *
from security.accessToken import *
from bson import ObjectId
import pandas as pd

def create_user(user,password, role):

  myclient = MongoClient("mongodb+srv://SeaWar741:CemexGo2022@cluster0.4glnz.mongodb.net")

  mydb = myclient["defectsCemex"]

  mycol = mydb["users"]

  #if user exists, return false
  if mycol.find_one({"user":user}):
    print("User already exists")
    return False

  #else, create user
  else:
    userData = {"user":user,"password": hash_password(password),"createdAt":get_current_date(),"UpdatedAt":get_current_date(),"accessToken":"","validUntil":get_current_date(),"type":role}

    x = mycol.insert_one(userData)

    print(x.inserted_id)
    return True

#login user
def login_user(user,password):
  myclient = MongoClient("mongodb+srv://SeaWar741:CemexGo2022@cluster0.4glnz.mongodb.net")

  mydb = myclient["defectsCemex"]

  mycol = mydb["users"]

  #check if credentials are correct
  if mycol.find_one({"user":user,"password":hash_password(password)}):
    print("User exists")

    #get user id
    user_id = mycol.find_one({"user":user,"password":hash_password(password)})['_id']

    #get user type/role
    user_role = mycol.find_one({"_id":user_id})['type']

    #generate access token
    access_token = encode_auth_token(user_id)

    #generate valid until 120 minutes from now
    valid_until = get_date_120_minutes_from_now()

    #insert access token in database
    mycol.update_one({"_id":user_id},{"$set":{"accessToken":access_token,"UpdatedAt":get_current_date(), "validUntil": valid_until}})

    #return true, access token, valid until and user type/role
    return True, access_token, valid_until, user_role
  else:
    print("User does not exist or credentials are incorrect")
    return False, ""

#validate username with user_id and username
def validate_userID(user_id,username):
  myclient = MongoClient("mongodb+srv://SeaWar741:CemexGo2022@cluster0.4glnz.mongodb.net")

  mydb = myclient["defectsCemex"]

  mycol = mydb["users"]

  #check if user exists
  if mycol.find_one({"_id":ObjectId(user_id)}):
    #check if username is correct
    if mycol.find_one({"_id":ObjectId(user_id),"user":username}):
      print("User name is correct")
      return True
    #check if user_id is admin
    elif mycol.find_one({"_id":ObjectId(user_id),"type":"admin"}):
      print("User is admin")
      return True
    else:
      print("User data is incorrect")
      return False
  else:
    print("User does not exist")
    return False

#change password of user
def change_password(username, new_password):
  myclient = MongoClient("mongodb+srv://SeaWar741:CemexGo2022@cluster0.4glnz.mongodb.net")

  mydb = myclient["defectsCemex"]

  mycol = mydb["users"]

  #check if user exists
  if mycol.find_one({"user":username}):
      #get user id
      user_id = mycol.find_one({"user":username})['_id']

      #update password
      mycol.update_one({"_id":user_id},{"$set":{"password":hash_password(new_password),"UpdatedAt":get_current_date()}})
      
      print("Password changed")

      return True
  else:
    print("User does not exist")
    return False

#get all users
def get_all_users():
  myclient = MongoClient("mongodb+srv://SeaWar741:CemexGo2022@cluster0.4glnz.mongodb.net")

  mydb = myclient["defectsCemex"]

  mycol = mydb["users"]

  #get all defects
  mydoc = mycol.find()

  #convert to dataframe
  df = pd.DataFrame(list(mydoc))

  #if the database is empty, return an empty list
  if df.empty:
      return False
  else:
      #drop the _id column and User column
      df = df.drop(columns=['_id', 'UpdatedAt', 'accessToken', 'validUntil', 'password'])

      #convert the dataframe to json
      return df
