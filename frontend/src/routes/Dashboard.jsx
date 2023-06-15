import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

import ChatPrompt from '../features/chat/ChatPrompt'
import SideBar from '../components/SideBar'
import Header from '../components/Header'
import SocketIoConnector from '../components/SocketIoConnector'

const Dashboard = () => {
  const username = useSelector(state => state.auth.user.username)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <SocketIoConnector>
      <div className='w-full flex h-full lg:max-h-screen lg:h-screen'>
        <SideBar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

        <main className='bg-gray-800 w-full relative'>
          <Header setSidebarOpen={setSidebarOpen} username={username} />

          <div className='overflow-y-scroll messages-content-area py-4'>
            <Outlet />
          </div>

          <ChatPrompt />
        </main>
      </div>
    </SocketIoConnector> 
  )
}

export default Dashboard
