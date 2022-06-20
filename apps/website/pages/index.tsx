import { Transition } from '@headlessui/react';
import { TreelofIcon } from '@treelof/components';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import {
  HiOutlineCloud,
  HiOutlineLibrary,
  HiOutlineMenu,
  HiOutlinePencil,
  HiOutlineX
} from 'react-icons/hi';

const pages: Array<{ label: string; url: string; icon: JSX.Element }> = [
  {
    label: 'Wiki',
    url: '/wiki',
    icon: <HiOutlineLibrary className="h-6 w-6" />
  },
  { label: 'API', url: '/docs', icon: <HiOutlineCloud className="h-6 w-6" /> },
  {
    label: 'Planner',
    url: `${process.env.NEXT_PUBLIC_APP_PAGE}/planner`,
    icon: <HiOutlinePencil className="h-6 w-6" />
  }
];

const Home: NextPage = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  return (
    <>
      <Head>
        <title>Treelof</title>
      </Head>
      <div className="bg-white">
        <header>
          <div className="relative bg-white">
            <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-6 sm:px-6 md:justify-start md:space-x-10 lg:px-8">
              <div className="flex justify-start lg:w-0 lg:flex-1">
                <a className="flex flex-row items-center" href="#">
                  {/* app logo */}
                  <TreelofIcon width={50} height={50} />
                  <span className="text-primary-600 text-3xl ml-3 logo">
                    treelof
                  </span>
                </a>
              </div>
              {/* open menu button */}
              <div className="-mr-2 -my-2 md:hidden">
                <button
                  type="button"
                  className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                  aria-expanded="false"
                  onClick={() => setShowMobileMenu(true)}
                >
                  <span className="sr-only">Open menu</span>
                  <HiOutlineMenu className="h-6 w-6" />
                </button>
              </div>
              <nav className="hidden md:flex space-x-10">
                {/* available pages */}
                {pages.map((page) => (
                  <Link key={page.url} href={page.url}>
                    <a className="text-base font-medium text-gray-500 hover:text-gray-900">
                      {page.label}
                    </a>
                  </Link>
                ))}
              </nav>
              <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                <Link href="/login">
                  <a className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                    Sign in
                  </a>
                </Link>
                <a
                  href={`${process.env.NEXT_PUBLIC_APP_PAGE}?sign-up=true`}
                  className="ml-8 whitespace-nowrap inline-flex items-center justify-center bg-gradient-to-r from-lightGreen-600 to-green-600 bg-origin-border px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:from-lightGreen-700 hover:to-green-700"
                >
                  Sign up
                </a>
              </div>
            </div>

            {/* Mobile menu, show/hide based on mobile menu state. */}
            <Transition
              appear
              unmount
              show={showMobileMenu}
              as={React.Fragment}
              enter="duration-200 ease-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="duration-100 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {/* mobile menu */}
              <div className="absolute z-30 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
                <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                  <div className="pt-5 pb-6 px-5">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-row items-center">
                        <TreelofIcon width={40} height={40} />
                        <span className="text-primary-600 text-2xl ml-3 logo">
                          treelof
                        </span>
                      </div>
                      <div className="-mr-2">
                        <button
                          type="button"
                          className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
                          onClick={() => setShowMobileMenu(false)}
                        >
                          <span className="sr-only">Close menu</span>
                          <HiOutlineX className="h-6 w-6" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-6">
                      <nav className="grid grid-cols-1 gap-7">
                        {/* available pages */}
                        {pages.map((page) => (
                          <Link key={page.url} href={page.url}>
                            <a className="-m-3 p-3 flex items-center rounded-lg hover:bg-gray-50">
                              <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-gradient-to-r from-lightGreen-600 to-green-600 text-white">
                                {page.icon}
                              </div>
                              <div className="ml-4 text-base font-medium text-gray-900">
                                {page.label}
                              </div>
                            </a>
                          </Link>
                        ))}
                      </nav>
                    </div>
                  </div>
                  <div className="py-6 px-5">
                    <div className="mt-6">
                      <Link href="/login?sign-up=true">
                        <a className="w-full flex items-center justify-center bg-gradient-to-r from-lightGreen-600 to-green-600 bg-origin-border px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:from-lightGreen-700 hover:to-green-700">
                          Sign up
                        </a>
                      </Link>
                      <p className="mt-6 text-center text-base font-medium text-gray-500">
                        Existing customer?
                        <Link href="/login">
                          <a className="text-secondary-900 ml-3">Sign in</a>
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </header>

        <main>
          {/* Hero section */}
          <div className="relative">
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100"></div>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
                <div className="absolute inset-0">
                  <Image
                    src="/images/trees.jpg"
                    layout="fill"
                    objectFit="cover"
                    alt="trees"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-lightGreen-800 to-green-700 mix-blend-multiply"></div>
                </div>
                <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                  <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                    <span className="block text-white">Build your</span>
                    <span className="block text-green-200">ecosystem</span>
                  </h1>
                  <p className="mt-6 max-w-lg mx-auto text-center text-xl text-white sm:max-w-3xl">
                    Making information about plants, soil and fungi more
                    accessible
                  </p>
                  <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                    <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                      <Link href="/wiki">
                        <a className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-green-700 bg-white hover:bg-green-50 sm:px-8">
                          Search wiki
                        </a>
                      </Link>
                      <Link href="/docs">
                        <a className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-500 hover:bg-primary-600 sm:px-8">
                          View API docs
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Alternating Feature Sections */}
          <div className="relative pt-16 pb-32 overflow-hidden">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-gray-100"
            ></div>
            {/* wiki section */}
            <div className="relative">
              <div className="relative lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
                <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
                  <div>
                    <div>
                      <span className="h-12 w-12 rounded-md flex items-center justify-center bg-gradient-to-r from-lightGreen-600 to-green-600">
                        <HiOutlineLibrary className="h-6 w-6 text-white" />
                      </span>
                    </div>
                    <div className="mt-6">
                      <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                        Search & learn
                      </h2>
                      <p className="mt-4 text-lg text-gray-500">
                        Get access to all of the wiki&apos;s information through
                        our public API. Be empowered to build your own solutions
                        to your ecosystem&apos;s needs from a wealth of
                        information.
                      </p>
                      <div className="mt-6">
                        <Link href="/wiki">
                          <a className="inline-flex bg-gradient-to-r from-secondary-500 to-secondary-600 bg-origin-border px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white hover:from-secondary-600 hover:to-secondary-700">
                            Start searching
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-12 sm:mt-16 lg:mt-0">
                  <div className="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
                    <img
                      className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                      src="https://tailwindui.com/img/component-images/inbox-app-screenshot-1.jpg"
                      alt="Inbox user interface"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* planner section */}
            <div className="mt-24">
              <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
                <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-32 lg:max-w-none lg:mx-0 lg:px-0 lg:col-start-2">
                  <div>
                    <div>
                      <span className="h-12 w-12 rounded-md flex items-center justify-center bg-gradient-to-r from-lightGreen-600 to-green-600">
                        <HiOutlinePencil className="h-6 w-6 text-white" />
                      </span>
                    </div>
                    <div className="mt-6">
                      <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                        Plan for success
                      </h2>
                      <p className="mt-4 text-lg text-gray-500">
                        Get access to all of the wiki&apos;s information through
                        our public API. Be empowered to build your own solutions
                        to your ecosystem&apos;s needs from a wealth of
                        information.
                      </p>
                      <div className="mt-6">
                        <Link
                          href={`${process.env.NEXT_PUBLIC_APP_PAGE}/planner`}
                        >
                          <a className="inline-flex bg-gradient-to-r from-secondary-500 to-secondary-600 bg-origin-border px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white hover:from-secondary-600 hover:to-secondary-700">
                            Use Planner
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-12 sm:mt-16 lg:mt-0 lg:col-start-1">
                  <div className="pr-4 -ml-48 sm:pr-6 md:-ml-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
                    <img
                      className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
                      src="/images/api-docs-full.png"
                      alt="Customer profile user interface"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* api section */}
            <div className="mt-24">
              <div className="relative lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
                <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
                  <div>
                    <div>
                      <span className="h-12 w-12 rounded-md flex items-center justify-center bg-gradient-to-r from-lightGreen-600 to-green-600">
                        <HiOutlineCloud className="h-6 w-6 text-white" />
                      </span>
                    </div>
                    <div className="mt-6">
                      <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                        Innovate like never before
                      </h2>
                      <p className="mt-4 text-lg text-gray-500">
                        Get access to all of the wiki&apos;s information through
                        our public API. Be empowered to build your own solutions
                        to your ecosystem&apos;s needs from a wealth of
                        information.
                      </p>
                      <div className="mt-6">
                        <Link href="/docs">
                          <a className="inline-flex bg-gradient-to-r from-secondary-500 to-secondary-600 bg-origin-border px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white hover:from-secondary-600 hover:to-secondary-700">
                            View docs
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-12 sm:mt-16 lg:mt-0">
                  <div className="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
                    <img
                      className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
                      src="/images/api-docs-full.png"
                      alt="Customer profile user interface"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Gradient Feature Section */}
          <div className="bg-gradient-to-r from-lightGreen-800 to-green-700">
            <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 sm:pt-20 sm:pb-24 lg:max-w-7xl lg:pt-24 lg:px-8">
              <h2 className="text-3xl font-extrabold text-white tracking-tight">
                Inbox support built for efficiency
              </h2>
              <p className="mt-4 max-w-3xl text-lg text-lightGreen-200">
                Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus.
                Et magna sit morbi lobortis. Blandit aliquam sit nisl euismod
                mattis in.
              </p>
              <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-16">
                <div>
                  <div>
                    <span className="flex items-center justify-center h-12 w-12 rounded-md bg-white bg-opacity-10">
                      {/* Heroicon name: outline/inbox */}
                      <svg
                        className="h-6 w-6 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-white">
                      Unlimited Inboxes
                    </h3>
                    <p className="mt-2 text-base text-lightGreen-200">
                      Ac tincidunt sapien vehicula erat auctor pellentesque
                      rhoncus. Et magna sit morbi lobortis.
                    </p>
                  </div>
                </div>

                <div>
                  <div>
                    <span className="flex items-center justify-center h-12 w-12 rounded-md bg-white bg-opacity-10">
                      {/* Heroicon name: outline/users */}
                      <svg
                        className="h-6 w-6 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-white">
                      Manage Team Members
                    </h3>
                    <p className="mt-2 text-base text-lightGreen-200">
                      Ac tincidunt sapien vehicula erat auctor pellentesque
                      rhoncus. Et magna sit morbi lobortis.
                    </p>
                  </div>
                </div>

                <div>
                  <div>
                    <span className="flex items-center justify-center h-12 w-12 rounded-md bg-white bg-opacity-10">
                      {/* Heroicon name: outline/trash */}
                      <svg
                        className="h-6 w-6 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-white">
                      Spam Report
                    </h3>
                    <p className="mt-2 text-base text-lightGreen-200">
                      Ac tincidunt sapien vehicula erat auctor pellentesque
                      rhoncus. Et magna sit morbi lobortis.
                    </p>
                  </div>
                </div>

                <div>
                  <div>
                    <span className="flex items-center justify-center h-12 w-12 rounded-md bg-white bg-opacity-10">
                      {/* Heroicon name: outline/pencil-alt */}
                      <svg
                        className="h-6 w-6 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-white">
                      Compose in Markdown
                    </h3>
                    <p className="mt-2 text-base text-lightGreen-200">
                      Ac tincidunt sapien vehicula erat auctor pellentesque
                      rhoncus. Et magna sit morbi lobortis.
                    </p>
                  </div>
                </div>

                <div>
                  <div>
                    <span className="flex items-center justify-center h-12 w-12 rounded-md bg-white bg-opacity-10">
                      {/* Heroicon name: outline/document-report */}
                      <svg
                        className="h-6 w-6 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-white">
                      Team Reporting
                    </h3>
                    <p className="mt-2 text-base text-lightGreen-200">
                      Ac tincidunt sapien vehicula erat auctor pellentesque
                      rhoncus. Et magna sit morbi lobortis.
                    </p>
                  </div>
                </div>

                <div>
                  <div>
                    <span className="flex items-center justify-center h-12 w-12 rounded-md bg-white bg-opacity-10">
                      {/* Heroicon name: outline/reply */}
                      <svg
                        className="h-6 w-6 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-white">
                      Saved Replies
                    </h3>
                    <p className="mt-2 text-base text-lightGreen-200">
                      Ac tincidunt sapien vehicula erat auctor pellentesque
                      rhoncus. Et magna sit morbi lobortis.
                    </p>
                  </div>
                </div>

                <div>
                  <div>
                    <span className="flex items-center justify-center h-12 w-12 rounded-md bg-white bg-opacity-10">
                      {/* Heroicon name: outline/chat-alt */}
                      <svg
                        className="h-6 w-6 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-white">
                      Email Commenting
                    </h3>
                    <p className="mt-2 text-base text-lightGreen-200">
                      Ac tincidunt sapien vehicula erat auctor pellentesque
                      rhoncus. Et magna sit morbi lobortis.
                    </p>
                  </div>
                </div>

                <div>
                  <div>
                    <span className="flex items-center justify-center h-12 w-12 rounded-md bg-white bg-opacity-10">
                      {/* Heroicon name: outline/heart */}
                      <svg
                        className="h-6 w-6 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-white">
                      Connect with Customers
                    </h3>
                    <p className="mt-2 text-base text-lightGreen-200">
                      Ac tincidunt sapien vehicula erat auctor pellentesque
                      rhoncus. Et magna sit morbi lobortis.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats section */}
          <div className="relative bg-gray-900">
            <div className="h-80 absolute inset-x-0 bottom-0 xl:top-0 xl:h-full">
              <div className="h-full w-full xl:grid xl:grid-cols-2">
                <div className="h-full xl:relative xl:col-start-2">
                  <img
                    className="h-full w-full object-cover opacity-25 xl:absolute xl:inset-0"
                    src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2830&q=80&sat=-100"
                    alt="People working on laptops"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gray-900 xl:inset-y-0 xl:left-0 xl:h-full xl:w-32 xl:bg-gradient-to-r"
                  ></div>
                </div>
              </div>
            </div>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 xl:grid xl:grid-cols-2 xl:grid-flow-col-dense xl:gap-x-8">
              <div className="relative pt-12 pb-64 sm:pt-24 sm:pb-64 xl:col-start-1 xl:pb-24">
                <h2 className="text-sm font-semibold tracking-wide uppercase">
                  <span className="bg-gradient-to-r from-lightGreen-300 to-green-300 bg-clip-text text-transparent">
                    Valuable Metrics
                  </span>
                </h2>
                <p className="mt-3 text-3xl font-extrabold text-white">
                  Get actionable data that will help grow your business
                </p>
                <p className="mt-5 text-lg text-gray-300">
                  Rhoncus sagittis risus arcu erat lectus bibendum. Ut in
                  adipiscing quis in viverra tristique sem. Ornare feugiat
                  viverra eleifend fusce orci in quis amet. Sit in et vitae
                  tortor, massa. Dapibus laoreet amet lacus nibh integer quis.
                  Eu vulputate diam sit tellus quis at.
                </p>
                <div className="mt-12 grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2">
                  <p>
                    <span className="block text-2xl font-bold text-white">
                      8K+
                    </span>
                    <span className="mt-1 block text-base text-gray-300">
                      <span className="font-medium text-white">Companies</span>
                      use laoreet amet lacus nibh integer quis.
                    </span>
                  </p>

                  <p>
                    <span className="block text-2xl font-bold text-white">
                      25K+
                    </span>
                    <span className="mt-1 block text-base text-gray-300">
                      <span className="font-medium text-white">
                        Countries around the globe
                      </span>
                      lacus nibh integer quis.
                    </span>
                  </p>

                  <p>
                    <span className="block text-2xl font-bold text-white">
                      98%
                    </span>
                    <span className="mt-1 block text-base text-gray-300">
                      <span className="font-medium text-white">
                        Customer satisfaction
                      </span>
                      laoreet amet lacus nibh integer quis.
                    </span>
                  </p>

                  <p>
                    <span className="block text-2xl font-bold text-white">
                      12M+
                    </span>
                    <span className="mt-1 block text-base text-gray-300">
                      <span className="font-medium text-white">
                        Issues resolved
                      </span>
                      lacus nibh integer quis.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-white">
            <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 lg:flex lg:items-center lg:justify-between">
              <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                <span className="block">Ready to get started?</span>
                <span className="-mb-1 pb-1 block bg-gradient-to-r from-lightGreen-600 to-green-600 bg-clip-text text-transparent">
                  Get in touch or create an account.
                </span>
              </h2>
              <div className="mt-6 space-y-4 sm:space-y-0 sm:flex sm:space-x-5">
                <a
                  href="#"
                  className="flex items-center justify-center bg-gradient-to-r from-lightGreen-600 to-green-600 bg-origin-border px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white hover:from-lightGreen-700 hover:to-green-700"
                >
                  Learn more
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-green-800 bg-green-50 hover:bg-green-100"
                >
                  Get started
                </a>
              </div>
            </div>
          </div>
        </main>

        <footer className="bg-gray-50" aria-labelledby="footer-heading">
          <h2 id="footer-heading" className="sr-only">
            Footer
          </h2>
          <div className="max-w-7xl mx-auto pt-16 pb-8 px-4 sm:px-6 lg:pt-24 lg:px-8">
            <div className="xl:grid xl:grid-cols-3 xl:gap-8">
              <div className="grid grid-cols-2 gap-8 xl:col-span-2">
                <div className="md:grid md:grid-cols-2 md:gap-8">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                      Solutions
                    </h3>
                    <ul role="list" className="mt-4 space-y-4">
                      <li>
                        <a
                          href="#"
                          className="text-base text-gray-500 hover:text-gray-900"
                        >
                          Marketing
                        </a>
                      </li>

                      <li>
                        <a
                          href="#"
                          className="text-base text-gray-500 hover:text-gray-900"
                        >
                          Analytics
                        </a>
                      </li>

                      <li>
                        <a
                          href="#"
                          className="text-base text-gray-500 hover:text-gray-900"
                        >
                          Commerce
                        </a>
                      </li>

                      <li>
                        <a
                          href="#"
                          className="text-base text-gray-500 hover:text-gray-900"
                        >
                          Insights
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-12 md:mt-0">
                    <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                      Support
                    </h3>
                    <ul role="list" className="mt-4 space-y-4">
                      <li>
                        <a
                          href="#"
                          className="text-base text-gray-500 hover:text-gray-900"
                        >
                          Documentation
                        </a>
                      </li>

                      <li>
                        <a
                          href="#"
                          className="text-base text-gray-500 hover:text-gray-900"
                        >
                          Guides
                        </a>
                      </li>

                      <li>
                        <a
                          href="#"
                          className="text-base text-gray-500 hover:text-gray-900"
                        >
                          API Status
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="md:grid md:grid-cols-2 md:gap-8">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                      Company
                    </h3>
                    <ul role="list" className="mt-4 space-y-4">
                      <li>
                        <a
                          href="#"
                          className="text-base text-gray-500 hover:text-gray-900"
                        >
                          About
                        </a>
                      </li>

                      <li>
                        <a
                          href="#"
                          className="text-base text-gray-500 hover:text-gray-900"
                        >
                          Blog
                        </a>
                      </li>

                      <li>
                        <a
                          href="#"
                          className="text-base text-gray-500 hover:text-gray-900"
                        >
                          Jobs
                        </a>
                      </li>

                      <li>
                        <a
                          href="#"
                          className="text-base text-gray-500 hover:text-gray-900"
                        >
                          Press
                        </a>
                      </li>

                      <li>
                        <a
                          href="#"
                          className="text-base text-gray-500 hover:text-gray-900"
                        >
                          Partners
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-12 md:mt-0">
                    <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                      Legal
                    </h3>
                    <ul role="list" className="mt-4 space-y-4">
                      <li>
                        <a
                          href="#"
                          className="text-base text-gray-500 hover:text-gray-900"
                        >
                          Claim
                        </a>
                      </li>

                      <li>
                        <a
                          href="#"
                          className="text-base text-gray-500 hover:text-gray-900"
                        >
                          Privacy
                        </a>
                      </li>

                      <li>
                        <a
                          href="#"
                          className="text-base text-gray-500 hover:text-gray-900"
                        >
                          Terms
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="mt-12 xl:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Subscribe to our newsletter
                </h3>
                <p className="mt-4 text-base text-gray-500">
                  The latest news, articles, and resources, sent to your inbox
                  weekly.
                </p>
                <form className="mt-4 sm:flex sm:max-w-md">
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email-address"
                    id="email-address"
                    autoComplete="email"
                    required
                    className="appearance-none min-w-0 w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:placeholder-gray-400"
                    placeholder="Enter your email"
                  />
                  <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center bg-gradient-to-r from-lightGreen-600 to-green-600 bg-origin-border px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white hover:from-lightGreen-700 hover:to-green-700"
                    >
                      Subscribe
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="mt-12 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between lg:mt-16">
              <div className="flex space-x-6 md:order-2">
                {/* instagram */}
                {/* <a href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Instagram</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a> */}
                {/* twitter link */}
                <Link href="https://twitter.com/treelofapps">
                  <a className="text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Twitter</span>
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </Link>
              </div>
              <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
                &copy; {new Date().getFullYear()} Treelof Services LLC. All
                rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
