import sys
sys.path.append("..") 

from .accessToken import decode_auth_token
from database.users import validate_userID

#function to check if user is logged in
def validateUser(username, access_token):

    user_id = decode_auth_token(access_token)
    print(user_id)

    #check if the access token is valid and if the user exists
    try:
        if  validate_userID(decode_auth_token(access_token), username):
            return True
        else:
            return False
    except:
        return False



