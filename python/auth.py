import jwt
from functools import wraps
from flask import request, jsonify

from config import SECRET_KEY, JWT_ALGORITHM


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):

        auth_header = request.headers.get("Authorization")

        auth_header = request.headers.get("Authorization")
        print(auth_header)

        if not auth_header:
            return jsonify({
                "success": False,
                "message": "Token is missing."
            }), 401

        try:
            token = auth_header.split(" ")[1]

        except IndexError:
            return jsonify({
                "success": False,
                "message": "Invalid Authorization header."
            }), 401

        try:
            jwt.decode(
                token,
                SECRET_KEY,
                algorithms=[JWT_ALGORITHM]
            )

        except jwt.ExpiredSignatureError:
            return jsonify({
                "success": False,
                "message": "Token has expired."
            }), 401

        except jwt.InvalidTokenError:
            return jsonify({
                "success": False,
                "message": "Invalid token."
            }), 401

        return f(*args, **kwargs)

    return decorated