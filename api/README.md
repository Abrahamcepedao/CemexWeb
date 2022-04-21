# **API**

API for Cemex Go defect clusterization with natural language processing techniques. The approach is to use BERT to estimate the ideal number of topics and LDA to clusterize based on the user topic target. The API also works as a way to store information, process it and as a login system for the front-end. The API allows users to analyze local data and historical data from the database. Thus, using the system as a way to find patterns and perform business intelligence.

## **To Do:**

- [x] BERT Topic Clusterization
- [x] LDA Topic Clusterization (with parameters No.Topics)
- [x] Connection to MongoDB
- [x] Upload data from CSV to database (with user that uploads it)

- [x] Login system
- [x] Access Tokens
- [x] Implement Access Token for clusterization and read/write db operations

- [x] Get defects general
- [x] Get defects by user

- [x] Get defects by date range by user
- [x] Get defects by date range general

- [x] Get defects by issue type by user
- [x] Get defects by issue type general

- [x] Get defects by issue type by date range by user
- [x] Get defects by issue type by date range general

- [x] Change filename to filename with timestamp

- [ ] Perform analysis for each get (json body indicates: none, default(BERT), #number(LDA) )

- [ ] Security for API (anti JSON bombing, inyection attacks, etc)
- [ ] Refactor code into folders based on functionalities


## **API Documentation**

Link: https://documenter.getpostman.com/view/15737721/Uyr7GJE3