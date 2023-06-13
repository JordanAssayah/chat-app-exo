import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUserName } from './authSlice'

const AuthForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const onSubmitForm = (evt) => {
    evt.preventDefault()
    dispatch(setUserName(evt.target.username.value))
    navigate('/dashboard')
  }

  return (
    <form className="space-y-6" onSubmit={onSubmitForm}>
      <div>
        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
          Username
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="username"
            id="username"
            autoComplete="username"
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Start to chat
        </button>
      </div>
    </form>
  )
}

export default AuthForm
