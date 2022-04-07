from bertopic import BERTopic

def generateClusters(docs):
    topic_model = BERTopic(language="multilingual", calculate_probabilities=True, verbose=True)
    topics, probs = topic_model.fit_transform(docs)
    return topics , probs