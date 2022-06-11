// the type of device being used
export enum DeviceType {
  iPhone,
  Android
}
// labels for available device types
export const DeviceTypeLabel: Record<DeviceType, string> = {
  [DeviceType.iPhone]: 'iPhone',
  [DeviceType.Android]: 'Android'
};
// the theme of device being used
export enum DeviceTheme {
  Light,
  Dark
}
// labels for available device theme
export const DeviceThemeLabel: Record<DeviceTheme, string> = {
  [DeviceTheme.Light]: 'Light',
  [DeviceTheme.Dark]: 'Dark'
};
