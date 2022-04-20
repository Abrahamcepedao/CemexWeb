
#create a function to change the date format from dd/mm/yyyy hh:mm to iso8601 format
def to_iso8601(date):
    import datetime
    return str(datetime.datetime.strptime(date, '%d/%m/%Y %H:%M').isoformat())

#create a function to change the date format from iso8601 to dd/mm/yyyy hh:mm
def to_ddmmyyyy(date):
    import datetime
    result = str(datetime.datetime.strptime(date, '%Y-%m-%dT%H:%M:%S.%fZ').strftime('%d/%m/%Y %H:%M'))
    print(result)
    return result