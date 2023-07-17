db = db.getSiblingDB('chat_app');

db.createCollection('users');
db.createCollection('channels');
db.createCollection('messages');