import { useCallback, useContext, useEffect, useState } from 'react';
import groupBy from 'lodash.groupby';
import { useRouter } from 'next/router';
import { DateTime } from 'luxon';
import {
  HiOutlineBookOpen,
  HiOutlineCollection,
  HiOutlinePencil
} from 'react-icons/hi';
import { FormProvider, useForm } from 'react-hook-form';

import { Fade, SlideVertical } from '@treelof/animations';
import { Plant, Revision, TreelofApiError } from '@treelof/models';
import { createRevision, getPlant, getRevisions } from '@treelof/services';
import { Loader, Notification, Tabs } from '@treelof/components';
import { copyObject, getRevisionDate } from '@treelof/utils';
import WikiPageMdx from '../../../mdx/wiki/page.mdx';
import WikiEditPageMdx from '../../../mdx/wiki/edit-page.mdx';
import WikiRevisionsMdx from '../../../mdx/wiki/revisions.mdx';
import WikiContainer from '../../../components/wiki/container';
import { CharacteristicContext } from '../../../context/characteristic';
import { useUser } from '@treelof/hooks';
import axios from 'axios';

const WikiPage = () => {
  const { profile } = useUser();
  const router = useRouter();
  const { id } = router.query;
  const { loading } = useContext(CharacteristicContext);
  const methods = useForm<Plant>();
  const { handleSubmit, setValue } = methods;

  const [plant, setPlant] = useState<Plant>();
  // revisions grouped by date
  const [revisions, setRevisions] = useState<Record<string, Array<Revision>>>();
  const [showLoader, setShowLoader] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); // show success notification when the wiki has finished saving
  const [isSaving, setIsSaving] = useState(false); // the form is saving
  const [saveError, setSaveError] = useState<string>();

  useEffect(() => {
    // only show the loader after timeout
    setTimeout(() => setShowLoader(true), 1000);
  }, []);

  /* Fetch the plant from the server */
  const fetchPlant = () => {
    if (id)
      getPlant(parseInt(id as string)).then(({ data }) => {
        setPlant(JSON.parse(JSON.stringify(data)));
        for (const key of Object.keys(data) as Array<keyof Plant>) {
          setValue(key, data[key]);
        }
      });
  };

  // make initial call
  useEffect(() => {
    if (id) {
      fetchPlant();
      // get the revision history for this plant
      getRevisions('plants', `${id}`).then(({ data }) => {
        const newRevisions = groupBy(
          // filter out rejected revisions
          data.filter((item) => !item.rejected_on),
          (item: Revision) => {
            // the date format to group these items by
            const format = 'yyyy-MM-dd';
            return getRevisionDate(item).toFormat(format);
          }
        );
        setRevisions(copyObject(newRevisions));
      });
    }
  }, [id]);

  const selectedTab = () => {
    const hashes = router.asPath.match(/#([a-z0-9]+)/gi) ?? [];
    if (hashes?.length > 0) {
      // selected tab based on the hash
      switch (hashes[0]) {
        case '#edit':
          return 1;
        case '#revisions':
          return 2;
        case '#read':
        default:
          return 0;
      }
    }
    return 0;
  };

  /**
   * Change a tab
   * @param value
   */
  const onChangeTab = (value: number) => {
    let hash = '';
    // selected tab based on the hash
    switch (value) {
      case 0:
      default:
        hash = '#read';
        break;
      case 1:
        hash = '#edit';
        break;
      case 2:
        hash = '#revisions';
        break;
    }
    // replace hash in route
    const newRoute = router.asPath.replace(/#.+/, hash);
    return router.push(newRoute);
  };

  /* When the edit form is submitted */
  const onEditSubmit = async () => {
    const { getValues } = methods;
    const newPlant = getValues();
    const changes = {};
    setSaveError('');
    // check for changes
    for (const key of Object.keys(plant)) {
      if (JSON.stringify(plant[key]) !== JSON.stringify(newPlant[key])) {
        let newValue = newPlant[key];
        // needs to save as an array
        if (!Array.isArray(newValue)) newValue = [newPlant[key]];
        changes[key] = newValue;
      }
    }
    setIsSaving(true);
    try {
      await createRevision({
        reference: 'plants',
        reference_id: `${id}`,
        changes,
        owner_id: profile?.uuid
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { message } = error.response.data as TreelofApiError;
        setSaveError(message);
      }
    }
    fetchPlant();
    setIsSaving(false);
    onChangeTab(0);
    _showSuccessAlert();
  };

  /* Show the success for save notification */
  const _showSuccessAlert = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
  };

  const _renderTab = () => {
    switch (selectedTab()) {
      // read
      case 0:
        return <WikiPageMdx plant={plant} />;
      // edit
      case 1:
        return (
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onEditSubmit)}>
              <WikiEditPageMdx
                plant={plant}
                methods={methods}
                saving={isSaving}
                error={saveError}
              />
            </form>
          </FormProvider>
        );
      // revision history
      case 2:
        return <WikiRevisionsMdx revisions={revisions} />;
    }
  };

  return (
    <WikiContainer>
      {/* loader indicator */}
      {loading && showLoader && (
        <div className="flex w-full h-full items-center justify-center">
          <Loader color="indigo" size={10} />
        </div>
      )}
      {/* page */}
      <Fade show={!loading}>
        <div className="flex flex-col">
          {/* read page */}
          {plant && (
            <div className="space-y-6 -mt-5">
              <Tabs
                selectedTab={selectedTab()}
                tabs={[
                  {
                    label: 'Read',
                    icon: (className) => (
                      <HiOutlineBookOpen className={className} />
                    ),
                    hash: '#read'
                  },
                  {
                    label: 'Edit',
                    icon: (className) => (
                      <HiOutlinePencil className={className} />
                    ),
                    hash: '#edit'
                  },
                  {
                    label: 'Revisions',
                    icon: (className) => (
                      <HiOutlineCollection className={className} />
                    ),
                    hash: '#revisions'
                  }
                ]}
              />
              {/* success notification */}
              <SlideVertical show={showSuccess}>
                <div className="mx-6 -mt-6 pt-6">
                  <Notification type="success">
                    Your revision has successfully be saved! Thank you
                  </Notification>
                </div>
              </SlideVertical>
              <div className="px-6">{_renderTab()}</div>
            </div>
          )}
        </div>
      </Fade>
    </WikiContainer>
  );
};

export default WikiPage;
