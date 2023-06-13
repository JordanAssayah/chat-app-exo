import { useState } from 'react'

import Message from '../../../components/Message'

const messages = [
  {
    id: 1,
    author: 'Leslie Alexander',
    content: 'Salut! Tu vas bien?',
    datetime: new Date()
  },
]

const Messages = () => {
  const [mouseHoverMessageId, setMouseHoverMessageId] = useState(undefined)

  return (
    <ul role="list">
      {messages.map((message) => (
        <Message
          key={`message-${message.id}`}
          message={message}
          mouseHoverMessageId={mouseHoverMessageId}
          setMouseHoverMessageId={setMouseHoverMessageId} />
      ))}
    </ul>
  )
}

export default Messages