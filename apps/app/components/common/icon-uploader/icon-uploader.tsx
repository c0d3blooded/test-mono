import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styles from './icon-uploader.module.scss';
import { getAppIcon } from '../../../services/api';
import DropdownSelect from '../dropdown-select';
import { DropddownOption } from '../dropdown-select/dropdown-select';
import cn from 'classnames';
import { IconOption, MaterialUIAccentColor, MaterialUIColor } from '@treelof/models';
import { FormProvider, useForm } from 'react-hook-form';
import { responseToBase64 } from '../../../utils/common';

export interface IconData {
  name: string; // the name of the icon
  data: string; // the icon's data
}

interface Props {
  // colors for styling the icon
  primaryColor: MaterialUIColor | MaterialUIAccentColor;
  secondaryColor: MaterialUIColor | MaterialUIAccentColor;
  icon?: IconData;
  onChange: (icon: IconData) => void;
}

// color dropdown options
const options: Array<DropddownOption> = [
  { label: 'Primary Color', value: 'primary' },
  { label: 'Secondary Color', value: 'secondary' },
  { label: 'White', value: 'white' },
  { label: 'Black', value: 'black' }
];

/**
 * @returns a component for uploading/selecting app icons
 */
const IconUploader: React.FC<Props> = (props) => {
  const { icon, primaryColor, secondaryColor, onChange } = props;
  const methods = useForm<{ iconColor: string; backgroundColor: string }>({
    defaultValues: {
      iconColor: 'primary',
      backgroundColor: 'white'
    }
  }); // for the internal form
  const { iconColor, backgroundColor } = methods.watch();
  const [iconSelection, setIconSelection] = useState<IconOption>('apple');
  // change default options if these items change
  useEffect(() => {
    const { setValue } = methods;
    if (!icon) return;
    const { name } = icon;
    const arrName = name.split('-');
    if (arrName.length > 2) {
      setValue('iconColor', arrName[0]);
      setValue('backgroundColor', arrName[1]);
      setIconSelection(arrName[2] as IconOption);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(icon), methods]);

  useEffect(() => {
    const generateIcon = async () => {
      // get the right color
      const getColor = (value) => {
        switch (value) {
          case 'primary':
            return primaryColor;
          case 'secondary':
            return secondaryColor;
          default:
            return value;
        }
      };
      // generate new app icon on server
      const response = await getAppIcon({
        file: iconSelection,
        color: getColor(iconColor),
        backgroundColor: getColor(backgroundColor)
      });
      const data = await responseToBase64(response);
      const name = `${iconColor}-${backgroundColor}-${iconSelection}-icon`; // the generated file name
      onChange({ data, name });
    };
    generateIcon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [primaryColor, secondaryColor, iconColor, backgroundColor, iconSelection]);

  /**
   * @param icon the file name
   * @returns renders an option for the icon picker select
   */
  const renderIconOption = (icon: IconOption) => {
    const isSelected = icon === iconSelection;
    const className = cn('clickable', styles.root, {
      [styles.selected]: isSelected
    });
    return (
      <button
        className={className}
        onClick={(e) => {
          e.preventDefault();
          setIconSelection(icon);
        }}
      >
        <Image
          src={`/icons/${icon}.svg`}
          alt="icon-file"
          width={50}
          height={50}
        />
      </button>
    );
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            App Icon
          </label>
          <p className="mt-1 text-sm text-gray-500">
            Select an image as your app icon
          </p>
          <div className="flex flex-row items-end flex-wrap">
            {/* image viewer */}
            <div className="w-20 h-20 mt-4 mr-4 drop-shadow-md rounded-lg overflow-hidden">
              <Image
                src={icon?.data ?? '/'}
                alt="icon"
                width={200}
                height={200}
                unoptimized
              />
            </div>
            <FormProvider {...methods}>
              <div className="flex flex-row mt-4">
                {/* icon color selector */}
                <DropdownSelect
                  name="iconColor"
                  defaultValue={iconColor}
                  label="Icon Color"
                  options={options}
                />
                {/* background color selector */}
                <div className="ml-4">
                  <DropdownSelect
                    name="backgroundColor"
                    defaultValue={backgroundColor}
                    label="Background Color"
                    options={options}
                  />
                </div>
              </div>
            </FormProvider>
          </div>
        </div>
      </div>
      {/* render the icon file options */}
      <div>
        <div className="flex flex-row space-x-2 mt-4">
          {/* apple */}
          {renderIconOption('apple')}
          {/* banana */}
          {renderIconOption('banana')}
          {/* carrot */}
          {renderIconOption('carrot')}
          {/* flower */}
          {renderIconOption('flower')}
          {/* leaf */}
          {renderIconOption('leaf')}
          {/* tree */}
          {renderIconOption('tree')}
          {/* pear */}
          {renderIconOption('pear')}
        </div>
      </div>
    </div>
  );
};

export default IconUploader;
