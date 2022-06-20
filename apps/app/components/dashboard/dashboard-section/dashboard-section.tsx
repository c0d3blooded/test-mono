import { useCallback, useEffect, useState } from 'react';
import { SlideVertical } from '@treelof/animations';
import { Notification } from '@treelof/components';
import Authenticator from '../../auth/authenticator';

interface Props {
  title?: string;
  description?: string;
  action?: JSX.Element;
  // notifications
  successText?: string;
  errorText?: string;
  onNotificationClosed?: () => void;
  children?: React.ReactNode;
}

/**
 * @returns A default wrapper for a section on the dashboard
 */
export const DashboardSection: React.FC<Props> = (props) => {
  // text to show a successful response
  const [showSuccessText, setShowSuccessText] = useState<string | null>();
  // text to show an error response
  const [showErrorText, setShowErrorText] = useState<string | null>();
  const { successText, errorText, onNotificationClosed } = props;

  /* Show the linked success notification */
  const _showSuccessAlert = useCallback(
    (text: string) => {
      setShowSuccessText(text);
      setTimeout(() => {
        setShowSuccessText(null);
        // notification closed callback
        setTimeout(() => {
          if (onNotificationClosed) onNotificationClosed();
        }, 500);
      }, 5000);
    },
    [onNotificationClosed]
  );
  /* Show the linked error notification */
  const _showErrorAlert = useCallback(
    (text: string) => {
      setShowErrorText(text);
      setTimeout(() => {
        setShowErrorText(null);
        // notification closed callback
        setTimeout(() => {
          if (onNotificationClosed) onNotificationClosed();
        }, 500);
      }, 5000);
    },
    [onNotificationClosed]
  );

  // show success notification when success text passed
  useEffect(() => {
    if (successText) _showSuccessAlert(successText);
  }, [successText, _showSuccessAlert]);
  // show error notification when error text passed
  useEffect(() => {
    if (errorText) _showErrorAlert(errorText);
  }, [errorText, _showErrorAlert]);

  return (
    <Authenticator>
      <main>
        {/* success notification */}
        <SlideVertical show={Boolean(showSuccessText)}>
          <div className="pb-4">
            <Notification type="success">{showSuccessText}</Notification>
          </div>
        </SlideVertical>
        {/* error notification */}
        <SlideVertical show={Boolean(showErrorText)}>
          <div className="pb-4">
            <Notification type="error">{showErrorText}</Notification>
          </div>
        </SlideVertical>
        <div className="mb-8 sm:flex sm:items-center z-10">
          <div className="sm:flex-auto">
            {/* title */}
            {props.title && (
              <h1 className="text-xl font-semibold text-gray-900">
                {props.title}
              </h1>
            )}
            {/* subtitle */}
            {props.description && (
              <p className="mt-2 text-sm text-gray-700">{props.description}</p>
            )}
          </div>
          {/* section action*/}
          {props.action && (
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none z-10">
              {props.action}
            </div>
          )}
        </div>
        <div className="flex flex-col z-10">
          <div className="inline-block align-middle">{props.children}</div>
        </div>
      </main>
      {/* TODO: potentially add notification feed here */}
      {/* Secondary column (hidden on smaller screens) */}
      {/* <aside className="hidden w-96 bg-white border-l border-gray-200 overflow-y-auto lg:block"> */}
      {/* Your content */}
      {/* </aside> */}
    </Authenticator>
  );
};

export default DashboardSection;
