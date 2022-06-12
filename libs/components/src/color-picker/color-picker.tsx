import React from 'react';
import { useState } from 'react';
import 'rc-tooltip/assets/bootstrap_white.css';

import styles from './color-picker.module.scss';
import cn from 'classnames';
import { Tooltip } from '../tooltip';
import { MaterialUIColor, MaterialUIAccentColor } from '@treelof/models';

interface Props {
  label: string; // label for the section
  description?: string; // description for the input
  color: MaterialUIColor | MaterialUIAccentColor; // available MUI colors
  includeAccents?: boolean; // include accent color selections
  onChange: (color: MaterialUIColor | MaterialUIAccentColor) => void;
}

/**
 * @returns a component which allows the user to picker from a pre-selected
 * list of colors (based on Material design)
 */
export const ColorPicker: React.FC<Props> = (props) => {
  const { includeAccents } = props;
  const [selectedColor, setSelectedColor] = useState(props.color);
  /**
   * @param color the material ui color
   * @returns renders an option for the color picker select
   */
  const renderColorOption = (
    color: MaterialUIColor | MaterialUIAccentColor
  ) => {
    const className = cn({
      [styles.root]: true,
      [styles[color]]: true,
      [styles.selected]: color === selectedColor
    });
    // convert the color to readable text
    const tooltipLabel = () => {
      let tooltip: string = color;
      if (color.includes('deepOrange'))
        tooltip = tooltip.replace('deepOrange', 'deep orange');
      if (color.includes('deepPurple'))
        tooltip = tooltip.replace('deepPurple', 'deep purple');
      if (color.includes('lightBlue'))
        tooltip = tooltip.replace('lightBlue', 'light blue');
      if (color.includes('lightGreen'))
        tooltip = tooltip.replace('lightGreen', 'light green');
      if (color.includes('blueGrey'))
        tooltip = tooltip.replace('blueGrey', 'blue grey');
      return tooltip.replaceAll('Accent', ' accent');
    };
    return (
      <Tooltip tooltip={tooltipLabel()} placement="top">
        <button
          className={className}
          onClick={(e) => {
            e.preventDefault();
            setSelectedColor(color);
            props.onChange(color);
          }}
        />
      </Tooltip>
    );
  };
  return (
    <div className="flex flex-col">
      <label className="block text-sm font-medium text-gray-700">
        {props.label}
      </label>
      {/* description */}
      {props.description && (
        <p className="mt-1 text-sm text-gray-500">{props.description}</p>
      )}
      <div className="flex flex-row flex-wrap mt-2">
        {renderColorOption('red')}
        {includeAccents && renderColorOption('redAccent')}
        {renderColorOption('pink')}
        {includeAccents && renderColorOption('pinkAccent')}
        {renderColorOption('purple')}
        {includeAccents && renderColorOption('purpleAccent')}
        {renderColorOption('deepPurple')}
        {includeAccents && renderColorOption('deepPurpleAccent')}
        {renderColorOption('indigo')}
        {includeAccents && renderColorOption('indigoAccent')}
        {renderColorOption('blue')}
        {includeAccents && renderColorOption('blueAccent')}
        {renderColorOption('lightBlue')}
        {includeAccents && renderColorOption('lightBlueAccent')}
        {renderColorOption('cyan')}
        {includeAccents && renderColorOption('cyanAccent')}
        {renderColorOption('teal')}
        {includeAccents && renderColorOption('tealAccent')}
        {renderColorOption('green')}
        {includeAccents && renderColorOption('greenAccent')}
        {renderColorOption('lightGreen')}
        {includeAccents && renderColorOption('lightGreenAccent')}
        {renderColorOption('lime')}
        {includeAccents && renderColorOption('limeAccent')}
        {renderColorOption('yellow')}
        {includeAccents && renderColorOption('yellowAccent')}
        {renderColorOption('amber')}
        {includeAccents && renderColorOption('amberAccent')}
        {renderColorOption('orange')}
        {includeAccents && renderColorOption('orangeAccent')}
        {renderColorOption('deepOrange')}
        {includeAccents && renderColorOption('deepOrangeAccent')}
        {renderColorOption('brown')}
        {renderColorOption('grey')}
        {renderColorOption('blueGrey')}
      </div>
    </div>
  );
};
