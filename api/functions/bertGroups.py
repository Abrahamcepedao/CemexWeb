import pandas as pd

#import all from functions cleaner
from .cleaner import *
#import all from clusters
from .clusters import *

def parseCSV(filePath):
    # CVS Column Names
    col_names = ["Issue","key","Status","Priority","Custom field (Severity)","Project key","Issue Type","Created","Assignee","Custom field (Digital Service)","Summary","Description","Data"]
    # Use Pandas to parse the CSV file
    csvData = pd.read_csv(filePath,names=col_names, header=None)

    # Loop through the Rows
    for i,row in csvData.iterrows():
        #print the current row and how many rows are left
        print(i,csvData.shape[0]-i)
        data = str(row["Summary"]) + " " + str(row["Description"])
        # Clean the text
        data = cleanText(data)
        # Translate the text <-------------------------------------- TODO
        #data = translateText(data)
        
        # Add the data to the row
        csvData.loc[i,"Data"] = data

        

    #convert column of data to a list
    dataList = csvData["Data"].tolist()
    topics, probabilities = generateClusters(dataList)
    #add the column of clusters to the dataframe
    csvData["Cluster"] = topics


    #convert the dataframe to a json object and return it
    return csvData.to_json(orient='records')