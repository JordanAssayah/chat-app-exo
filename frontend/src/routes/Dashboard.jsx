import { useState } from 'react'
import { useSelector } from 'react-redux'

import ChatPrompt from '../features/chat/ChatPrompt'
import SideBar from '../components/SideBar'
import Header from '../components/Header'
import Messages from '../features/channels/messages/Messages'

const Chat = () => {
  const username = useSelector(state => state.auth.username)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className='w-full flex h-full lg:max-h-screen lg:h-screen'>
      <SideBar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

      <main className='bg-gray-800 w-full relative'>
        <Header setSidebarOpen={setSidebarOpen} username={username} />

        <div className='overflow-y-scroll messages-content-area py-4'>
          <Messages />
        </div>

        <ChatPrompt />
      </main>
    </div>
  )
}

export default Chat