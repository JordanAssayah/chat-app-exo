import React from 'react'
import PropTypes from 'prop-types'

import AuthForm from '../features/auth/AuthForm'

function Authentication() {
  return (
    <div className="flex min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm space-y-10">
        <div>
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Pick a username
          </h2>
        </div>
        <AuthForm />
      </div>
    </div>
  )
}

Authentication.propTypes = {}

export default Authentication
