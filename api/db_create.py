from app import db


if __name__ == "__main__":
    try:
        db.create_all()
    except Exception as e:
        print(e)
