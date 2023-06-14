import cassandra from 'cassandra-driver'

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
  keyspace: 'chat'
})

const mapper = new cassandra.mapping.Mapper(client, { 
  models: {
    'User': { tables: ['users'] },
    'Channel': { tables: ['channels'] },
    'ChannelUser': { tables: ['channels_users'] },
    'Message': { tables: ['messages'] },
  }
})

export const userMapper = mapper.forModel('User')
export const channelMapper = mapper.forModel('Channel')
export const channelUserMapper = mapper.forModel('ChannelUser')
export const messageMapper = mapper.forModel('Message')

client.connect()
  .then(async () => {
    console.log('Connected to the Cassandra cluster')
  })
  .catch((error) => {
    console.error('Error connecting to the Cassandra cluster', error);
  });

export default client
