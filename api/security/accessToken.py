import jwt
import datetime

secret_key = "b'(\xd6\x8e,\x07\xb5G>\xf7\xe3\xbb\xbc\xb0\xd8\x95\xf9\r\x88q\x86\xf8>\xfd\xe6'"

def encode_auth_token(user_id):
    """
    Generates the Auth Token
    :return: string
    """
    try:
        payload = {
            'public_id': str(user_id),
            'exp': datetime.datetime.utcnow()+datetime.timedelta(minutes=120)
        }
        return jwt.encode(
            payload,
            secret_key,
            algorithm='HS256'
        )
    except Exception as e:
        return e

def decode_auth_token(auth_token):
    """
    Decodes the auth token
    :param auth_token:
    :return: integer|string
    """
    try:
        payload = jwt.decode(auth_token,secret_key,algorithms=["HS256"])
        return payload['public_id']
    except jwt.ExpiredSignatureError:
        return 'Signature expired. Please log in again.'
    except jwt.InvalidTokenError:
        return 'Invalid token. Please log in again.'