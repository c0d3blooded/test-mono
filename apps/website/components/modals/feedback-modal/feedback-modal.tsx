import React, { useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Button, Input, Notification } from '@treelof/components';
import { useForm } from 'react-hook-form';
import { sendFeedback } from '@treelof/services';
import pick from 'lodash.pick';
import { useUser } from '@treelof/hooks';
import { getName } from '@treelof/utils';

interface Props {
  visible: boolean; // indicates if the modal is visible or not
  onClose: () => void; // function called when the modal is closed
}

const FeedbackModal: React.FC<Props> = ({ visible, onClose }) => {
  const { profile } = useUser();
  const [loading, setLoading] = useState(false); // when the confirmation is running
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues
  } = useForm<{ feedback: string }>();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (!visible) reset();
  }, [visible, reset]);

  // close the dialog after success message is shown
  useEffect(() => {
    if (showSuccessMessage) {
      setTimeout(() => {
        onClose();
        // close the success message
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 500);
      }, 3000);
    }
  }, [onClose, showSuccessMessage]);

  /* send the feedback */
  const onSubmit = async () => {
    setLoading(true);
    try {
      await sendFeedback({
        feedback: getValues().feedback,
        profile: {
          ...pick(profile, ['uuid', 'email']),
          name: getName(profile)
        }
      });
    } catch (e) {
      // show error
      setLoading(false);
      return;
    }
    setLoading(false);
    setShowSuccessMessage(true);
  };

  return (
    <Transition appear show={visible} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={onClose}
      >
        <form
          className="min-h-screen px-4 text-center"
          onSubmit={handleSubmit(onSubmit)}
        >
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
              {/* dialog entry */}
              {!showSuccessMessage ? (
                <Dialog.Description>
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
                        placeholder: 'Enter your thoughts here...',
                        ...register('feedback', {
                          required: 'Please enter some feedback'
                        })
                      }}
                      multiline
                      error={errors.feedback?.message}
                    />
                  </div>
                  <div className="flex flex-row mt-4 justify-end">
                    {/* cancel button */}
                    <Button
                      color="danger"
                      alt
                      buttonProps={{ onClick: onClose }}
                    >
                      Cancel
                    </Button>
                    {/* confirm button */}
                    <Button
                      color="primary"
                      alt
                      buttonProps={{
                        className: 'ml-3',
                        type: 'submit'
                      }}
                      loading={loading}
                    >
                      Submit feedback
                    </Button>
                  </div>
                </Dialog.Description>
              ) : (
                // success message
                <Dialog.Description className="mt-5">
                  <Notification type="success">
                    Thanks for sending your feedback!
                  </Notification>
                </Dialog.Description>
              )}
            </div>
          </Transition.Child>
        </form>
      </Dialog>
    </Transition>
  );
};

export default FeedbackModal;
