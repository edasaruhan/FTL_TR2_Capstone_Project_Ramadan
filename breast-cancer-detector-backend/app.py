from flask import Flask, jsonify
from flask_restful import Api, Resource, reqparse
from sqlalchemy import create_engine, exc
from sqlalchemy.orm import sessionmaker
from models import Base, User, HealthRecord  # Adjust as per your models file

# Database configuration
DB_URL = 'sqlite:///database.db'  # Example SQLite database URL
engine = create_engine(DB_URL)
Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)
session = Session()

# Flask setup
app = Flask(__name__)
api = Api(app)

# Sample endpoint to check if API is running
class HelloWorld(Resource):
    def get(self):
        return {'message': 'Hello, World!'}

api.add_resource(HelloWorld, '/')

# User Resource for CRUD operations
class UserResource(Resource):
    def get(self, user_id):
        user = session.query(User).filter_by(id=user_id).first()
        if not user:
            return {'message': 'User not found'}, 404
        return {'id': user.id, 'username': user.username, 'email': user.email}

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('username', type=str, required=True, help='Username is required')
        parser.add_argument('email', type=str, required=True, help='Email is required')
        parser.add_argument('password', type=str, required=True, help='Password is required')
        args = parser.parse_args()

        new_user = User(username=args['username'], email=args['email'], password_hash=args['password'])
        session.add(new_user)
        try:
            session.commit()
        except exc.IntegrityError:
            session.rollback()
            return {'message': 'Username or email already exists'}, 400
        return {'id': new_user.id, 'username': new_user.username, 'email': new_user.email}, 201

    def put(self, user_id):
        parser = reqparse.RequestParser()
        parser.add_argument('username', type=str)
        parser.add_argument('email', type=str)
        args = parser.parse_args()

        user = session.query(User).filter_by(id=user_id).first()
        if not user:
            return {'message': 'User not found'}, 404

        if args['username']:
            user.username = args['username']
        if args['email']:
            user.email = args['email']

        session.commit()
        return {'id': user.id, 'username': user.username, 'email': user.email}

    def delete(self, user_id):
        user = session.query(User).filter_by(id=user_id).first()
        if not user:
            return {'message': 'User not found'}, 404

        session.delete(user)
        session.commit()
        return {'message': 'User deleted'}, 200

api.add_resource(UserResource, '/users', '/users/<int:user_id>')

# Endpoint to fetch all users
class AllUsers(Resource):
    def get(self):
        users = session.query(User).all()
        users_list = [{'id': user.id, 'username': user.username, 'email': user.email} for user in users]
        return jsonify(users_list)

api.add_resource(AllUsers, '/all_users')

if __name__ == '__main__':
    app.run(debug=True)
