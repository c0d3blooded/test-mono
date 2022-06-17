import { Chip } from '@treelof/components';
import { Characteristic } from '@treelof/models';
import { useFormContext } from 'react-hook-form';
import chipIcons from '../../../utils/chip-icon';

interface Props {
  name: string; // the field
  color: string; // color of the labels
  items: Array<Characteristic>;
}

const CharacteristicEdit: React.FC<Props> = (props) => {
  const { getValues, setValue, watch } = useFormContext();
  watch([props.name]);
  const values = getValues()[props.name] ?? []; // array of selected values
  /**
   * An editable option
   * @param item
   * @param index
   * @returns
   */
  const _renderItem = (item: Characteristic) => {
    const icons = chipIcons[props.name] ?? {};
    const selected = values.includes(item.id);
    return (
      <div key={item.id} className="relative flex items-center mb-5 md:mr-5">
        <input
          id="comments"
          aria-describedby="comments-description"
          name="comments"
          type="checkbox"
          className="h-4 w-4 text-primary-600 border-gray-300 rounded ring-0"
          checked={selected}
          onChange={() => {
            let newValues = [...values];
            // toggle input on or off
            if (!selected) newValues.push(item.id);
            else newValues = newValues.filter((value) => value !== item.id);
            setValue(props.name, newValues);
          }}
        />
        <div className="ml-3">
          <Chip color={props.color} leading={icons[item.id]}>
            {item.label}
          </Chip>
        </div>
      </div>
    );
  };

  return (
    <fieldset
      name={props.name}
      className="flex flex-col md:flex-row flex-wrap items-start md:items-center -mb-5"
    >
      {props.items.map((item) => _renderItem(item))}
    </fieldset>
  );
};

export default CharacteristicEdit;
