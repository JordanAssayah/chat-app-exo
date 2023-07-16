import { useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setMessage } from './chatSlice'

import { SocketIoContext } from '../../utils/contexts'

const ChatPrompt = () => {
  const message = useSelector(state => state.chat.message)
  const dispatch = useDispatch()
  const socketIo = useContext(SocketIoContext)

  return (
    <div className='bg-gray-800 pb-2 px-4 h-24 absolute w-full right-0 left-0 bottom-0'>
      <div className="overflow-hidden h-20 rounded-lg border border-gray-900 shadow-sm focus-within:border-gray-600 focus-within:ring-0.5 focus-within:ring-gray-600">
        <label htmlFor="message" className="sr-only">
          Message
        </label>
        <textarea
          rows={1}
          name="message"
          id="message"
          value={message}
          onChange={evt => dispatch(setMessage(evt.target.value))}
          onKeyUp={evt => {
            if (evt.key === 'Enter' && evt.shiftKey === true) {
              socketIo.sendMessage(message)
              dispatch(setMessage(''))
            }
          }}
          className="block w-full rounded-md resize-none h-20 border-0 py-1.5 bg-gray-800 text-slate-300 placeholder:text-gray-400 focus:ring-0 text-sm sm:leading-6"
          placeholder="Write a message... Press [shift + enter] to send it"
        />
      </div>
    </div>
  )
}

export default ChatPrompt