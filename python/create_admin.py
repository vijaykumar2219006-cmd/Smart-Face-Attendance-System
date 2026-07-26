from passlib.hash import bcrypt
from database import admins_collection

username = "admin"
password = "admin123"

existing = admins_collection.find_one({"username": username})

if existing:
    print("Admin already exists.")
else:
    hashed_password = bcrypt.hash(password)

    admins_collection.insert_one({
        "username": username,
        "password": hashed_password
    })

    print("Admin created successfully!")