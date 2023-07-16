import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const SideBar = ({
  sidebarOpen,
  setSidebarOpen
}) => {
  const channels = useSelector(state => state.channels.entities)

  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6">
                  <nav className="flex flex-1 flex-col pt-4">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <div className="text-xs font-semibold leading-6 text-gray-400">Channels</div>
                        <ul role="list" className="-mx-2 mt-4 space-y-1">
                          {Object.values(channels).map((channel) => (
                            <li key={channel.name}>
                              <Link
                                replace
                                to={channel.channel_id}
                                className={classNames(
                                  channel.current
                                    ? 'bg-gray-800 text-white'
                                    : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                  'group flex gap-x-3 rounded-md p-2 px-3 text-sm leading-6 font-semibold font-mono'
                                )}
                              >
                                <span className="truncate"># {channel.name}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:w-72">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col overflow-y-auto bg-gray-900 px-6">
          <nav className="flex flex-1 flex-col pt-4">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <div className="text-xs font-semibold leading-6 text-gray-400 capitalize">channels</div>
                <ul role="list" className="-mx-2 my-4 space-y-1">
                  {Object.values(channels).map((channel) => (
                    <li key={channel.name}>
                      <Link
                        replace
                        to={channel.channel_id}
                        className={classNames(
                          channel.current
                            ? 'bg-gray-800 text-white'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800',
                          'group flex gap-x-3 rounded-md p-2 px-3 text-sm leading-6 font-semibold font-mono'
                        )}
                      >
                        <span className="truncate"># {channel.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}

SideBar.propTypes = {
  sidebarOpen: PropTypes.bool.isRequired,
  setSidebarOpen: PropTypes.func.isRequired,
}

export default SideBar
