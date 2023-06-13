import PropTypes from 'prop-types'

const MessageBody = ({ message }) => (
  <p className="text-sm leading-5 text-slate-300 text-justify">
    {message.content}
  </p>
)

MessageBody.propTypes = {
  message: PropTypes.object.isRequired,
}

export default MessageBody