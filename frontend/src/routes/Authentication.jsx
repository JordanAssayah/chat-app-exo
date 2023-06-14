import AuthForm from '../features/auth/AuthForm'

import SocketIoConnector from '../components/SocketIoConnector'

function Authentication() {
  return (
    <SocketIoConnector>
      <div className="flex min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm space-y-10">
          <div>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Pick a username
            </h2>
          </div>
          <AuthForm />
        </div>
      </div>
    </SocketIoConnector>
  )
}

Authentication.propTypes = {}

export default Authentication
