import React, { useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Button, Input } from '@treelof/components';

interface Props {
  visible: boolean; // indicates if the modal is visible or not
  onConfirm: () => void; // confirmation action
  onClose: () => void; // function called when the modal is closed
}

const FeedbackModal: React.FC<Props> = (props) => {
  const [loading, setLoading] = useState(false); // when the confirmation is running
  useEffect(() => {
    if (props.visible) setLoading(false);
  }, [props.visible]);
  return (
    <Transition appear show={props.visible} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={props.onClose}
      >
        <form className="min-h-screen px-4 text-center">
          {/* the overlay */}
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0 scale-100"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>
          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              {/* the dialog title */}
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Send feedback
              </Dialog.Title>
              {/* the dialog description */}
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Do you have any comments or suggestions about the wiki?
                </p>
              </div>
              {/* feedback entry */}
              <div className="mt-4">
                <Input
                  textAreaProps={{
                    name: 'feedback',
                    placeholder: 'Enter your thoughts here...'
                  }}
                  multiline
                />
              </div>
              <div className="flex flex-row mt-4 justify-end">
                {/* cancel button */}
                <Button
                  color="danger"
                  alt
                  buttonProps={{ onClick: props.onClose }}
                >
                  Cancel
                </Button>
                {/* confirm button */}
                <Button
                  color="primary"
                  alt
                  buttonProps={{
                    className: 'ml-3',
                    onClick: () => {
                      setLoading(true);
                      props.onConfirm();
                    }
                  }}
                  loading={loading}
                >
                  Submit feedback
                </Button>
              </div>
            </div>
          </Transition.Child>
        </form>
      </Dialog>
    </Transition>
  );
};

export default FeedbackModal;
