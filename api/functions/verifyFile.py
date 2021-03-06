import pandas as pd
import os

#function to verify if the file is a csv and has the following columns 
#"Issue key","Status","Priority","Custom field (Severity)","Project key","Issue Type","Created","Assignee","Custom field (Digital Service)","Summary","Description" 
def verifyFile(filePath):
    #check if the file is a csv
    if filePath.endswith(".csv"):
        print("valid .csv")
        # CVS Column Names
        col_names = ["Issue key","Status","Priority","Custom field (Severity)","Project key","Issue Type","Created","Assignee","Custom field (Digital Service)","Summary","Description"]
        # read csv file
        df = pd.read_csv(filePath)
        #first row of the csv file to array
        first_row = df.columns

        #check if lengths are equal
        if len(first_row) == len(col_names):
            #checks if the column names are the same and if the file has more than one row  
            flag = True
            for i in range(len(first_row)):
                if first_row[i] != col_names[i]:
                    flag = False

            if flag and len(df) > 1:
                return True
            else:
                #delete the file
                os.remove(filePath)
                return False
        else:
            #delete the file
            os.remove(filePath)
            return False
    else:
        #delete the file
        os.remove(filePath)
        return False