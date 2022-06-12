import { Menu, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import {
  HiChevronDown,
  HiUserCircle,
  HiArrowLeft,
  HiOutlineCog,
  HiMenuAlt2
} from 'react-icons/hi';
import { useUser } from '@treelof/hooks';
import { getName } from '@treelof/utils';

interface Props {
  onOpenSidebar: () => void;
}

const Header: React.FC<Props> = ({ onOpenSidebar }) => {
  const { profile, signOut } = useUser();
  const router = useRouter();

  /* The dashboard dropdown menu */
  const _renderMenu = () => {
    return (
      <div className="w-56 text-right top-16">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex items-center justify-center px-4 py-1 text-sm font-medium text-white rounded-md hover:bg-green-700 transition-all">
              {/* profile icon */}
              <HiUserCircle className="w-7 h-7 mr-2" />
              {/* user's name */}
              {getName(profile)}
              <HiChevronDown
                className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-green-500 text-white' : 'text-gray-900'
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      onClick={() => router.push('/settings')}
                    >
                      <HiOutlineCog
                        className="w-4 h-4 mr-2"
                        aria-hidden="true"
                      />
                      Account Settings
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-green-500 text-white' : 'text-gray-900'
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      onClick={signOut}
                    >
                      <HiArrowLeft
                        className="w-4 h-4 mr-2"
                        aria-hidden="true"
                      />
                      Sign Out
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    );
  };

  return (
    <header className="w-full">
      <div className="relative z-20 flex-shrink-0 h-16 bg-primary-500 border-b border-gray-200 shadow-sm flex">
        <button
          type="button"
          className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
          onClick={onOpenSidebar}
        >
          <span className="sr-only">Open sidebar</span>
          <HiMenuAlt2 className="h-6 w-6 text-white" />
        </button>
        <div className="flex-1 flex justify-between px-4 sm:px-6">
          <div className="flex-1 flex">
            {/* <form className="w-full flex md:ml-0" action="#" method="GET">
              <label htmlFor="search-field" className="sr-only">
                Search all files
              </label>
              <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                  <svg
                    className="flex-shrink-0 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  name="search-field"
                  id="search-field"
                  className="h-full w-full border-transparent py-2 pl-8 pr-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400"
                  placeholder="Search"
                  type="search"
                />
              </div>
            </form> */}
          </div>
          <div className="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">
            {_renderMenu()}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
