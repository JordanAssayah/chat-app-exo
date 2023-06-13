import PropTypes from 'prop-types'
import MessageHeader from './Header'
import MessageBody from './Body'

const Message = ({
  message,
  mouseHoverMessageId,
  setMouseHoverMessageId,
}) => {
  return (
    <li
      className="flex justify-between gap-x-6 pt-1 pb-2 px-6 hover:bg-slate-700/40"
      onMouseEnter={() => setMouseHoverMessageId(message.id)}
      onMouseLeave={() => setMouseHoverMessageId(undefined)}
    >
      <div className="w-full relative">
        <MessageHeader message={message} mouseHoverMessageId={mouseHoverMessageId} />
        <MessageBody message={message} />
      </div>
    </li>
  )
}

Message.propTypes = {
  message: PropTypes.object.isRequired,
  mouseHoverMessageId: PropTypes.number,
  setMouseHoverMessageId: PropTypes.func.isRequired,
}

export default Message