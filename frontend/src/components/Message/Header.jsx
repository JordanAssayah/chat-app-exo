import PropTypes from 'prop-types'
import dateFormat from 'date-fns/format'

import {
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const MessageHeader = ({
  user,
  message,
  mouseHoverMessageId,
  onDeleteMessage
}) => {
  return (
    <div className="flex items-center gap-x-3">
      <div className="bg-emerald-500/20 p-1">
        <div className="h-1 w-1 bg-emerald-500"></div>
      </div>
      <h2 className="capitalize text-xs font-semibold leading-6 text-white font-mono">
        {user.username}
      </h2>
      <p className='text-xs text-slate-300 font-mono'>
        {dateFormat(new Date(message.createdAt), 'dd/MM/yyyy HH:mm:ss')}
      </p>
      <span className={classNames(
        mouseHoverMessageId !== message._id && 'hidden',
        'isolate inline-flex rounded-md shadow-md absolute -top-3 right-0'
      )}>
        <button
          type="button"
          className="relative inline-flex items-center bg-slate-600 px-2 py-1 text-gray-400 ring-inset hover:bg-slate-700"
        >
          <span className="sr-only">Edit</span>
          <PencilIcon className="h-4 w-4" aria-hidden="true" />
        </button>
        <button
          onClick={onDeleteMessage}
          type="button"
          className="relative -ml-px inline-flex items-center bg-red-800 px-2 py-1 text-red-400 ring-inset hover:bg-red-900"
        >
          <span className="sr-only">Delete</span>
          <TrashIcon className="h-4 w-4" aria-hidden="true" />
        </button>
      </span>
    </div>
  )
}

MessageHeader.propTypes = {
  user: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired,
  mouseHoverMessageId: PropTypes.string,
  onDeleteMessage: PropTypes.func.isRequired,
}

export default MessageHeader