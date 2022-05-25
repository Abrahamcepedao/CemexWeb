
#create a function to change the date format from dd/mm/yyyy hh:mm to iso8601 format
from curses.ascii import isdigit


def to_iso8601(date):
    
    dd = date[0:2]
    mm = date[3:5]
    yyyy = date[6:8]
    if(len(date) == 13):
        hh = date[9:10]
        minutes = date[11:13]
    else:
        hh = date[9:11]
        minutes = date[12:14]

    new_date = "20" + yyyy + "-" + mm + "-" + dd + "T" + hh + ":" + minutes + ":00"

    return new_date


    #return str(datetime.datetime.strptime(date, '%d/%m/%Y %H:%M').isoformat())

#create a function to change the date format from iso8601 to dd/mm/yyyy hh:mm
def to_ddmmyyyy(date):
    import datetime
    result = str(datetime.datetime.strptime(date, '%Y-%m-%dT%H:%M:%S.%fZ').strftime('%d/%m/%Y %H:%M'))
    print(result)
    return result