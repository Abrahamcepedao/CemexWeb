from textblob import TextBlob
from deep_translator import (GoogleTranslator,MyMemoryTranslator)
import re
import string
import preprocessor as p

def remove_punct(text):
    text  = "".join([char for char in text if char not in string.punctuation])
    text = re.sub('[0-9]+', '', text)
    return text

def cleanText(txt):
    txt = p.clean(txt)
    txt = remove_punct(txt).lower()
    return txt

def translateText(txt):
    try:
        translated = GoogleTranslator(source='auto', target='en').translate(txt)
        translated = TextBlob(translated).correct()
    except:
        translated = MyMemoryTranslator(source='auto', target='en').translate(txt)
        translated = TextBlob(translated).correct()
    return str(translated)

