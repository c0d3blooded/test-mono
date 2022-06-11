import { MouseEventHandler } from 'react';

/**
 * @param icon the icon component being used
 * @param label lable for screen readers
 * @returns a rendered icon button for social login
 */
export const renderSocialLoginButton = (
  icon: JSX.Element,
  label: string,
  onClick: MouseEventHandler<HTMLButtonElement>
) => (
  <div>
    <button
      className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 transition-all duration-200 hover:bg-gray-100"
      onClick={onClick}
    >
      <span className="sr-only">{label}</span>
      {icon}
    </button>
  </div>
);
