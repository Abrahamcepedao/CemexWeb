import gensim
import matplotlib.pyplot as plt
from gensim.utils import simple_preprocess
import gensim.corpora as corpora
import nltk
from nltk.corpus import stopwords
from pprint import pprint
import pandas as pd
from functions.changeDateFormat import *
import os
#import all from functions cleaner
from .cleaner import *

nltk.download('stopwords')

def generateClustersLDA(df,number_topics):

    # Loop through the Rows
    for i,row in df.iterrows():
        #print the current row and how many rows are left
        print(i,df.shape[0]-i)
        data = str(row["Summary"]) + " " + str(row["Description"])
        # Clean the text
        data = cleanText(data)
        # Translate the text <-------------------------------------- TODO
        #data = translateText(data)
        
        # Add the data to the row
        df.loc[i,"Data"] = data
    

    # Load the regular expression library
    import re
    # Remove punctuation
    df['dataProcessed'] = \
    df['Data'].map(lambda x: re.sub('[,\.!?]', '', x))
    # Convert the titles to lowercase
    df['dataProcessed'] = \
    df['dataProcessed'].map(lambda x: x.lower())
    # Print out the first rows of df
    df['dataProcessed'].head()

    #get first value of Created column
    first_value = df["Created"].loc[df.index[0]]
    #check if lenght of Created values is equal to 13
    print("46 - first_value", first_value)
    if len(first_value) == 13 or len(first_value) == 14:
        print("48 - df created", df["Created"])
        #change all created to iso8601
        df["Created"] = df["Created"].apply(to_iso8601)


    #PREPARE DATA
    stop_words = stopwords.words('english')
    stop_words.extend(['from', 'subject', 're', 'edu', 'use'])
    def sent_to_words(sentences):
        for sentence in sentences:
            # deacc=True removes punctuations
            yield(gensim.utils.simple_preprocess(str(sentence), deacc=True))
    def remove_stopwords(texts):
        return [[word for word in simple_preprocess(str(doc)) 
                if word not in stop_words] for doc in texts]
    data = df.dataProcessed.values.tolist()
    data_words = list(sent_to_words(data))
    # remove stop words
    data_words = remove_stopwords(data_words)
    print(data_words[:1][0][:30])


    # Create Dictionary
    id2word = corpora.Dictionary(data_words)
    # Create Corpus
    texts = data_words
    # Term Document Frequency
    corpus = [id2word.doc2bow(text) for text in texts]
    # View
    print(corpus[:1][0][:30])


    #MODEL TRAINING
    
    # number of topics
    num_topics = number_topics
    # Build LDA model
    lda_model = gensim.models.LdaMulticore(corpus=corpus,id2word=id2word,num_topics=num_topics)

    # Print the Keyword in the 10 topics
    pprint(lda_model.print_topics())
    doc_lda = lda_model[corpus]

    pprint(doc_lda)
    #Top words for each topic
    print("Top word for each topic")
    top_words_per_topic = []
    for t in range(lda_model.num_topics):
        top_words_per_topic.extend([(t, ) + x for x in lda_model.show_topic(t, topn = 5)])

    wordsTopicDF = pd.DataFrame(top_words_per_topic, columns=['Topic', 'Word', 'P'])
    
    print(wordsTopicDF)


    sent_topics_df = pd.DataFrame()

    # Get main topic in each document
    for i, row in enumerate(lda_model[corpus]):
        row = sorted(row, key=lambda x: (x[1]), reverse=True)
        # Get the Dominant topic, Perc Contribution and Keywords for each document
        for j, (topic_num, prop_topic) in enumerate(row):
            if j == 0:  # => dominant topic
                wp = lda_model.show_topic(topic_num)
                topic_keywords = ", ".join([word for word, prop in wp])
                sent_topics_df = sent_topics_df.append(pd.Series([int(topic_num), round(prop_topic,4), topic_keywords]), ignore_index=True)
            else:
                break
    sent_topics_df.columns = ['Dominant_Topic', 'Perc_Contribution', 'Topic_Keywords']

    # Add original text to the end of the output
    contents = pd.Series(texts)
    sent_topics_df = pd.concat([sent_topics_df, contents], axis=1)

    # Format
    df_dominant_topic = sent_topics_df.reset_index()
    df_dominant_topic.columns = ['Document_No', 'Cluster', 'Topic_Perc_Contrib', 'Keywords', 'Text']
    # Show
    print(df_dominant_topic.head(10))
    #combine dataframes and save
    merged = df.merge(df_dominant_topic, left_index=True, right_index=True, how='inner')

    return merged