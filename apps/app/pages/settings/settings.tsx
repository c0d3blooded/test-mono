import Link from 'next/link';
import { HiChevronRight, HiUser, HiDeviceMobile } from 'react-icons/hi';
import DashboardSection from '../../components/dashboard-section';

const Settings = () => {
  /**
   * Renders section of the settings
   * @param title
   * @param subtitle
   * @param url
   */
  const _renderSection = (
    title: string,
    subtitle: string,
    subtitleIcon: JSX.Element,
    url: string
  ) => {
    return (
      <li>
        <Link href={url}>
          <a className="block hover:bg-gray-50">
            <div className="px-4 py-4 flex items-center sm:px-6">
              <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  {/* section title */}
                  <p className="flex text-sm font-medium text-secondary-500 truncate">
                    {title}
                  </p>
                  <div className="mt-2 flex flex-row flex-1 items-center text-sm text-gray-500">
                    {subtitleIcon}
                    {/* description */}
                    <p className="inline-block break-words">{subtitle}</p>
                  </div>
                </div>
              </div>
              <div className="ml-5 flex-shrink-0">
                <HiChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </a>
        </Link>
      </li>
    );
  };

  return (
    <DashboardSection
      title="Settings"
      description="Where you can edit you profile, mobile app and more!"
    >
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {/* profile settings */}
          {_renderSection(
            'Profile settings',
            'Edit your profile settings such as your name, organization and location',
            <HiUser className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />,
            '/settings/profile'
          )}
          {/* app infomration settings */}
          {_renderSection(
            'App information settings',
            "Change your app's settings such as the name, description and colors",
            <HiDeviceMobile className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />,
            '/settings/app-information'
          )}
        </ul>
      </div>
    </DashboardSection>
  );
};

export default Settings;
