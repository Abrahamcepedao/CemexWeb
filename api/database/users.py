import pymongo
from pymongo import MongoClient
from functions.auxiliary import *
from security.accessToken import *
from bson import ObjectId

def create_user(user,password):

  myclient = MongoClient("mongodb+srv://SeaWar741:CemexGo2022@cluster0.4glnz.mongodb.net")

  mydb = myclient["defectsCemex"]

  mycol = mydb["users"]

  #if user exists, return false
  if mycol.find_one({"user":user}):
    print("User already exists")
    return False

  #else, create user
  else:
    userData = {"user":user,"password": hash_password(password),"createdAt":get_current_date(),"UpdatedAt":get_current_date(),"accessToken":"","validUntil":get_current_date()}

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

    #generate access token
    access_token = encode_auth_token(user_id)

    #insert access token in database
    mycol.update_one({"_id":user_id},{"$set":{"accessToken":access_token,"UpdatedAt":get_current_date(), "validUntil":get_date_120_minutes_from_now()}})

    return True, access_token
  else:
    print("User does not exist or credentials are incorrect")
    return False

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
    else:
      print("User data is incorrect")
      return False
  else:
    print("User does not exist")
    return False

  
