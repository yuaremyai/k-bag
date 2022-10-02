import jwt
import os
from dotenv import load_dotenv
from datetime import datetime, timezone, timedelta

load_dotenv()

def time_to_expire(t):
    return datetime.now(tz=timezone.utc) + timedelta(seconds=t)


def generate_access_token(payload, expiresIn=900):
    payload['exp'] = time_to_expire(expiresIn)
    access = jwt.encode(payload, os.environ.get('JWT_ACCESS_SECRET'), algorithm='HS256')
    return access

def generate_refresh_token(payload, expiresIn=604800):
    payload['exp'] = time_to_expire(expiresIn)
    refresh = jwt.encode(payload, os.environ.get('JWT_REFRESH_SECRET'), algorithm='HS256')
    return refresh


def decode_token(token, isAccess):
    try:
        if isAccess:
            return jwt.decode(token, os.environ.get('JWT_ACCESS_SECRET'), algorithms='HS256')
        else:
            return jwt.decode(token, os.environ.get('JWT_REFRESH_SECRET'), algorithms='HS256')
    except jwt.ExpiredSignatureError:
        return False
    except jwt.DecodeError:
        return False