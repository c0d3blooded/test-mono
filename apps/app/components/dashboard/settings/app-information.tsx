import React, { useEffect, useState } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import isempty from 'lodash.isempty';
import { AppInformation, IconData, MaterialUIAccentColor, MaterialUIColor } from '@treelof/models';
import {
  DeviceTheme,
  DeviceThemeLabel,
  DeviceType,
  DeviceTypeLabel
} from '@treelof/models';
import { downloadAppIcon } from '@treelof/services';
import { dataToBase64 } from '@treelof/utils';
import { AppLoader, ButtonGroup, ColorPicker, IconUploader, Input } from '@treelof/components';

interface Props {
  initialData?: AppInformation; // the initial load of app information
}

/**
 * @returns the mobile app information section of the sign up form
 */
const SettingsAppInformation: React.FC<Props> = ({ initialData }) => {
  // the currently selected phone
  const [device, setDevice] = useState<DeviceType>(DeviceType.iPhone);
  // theme shade
  const [theme, setTheme] = useState<DeviceTheme>(DeviceTheme.Light);
  const methods = useFormContext<{
    app_information?: AppInformation;
    icon_data: IconData; // the local data for an uploaded icon
  }>();
  const { register, formState, getValues, setValue, control } = methods;
  // watch material colors for changes
  useWatch({
    name: ['app_information.primary_color', 'app_information.secondary_color'],
    control
  });
  const { errors } = formState;
  const { app_information } = getValues();
  const primaryColor = app_information?.primary_color ?? 'grey';
  const accentColor = app_information?.secondary_color ?? 'grey';

  // update the form data
  useEffect(() => {
    if (initialData && !isempty(initialData)) {
      setValue('app_information', initialData);
      const { icon_url } = initialData;
      // download the saved icon url if available
      if (icon_url)
        downloadAppIcon(icon_url).then(async ({ data }) => {
          // parse the icon name
          const arr = icon_url.split('/');
          const fileName = arr[arr.length - 1];
          const iconName = fileName.split('.')[0];
          // if data available
          if (data) {
            const text = await data.text();
            const icon = await dataToBase64(text, data.type);
            setValue('icon_data', {
              name: iconName,
              data: icon
            });
          }
        });
    }
  }, [initialData, setValue]);

  /**
   * @returns the app preview
   */
  const renderAppPreview = () => (
    <div className="hidden xl:block">
      <div className="flex flex-col flex-1 items-center mt-10 space-y-3">
        {/* app loader */}
        <AppLoader
          primaryColor={primaryColor}
          accentColor={accentColor}
          device={device}
          dark={theme === DeviceTheme.Dark}
        />
        {/* device selection for preview */}
        <ButtonGroup
          defaultValue={device}
          onChange={(value) => setDevice(value.id as DeviceType)}
          options={[
            {
              id: DeviceType.iPhone,
              label: DeviceTypeLabel[DeviceType.iPhone]
            },
            {
              id: DeviceType.Android,
              label: DeviceTypeLabel[DeviceType.Android]
            }
          ]}
        />
        {/* theme selection for preview */}
        <ButtonGroup
          defaultValue={theme}
          onChange={(value) => setTheme(value.id as DeviceTheme)}
          options={[
            {
              id: DeviceTheme.Light,
              label: DeviceThemeLabel[DeviceTheme.Light]
            },
            {
              id: DeviceTheme.Dark,
              label: DeviceThemeLabel[DeviceTheme.Dark]
            }
          ]}
        />
      </div>
    </div>
  );
  return (
    <div className="flex flex-row">
      <div className="space-y-6 flex-1 lg:pr-4">
        {/* short title */}
        <Input
          label="Short Title (max. 14 chars)"
          hint="Enter the label which will appear under the icon on your iOS or Android device"
          inputProps={{
            placeholder: '(e.g. Market)',
            ...register('app_information.short_title', {
              required: "Please enter app's short title",
              maxLength: 14
            })
          }}
          error={errors.app_information?.short_title?.message}
        />
        {/* long title */}
        <Input
          label="Title (max. 30 chars)"
          hint="Enter the title of your app as it will appear on the App Store and Play Store"
          inputProps={{
            placeholder: '(e.g. Market: List Goods & Services)',
            ...register('app_information.long_title', {
              required: "Please enter app's long title",
              maxLength: 30
            })
          }}
          error={errors.app_information?.long_title?.message}
        />
        {/* description */}
        <Input
          label="Short Description (max. 80 chars)"
          hint="Enter a short description of your app. This is a quick snippet which briefly describes what your app does."
          textAreaProps={{
            placeholder: '(e.g. This app is great at parties!)',
            ...register('app_information.short_description', {
              required: "Please enter app's short description",
              maxLength: 80
            })
          }}
          error={errors.app_information?.short_description?.message}
          multiline
        />
        {/* full description */}
        <Input
          label="Full Description (max. 4000 chars)"
          hint={`Enter the full description of your app. This is what will show up on the App Store and Play Store in the description section.\n\nNote: The first 255 characters are displayed first and will make the most impact`}
          textAreaProps={{
            placeholder:
              "(e.g. Try a new way to experience your farmer's market. Tons a great tools to expand your business here!)",
            ...register('app_information.long_description', {
              required: "Please enter app's long description",
              maxLength: 4000
            })
          }}
          error={errors.app_information?.long_description?.message}
          multiline
        />
        {/* primary color picker */}
        <Controller
          control={control}
          name="app_information.primary_color"
          render={({ field: { value, onChange } }) => (
            <ColorPicker
              label="Primary Color"
              description="Select the primary color for your app's theme"
              color={value as MaterialUIColor | MaterialUIAccentColor}
              onChange={(color) => onChange(color)}
            />
          )}
        />
        {/* secondary color picker */}
        <Controller
          control={control}
          name="app_information.secondary_color"
          render={({ field: { value, onChange } }) => (
            <ColorPicker
              label="Accent Color"
              description="Select the secondary color for your app's theme"
              color={value as MaterialUIColor | MaterialUIAccentColor}
              onChange={(color) => onChange(color)}
              includeAccents
            />
          )}
        />
        {/* upload app icon */}
        <Controller
          control={control}
          name="icon_data"
          render={({ field: { value, onChange } }) => (
            <IconUploader
              icon={value}
              primaryColor={primaryColor}
              secondaryColor={accentColor}
              onChange={(data) => onChange(data)}
            />
          )}
        />
      </div>
      {/* app preview */}
      <div>{renderAppPreview()}</div>
    </div>
  );
};

export default SettingsAppInformation;
