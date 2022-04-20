import sys
sys.path.append("..") 


import pandas as pd
from database.savedata import *


#import all from ldaclusters
from .lda import *

def parseCSVLDA(filePath, number_topics):

    # CVS Column Names
    col_names = ["Issue key","Status","Priority","Custom field (Severity)","Project key","Issue Type","Created","Assignee","Custom field (Digital Service)","Summary","Description","Data"]
    # Use Pandas to parse the CSV file
    csvData = pd.read_csv(filePath,names=col_names, header=None)

    #insert csvData into database
    print("inserting data into database")
    create_data_defects(csvData)
    print("Starting clustering")
    
    dataframeClusters = generateClustersLDA(csvData,number_topics)

    #drop first row (header)
    dataframeClusters = dataframeClusters.drop(dataframeClusters.index[0])

    #convert the dataframe to a json object and return it
    return dataframeClusters.to_json(orient='records')