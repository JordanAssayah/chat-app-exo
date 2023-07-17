import PropTypes from 'prop-types'
import parse from 'html-react-parser'

const MessageBody = ({ message }) => (
  <p className="text-sm leading-5 text-slate-300 text-justify">
    {parse(message.content)}
  </p>
)

MessageBody.propTypes = {
  message: PropTypes.object.isRequired,
}

export default MessageBody