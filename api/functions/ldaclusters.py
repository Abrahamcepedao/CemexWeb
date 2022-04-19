import pandas as pd

#import all from ldaclusters
from .lda import *

def parseCSVLDA(filePath, number_topics):

    # CVS Column Names
    col_names = ["Issue","key","Status","Priority","Custom field (Severity)","Project key","Issue Type","Created","Assignee","Custom field (Digital Service)","Summary","Description","Data"]
    # Use Pandas to parse the CSV file
    csvData = pd.read_csv(filePath,names=col_names, header=None)

    
    dataframeClusters = generateClustersLDA(csvData,number_topics)


    #convert the dataframe to a json object and return it
    return dataframeClusters.to_json(orient='records')