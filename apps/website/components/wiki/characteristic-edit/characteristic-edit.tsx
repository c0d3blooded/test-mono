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
  const { control, getValues } = useFormContext();
  // const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
  //   {
  //     control, // control props comes from useForm (optional: if you are using FormContext)
  //     name: props.name // unique name for your Field Array
  //   }
  // );

  /**
   * An editable option
   * @param item
   * @param index
   * @returns
   */
  const _renderItem = (item: Characteristic, index: number) => {
    const icons = chipIcons[props.name] ?? {};

    return (
      <div key={item.id} className="relative flex items-center mb-5 md:mr-5">
        <input
          id="comments"
          aria-describedby="comments-description"
          name="comments"
          type="checkbox"
          className="h-4 w-4 text-primary-600 border-gray-300 rounded ring-0"
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
    <fieldset className="flex flex-col md:flex-row flex-wrap items-start md:items-center -mb-5">
      {props.items.map((item, i) => _renderItem(item, i))}
    </fieldset>
  );
};

export default CharacteristicEdit;
