import { useState, useContext } from 'react'
import { useSelector } from 'react-redux'

import Message from '../../../components/Message'

import { SocketIoContext } from '../../../utils/contexts'

const Messages = () => {
  const messages = useSelector(state => state.messages.entities)
  const socketIo = useContext(SocketIoContext)

  const [mouseHoverMessageId, setMouseHoverMessageId] = useState(undefined)

  return (
    <ul role="list">
      {Object.values(messages).map((message) => (
        <Message
          key={`message-${message.messageId}`}
          message={message}
          onDeleteMessage={() => socketIo.deleteMessage(message.messageId)}
          mouseHoverMessageId={mouseHoverMessageId}
          setMouseHoverMessageId={setMouseHoverMessageId} />
      ))}
    </ul>
  )
}

export default Messages