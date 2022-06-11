import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Fade, SlideHorizontalRight } from '@treelof/animations';
import { useIsMobile } from '@treelof/hooks';
import {
  HiOutlineDocumentAdd,
  HiOutlineHeart,
  HiOutlineHome,
  HiOutlineLibrary,
  HiOutlineX
} from 'react-icons/hi';

import WikiHeader from '../header';
import { useRouter } from 'next/router';
import RequestPageModal from '../../common/modals/create-page-modal';
import FeedbackModal from '../../common/modals/feedback-modal';

interface Props {
  children?: React.ReactNode;
}
const WikiContainer: React.FC<Props> = (props) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen flex">
      <WikiSidebar
        showMobile={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      {/* content */}
      <div className="w-full flex-1 flex flex-col">
        {/* wiki header */}
        <WikiHeader onOpenSidebar={() => setSidebarOpen(true)} />
        <div className="h-full my-5 border-l border-gray-200">
          {props.children}
        </div>
      </div>
    </div>
  );
};
interface Props {
  showMobile: boolean; // is the menu visible
  onClose: () => void; // when the menu is closed
}

const WikiSidebar: React.FC<Props> = ({ showMobile, onClose }) => {
  // show/hide the add a page modal
  const [showAddPageModal, setShowAddPageModal] = useState(false);
  // show/hide the request a page modal
  const [showRequestPageModal, setShowRequestPageModal] = useState(false);
  // show/hide the feedback modal
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const router = useRouter();
  const isMobile = useIsMobile();

  useEffect(() => {
    // close the sidebar on responsive change
    if (!isMobile && showMobile) onClose();
  }, [isMobile, onClose, showMobile]);

  // render the logo
  const _renderLogo = () => (
    <div className="flex flex-row items-center justify-center text-2xl text-green-600 border-b border-gray-200 pb-4 mx-6 mb-3">
      <Image
        src="/images/treelof-icon.png"
        width={50}
        height={50}
        objectFit="contain"
        alt="logo"
      />
      <div className="pl-3">
        <span className="logo">treelof</span>
        <span className="logo-sub">wiki</span>
      </div>
    </div>
  );

  /**
   * Renders a menu item
   * @param label the menu item label
   * @param onClick when this item is click
   * @param icon the icon of the menu item in the form of a function, returns the className to the given component
   * @param isGroup is a header for a group
   * @returns the rendered menu item
   */
  const _renderItem = (
    label: string,
    onClick: () => void,
    icon?: (className: string) => JSX.Element
  ) => {
    const iconClassName = 'text-gray-500 mr-3 flex-shrink-0 h-6 w-6';
    return (
      <button
        type="button"
        className="bg-white text-gray-600 hover:bg-gray-200 hover:text-gray-900 group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium rounded-md focus:outline-none"
        aria-controls="sub-menu-1"
        aria-expanded="false"
        onClick={() => {
          onClick();
          onClose();
        }}
      >
        {/* icon */}
        {icon && icon(iconClassName)}
        {/* label */}
        <span className="flex-1">{label}</span>
      </button>
    );
  };

  /* renders the menu items */
  const _renderItems = () => (
    <>
      <div className="py-2">{_renderLogo()}</div>
      <div className="flex-grow flex flex-col">
        <nav className="flex-1 px-2 space-y-1" aria-label="Sidebar">
          {/* home */}
          {_renderItem(
            'Home',
            () => router.push('/wiki'),
            (className) => (
              <HiOutlineHome className={className} />
            )
          )}

          <div className="space-y-1">
            {/* contribute */}
            <h3
              className="px-2 pt-4 pb-1 text-xs font-semibold text-gray-500 uppercase tracking-wider"
              id="projects-headline"
            >
              Contribute
            </h3>
            <div
              className="space-y-1"
              role="group"
              aria-labelledby="projects-headline"
            >
              {/* create page */}
              {_renderItem(
                'Create a Page',
                () => setShowRequestPageModal(true),
                (className) => (
                  <HiOutlineDocumentAdd className={className} />
                )
              )}
              {/* send app feedback */}
              {_renderItem(
                'Send feedback',
                () => setShowFeedbackModal(true),
                (className) => (
                  <HiOutlineHeart className={className} />
                )
              )}
            </div>
          </div>

          <div className="space-y-1">
            {/* API */}
            <h3
              className="px-2 pt-4 pb-1 text-xs font-semibold text-gray-500 uppercase tracking-wider"
              id="projects-headline"
            >
              API
            </h3>
            <div
              className="space-y-1"
              role="group"
              aria-labelledby="projects-headline"
            >
              {/* documentation */}
              {_renderItem(
                'Documenation',
                () => router.push('/docs'),
                (className) => (
                  <HiOutlineLibrary className={className} />
                )
              )}
            </div>
          </div>
        </nav>
      </div>
    </>
  );

  return (
    <>
      {/* modal to request a new wiki page */}
      <RequestPageModal
        visible={showRequestPageModal}
        onConfirm={() => setShowRequestPageModal(false)}
        onClose={() => setShowRequestPageModal(false)}
      />
      {/* modal to send feedback */}
      <FeedbackModal
        visible={showFeedbackModal}
        onConfirm={() => setShowFeedbackModal(false)}
        onClose={() => setShowFeedbackModal(false)}
      />
      <nav>
        {/* desktop sidebar */}
        <div className="md:flex h-full hidden flex-col pt-3 pb-4  bg-white overflow-y-auto w-80">
          {_renderItems()}
        </div>

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
                className="relative max-w-xs w-full bg-white border-r border-gray-200 pt-5 pb-4 flex-1 flex flex-col"
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
                <div className="flex-1 h-0 px-2 overflow-y-auto">
                  <nav className="h-full flex flex-col">{_renderItems()}</nav>
                </div>
              </SlideHorizontalRight>
              <div className="flex-shrink-0 w-14" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Fade>
        </div>
      </nav>
    </>
  );
};

export default WikiContainer;
