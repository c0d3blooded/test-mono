import Link from 'next/link';
import React, { useEffect } from 'react';
import { Fade, SlideHorizontalRight } from '@treelof/animations';
import cn from 'classnames';
import {
  HiOutlineViewGrid,
  HiOutlineCog,
  HiOutlineShoppingCart,
  HiOutlineCalendar,
  HiOutlineSpeakerphone,
  HiOutlineX
} from 'react-icons/hi';
import { useRouter } from 'next/router';
import { useUser } from '@treelof/hooks';
import { useIsMobile } from '@treelof/hooks';

interface Props {
  showMobile: boolean; // is the menu visible
  onClose: () => void; // when the menu is closed
}

const Sidebar: React.FC<Props> = ({ showMobile, onClose }) => {
  const { loggedIn } = useUser();
  const mobile = useIsMobile();
  const router = useRouter();

  useEffect(() => {
    // close the sidebar on responsive change
    if (!mobile && showMobile) onClose();
  }, [mobile, onClose, showMobile]);

  /**
   * Renders a menu item
   * @param url the link the menu item navigates to
   * @param icon the icon of the menu item in the form of a function, returns the className to the given component
   * @param label the menu item label
   * @returns the rendered menu item
   */
  const _renderItem = (
    url: string,
    icon: (className: string) => JSX.Element,
    label: string
  ) => {
    // if this is the currently viewed url
    const isCurrentUrl =
      url === '/' ? router.route === url : router.route.includes(url);
    // set conditional classnames
    const className = cn(
      'hover:bg-green-800 hover:text-white group w-full py-2 px-3 md:py-3 rounded-md flex md:flex-col items-center text-sm font-medium transition-colors',
      {
        'text-green-100': !isCurrentUrl,
        'bg-green-600 text-white': isCurrentUrl
      }
    );
    const iconClassName = cn(
      'group-hover:text-white h-6 w-6 mr-3 md:mr-0 transition-colors',
      {
        'text-green-300': !isCurrentUrl,
        'text-white': isCurrentUrl
      }
    );
    return (
      <Link href={url}>
        <a className={className} onClick={onClose}>
          <div>{icon(iconClassName)}</div>
          <span className="md:mt-2">{label}</span>
        </a>
      </Link>
    );
  };
  return (
    <>
      {/* desktop sidebar */}
      <SlideHorizontalRight
        className="hidden w-28 bg-green-700 overflow-y-auto md:block"
        show={!mobile ? loggedIn : showMobile}
      >
        <div className="w-full py-6 flex flex-col items-center">
          <div className="flex-shrink-0 flex items-center"></div>
          <div className="flex-1 mt-6 w-full px-2 space-y-1">
            {/* dashboard */}
            {_renderItem(
              '/',
              (className) => (
                <HiOutlineViewGrid className={className} />
              ),
              'Dashboard'
            )}
            {/* leaders */}
            {_renderItem(
              '/leaders',
              (className) => (
                <HiOutlineSpeakerphone className={className} />
              ),
              'Leaders'
            )}
            {/* events */}
            {_renderItem(
              '/events',
              (className) => (
                <HiOutlineCalendar className={className} />
              ),
              'Events'
            )}
            {/* settings */}
            {_renderItem(
              '/settings',
              (className) => (
                <HiOutlineCog className={className} />
              ),
              'Settings'
            )}
          </div>
        </div>
      </SlideHorizontalRight>

      {/* mobile menu */}
      <div className="md:hidden" role="dialog" aria-modal="true">
        <Fade show={showMobile} className="fixed inset-0 z-40 flex">
          <div className="fixed inset-0 z-40 flex">
            {/* overlay */}
            <Fade
              show={showMobile}
              className="fixed inset-0 bg-gray-600 bg-opacity-75"
            />
            <SlideHorizontalRight
              show={showMobile}
              className="relative max-w-xs w-full bg-green-700 pt-5 pb-4 flex-1 flex flex-col"
            >
              {/* close menu button */}
              <div className="absolute top-1 right-0 -mr-14 p-1">
                <button
                  type="button"
                  className="h-12 w-12 rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white"
                  onClick={onClose}
                >
                  <HiOutlineX className="h-6 w-6 text-white" />
                  <span className="sr-only">Close sidebar</span>
                </button>
              </div>

              <div className="flex-shrink-0 px-4 flex items-center"></div>
              <div className="mt-5 flex-1 h-0 px-2 overflow-y-auto">
                <nav className="h-full flex flex-col">
                  <div className="space-y-1">
                    {/* dashboard */}
                    {_renderItem(
                      '/',
                      (className) => (
                        <HiOutlineViewGrid className={className} />
                      ),
                      'Dashboard'
                    )}
                    {/* leaders */}
                    {_renderItem(
                      '/leaders',
                      (className) => (
                        <HiOutlineShoppingCart className={className} />
                      ),
                      'Leaders'
                    )}
                    {/* events */}
                    {_renderItem(
                      '/events',
                      (className) => (
                        <HiOutlineCalendar className={className} />
                      ),
                      'Events'
                    )}
                    {/* settings */}
                    {_renderItem(
                      '/settings',
                      (className) => (
                        <HiOutlineCog className={className} />
                      ),
                      'Settings'
                    )}
                  </div>
                </nav>
              </div>
            </SlideHorizontalRight>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Fade>
      </div>
    </>
  );
};

export default Sidebar;
