import React, { useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { Button, Input } from '@treelof/components';
import { CreateWikiPageParameters, TreelofApiError } from '@treelof/models';
import { createPage } from '@treelof/services';
import { SlideVertical } from '@treelof/animations';
import axios from 'axios';
import { useRouter } from 'next/router';

interface Props {
  visible: boolean; // indicates if the modal is visible or not
  onConfirm: () => void; // confirmation action
  onClose: () => void; // function called when the modal is closed
}

const RequestPageModal: React.FC<Props> = (props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false); // when the confirmation is running
  const [requestError, setRequestError] = useState<string>(); // there was an error sending the request

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues
  } = useForm<CreateWikiPageParameters>();
  useEffect(() => {
    if (props.visible) setLoading(false);
  }, [props.visible]);

  /**
   * When submitting a request to create a new page
   */
  const onSubmit = async () => {
    setLoading(true);
    // clear error
    setRequestError('');
    try {
      const { data } = await createPage(getValues());
      setLoading(false);
      props.onClose();
      // go to the new article
      router.push(`/wiki/${data.id}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { message } = error.response.data as TreelofApiError;
        setRequestError(message);
      }
      setLoading(false);
    }
  };

  return (
    <Transition appear unmount show={props.visible} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => {
          reset();
          props.onClose();
        }}
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
                Create a page
              </Dialog.Title>
              <Dialog.Description>
                {/* the dialog description */}
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    If you can&apos;t find a page which matches your search,
                    please enter it&apos;s common and botanical names below and
                    click <b>Submit request</b>.
                    <br />
                    <br />A basic page will be created with information from
                    Wikipedia.
                  </p>
                </div>
                {/* feedback entry */}
                <div className="flex flex-col space-y-3 mt-4">
                  {/* common name */}
                  <Input
                    label="Common name"
                    inputProps={{
                      placeholder: '(e.g. American paw paw)',
                      ...register('common_name', {
                        required: 'Please enter a value'
                      })
                    }}
                    error={errors.common_name?.message}
                  />
                  {/* botanical name */}
                  <Input
                    label="Botanical name"
                    inputProps={{
                      placeholder: '(e.g. Asimina triloba)',
                      ...register('botanical_name', {
                        required: 'Please enter a value'
                      })
                    }}
                    error={errors.botanical_name?.message}
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
                      type: 'submit'
                    }}
                    loading={loading}
                  >
                    Submit request
                  </Button>
                </div>
                {/* show error  */}
                <SlideVertical show={Boolean(requestError)}>
                  <p className="mt-2 text-sm text-red-600 text-end">
                    {requestError}
                  </p>
                </SlideVertical>
              </Dialog.Description>
            </div>
          </Transition.Child>
        </form>
      </Dialog>
    </Transition>
  );
};

export default RequestPageModal;
