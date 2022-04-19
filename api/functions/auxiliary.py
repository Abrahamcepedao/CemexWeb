#function to hash password in sha256 
def hash_password(password):
    import hashlib
    return str(hashlib.sha256(password.encode('utf-8')).hexdigest())

#current date in iso8601 format
def get_current_date():
    import datetime
    return str(datetime.datetime.now().isoformat())

#get date in 120 minutes from now
def get_date_120_minutes_from_now():
    import datetime
    return str(datetime.datetime.now() + datetime.timedelta(minutes=120))
    