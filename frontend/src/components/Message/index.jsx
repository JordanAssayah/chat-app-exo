import PropTypes from 'prop-types'
import MessageHeader from './Header'
import MessageBody from './Body'

const Message = ({
  user,
  message,
  mouseHoverMessageId,
  setMouseHoverMessageId,
  onDeleteMessage,
}) => {
  return (
    <li
      className="flex justify-between gap-x-6 pt-1 pb-2 px-6 hover:bg-slate-700/40"
      onMouseEnter={() => setMouseHoverMessageId(message._id)}
      onMouseLeave={() => setMouseHoverMessageId(undefined)}
    >
      <div className="w-full relative">
        <MessageHeader
          user={user}
          message={message}
          mouseHoverMessageId={mouseHoverMessageId}
          onDeleteMessage={onDeleteMessage}
        />
        <MessageBody message={message} />
      </div>
    </li>
  )
}

Message.propTypes = {
  user: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired,
  mouseHoverMessageId: PropTypes.string,
  setMouseHoverMessageId: PropTypes.func.isRequired,
  onDeleteMessage: PropTypes.func.isRequired,
}

export default Message