'use client';

import { useParams } from 'next/navigation';
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const Ask = () => {
  return (
    <div className='flex'>
    <div className="flex w-full overflow-hidden">
      <div className="bg-white text-gray-800 float-right rounded-md w-full block overflow-hidden border-b border-gray-300 leading-6 px-4 py-1">
        <div className="flex flex-row mt-1">
          <div className="w-8 h-8 mr-2">K</div>
          <div className="w-full overflow-hidden">
            <div>
              <p><span className="cursor-auto">How much money will I have in cash value by the age of 50?</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

const Response = () => {
  return (
    <div className="flex w-full overflow-hidden">
      <div className="bg-gray-100 text-gray-800 float-left rounded-md w-full block overflow-hidden border-b border-gray-300 leading-6 px-4 py-1">
        <div className="flex flex-row mt-1">
          <div className="w-8 h-8 mr-2">
            <img src="/logo.png" alt="Humata AI" className="rounded-full"/>
          </div>
          <div className="w-full overflow-hidden">
            <div className="flex flex-shrink-1 float-right text-lg items-center">
              {/* SVG icons go here */}
            </div>
            <div>
              <p><span className="cursor-auto">Apologies for the confusion. According to the provided supplemental illustration, at age 50, the cash value is projected to be $267,207 [5].</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AskInput = () => {
  return (
    <div className="flex m-5 relative">
      <div className="flex-grow mr-2 border border-gray-300 rounded-lg bg-white">
        <textarea 
          rows="1" 
          placeholder="Ask ..." 
          className="h-5 overflow-auto flex-grow font-light m-2 resize-none border-0 outline-none pt-1 pb-0"
        />
        <textarea 
          aria-hidden="true" 
          readOnly 
          tabIndex="-1" 
          className="invisible absolute overflow-auto h-0 top-0 left-0 transform flex-grow font-light m-2 resize-none border-0 outline-none pt-0 pb-0 w-96"
        />
      </div>
      <div className="flex justify-center items-center">
        <button 
          className="bg-blue-500 text-white rounded p-2" 
          tabIndex="0" 
          type="button" 
          aria-label="Send Message"
        >
          {/* SVG icon goes here */}
        </button>
      </div>
    </div>
  );
};

export default function Chat() {
  const params = useParams();
  console.log("params: ", params);
  const chatId = params?.id;

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="border-b border-gray-200 bg-white">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                  <div className="flex">
                    <div className="flex flex-shrink-0 items-center">
                      <h1>sage</h1>
                    </div>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:items-center">
                    <button
                      type="button"
                      className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={user.imageUrl}
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <a
                                  href={item.href}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  {item.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                  <div className="-mr-2 flex items-center sm:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="sm:hidden">
                <div className="space-y-1 pb-3 pt-2">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                          : "border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800",
                        "block border-l-4 py-2 pl-3 pr-4 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-gray-200 pb-3 pt-4">
                  <div className="flex items-center px-4">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">
                        {user.name}
                      </div>
                      <div className="text-sm font-medium text-gray-500">
                        {user.email}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="relative ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <div className="flex flex-row flex-grow w-screen h-full bg-white overflow-scroll">
          {/* Left pane */}
          <div className="w-[50vw]">
            <div className="flex flex-grow flex-col h-full overflow-hidden bg-[#F9FAFB] border-t border-[#D0D5DD]">
              <div className="flex bg-white m-2 w-11/12 items-center p-1 border border-gray-300">
                <div>
                  <button className="p-1" aria-label="Conversation History">
                    {/* SVG icon goes here */}
                  </button>
                </div>
                <div className="flex-grow flex justify-center">Ask Humata</div>
                <button className="p-1" aria-label="New Conversation">
                  {/* SVG icon goes here */}
                </button>
              </div>

              {/* Conversations Container */}
              <div className="flex flex-col flex-grow overflow-scroll">

                {/* messages container */}
                <div className="flex flex-grow flex-col overflow-scroll">
                  // Place Ask Component Here
                </div>
                {/* end of messages container */}

                {/* askInput component */}
                <AskInput />
                {/* end of askInput component */}
              </div>
            </div>
          </div>

          {/* Right pane */}
          <div className="w-[50vw]"></div>
        </div>
      </div>
    </>
  );
}