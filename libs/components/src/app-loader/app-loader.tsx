import React from 'react';
import Image from 'next/image';
import styles from './app-loader.module.css';
import {
  MaterialUIAccentColor,
  MaterialUIColor,
  DeviceTheme,
  DeviceType,
  DeviceTypeLabel
} from '@treelof/models';
import cn from 'classnames';
import { getColorLuminance } from '@treelof/utils';

interface Props {
  primaryColor: MaterialUIColor | MaterialUIAccentColor;
  accentColor: MaterialUIColor | MaterialUIAccentColor;
  device: DeviceType; // indicates that the loader is an ios app
  dark: boolean; // indicates if the theme is dark or not
}
// the images for the devices
const images: Record<DeviceType, string> = {
  [DeviceType.iPhone]: '/images/iphone.png',
  [DeviceType.Android]: '/images/android_blank.png'
};
// android specific pictures
const androidStatusBar = '/images/status_bar.png';
const androidNavigationBar = '/images/navigation_bar.png';
const androidNavigationBarBlack = '/images/navigation_bar_black.png';
const phoneWidth = 294;
const phoneHeight = 576;
/**
 * @returns An image of an embedded app
 */
export const AppLoader: React.FC<Props> = (props) => {
  const { device } = props;
  const className = cn(styles.appWindow, {
    [styles.ios]: device === DeviceType.iPhone,
    [styles.android]: device === DeviceType.Android
  });
  return (
    <div className={styles.root}>
      <div className="flex flex-col">
        {/* android status bar */}
        {device === DeviceType.Android && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className={styles.androidStatusBar}
            src={androidStatusBar}
            alt="status-bar"
            width={phoneWidth * 0.9}
            // height calculated from the original image height vs phone height relative to the image/phone width ratio
            height={phoneHeight * 0.9 * 0.034}
          />
        )}
        {/* phone mockup */}
        <Image
          className={styles.phone}
          src={images[device]}
          alt="phone"
          width={phoneWidth}
          height={phoneHeight}
        />
        {/* android navigation bar */}
        {device === DeviceType.Android && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className={styles.androidNavigationBar}
            src={
              getColorLuminance(props.primaryColor) === DeviceTheme.Light
                ? androidNavigationBar
                : androidNavigationBarBlack
            }
            alt="navigation-bar"
            width={phoneWidth}
            // height calculated from the original image height vs phone height relative to the image/phone width ratio
            height={phoneHeight * 0.068}
          />
        )}
      </div>
      <div className={className}>
        <iframe
          className="w-full h-full"
          src={`${process.env.NEXT_PUBLIC_APP_URL}?primary=${
            props.primaryColor
          }&accent=${props.accentColor}&platform=${DeviceTypeLabel[
            device
          ].toLowerCase()}&dark=${props.dark}`}
        />
      </div>
    </div>
  );
};
