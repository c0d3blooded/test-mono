import React from 'react';

interface Props {
  title?: string;
  description?: string;
  extraContent?: JSX.Element;
}

/**
 * @returns A pre-styled form section
 */
const FormSection: React.FC<Props> = (props) => {
  return (
    <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          {props.title && (
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {props.title}
            </h3>
          )}
          {props.description && (
            <p className="mt-1 text-sm text-gray-500">{props.description}</p>
          )}
          {props.extraContent && (
            <div className="hidden xl:block">{props.extraContent}</div>
          )}
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">{props.children}</div>
      </div>
    </div>
  );
};

export default FormSection;
