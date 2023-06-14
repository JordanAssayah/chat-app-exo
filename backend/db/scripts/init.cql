CREATE KEYSPACE IF NOT EXISTS chat WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : '1' };

CREATE TABLE chat.users (
  user_id UUID PRIMARY KEY,
  username TEXT,
  email TEXT,
  password TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE chat.channels (
  channel_id UUID PRIMARY KEY,
  name TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE INDEX ON chat.channels (name);

CREATE TABLE chat.channels_users (
  user_id UUID,
  channel_id UUID,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  PRIMARY KEY (user_id, channel_id)
);

CREATE TABLE chat.messages (
  message_id UUID PRIMARY KEY,
  text TEXT,
  sender_id UUID,
  channel_id UUID,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
);


INSERT INTO chat.channels (channel_id, name, created_at, updated_at) VALUES (now(), 'general', toTimestamp(now()), toTimestamp(now()));
