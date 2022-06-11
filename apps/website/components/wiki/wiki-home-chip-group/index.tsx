import { useEffect, useState } from 'react';
import axios from 'axios';
import ChipGroup, { Option } from '../../common/chip-group';

// retrieves the available tags for the given endpoint
interface WikiHomeChipGroupProps {
  category: string;
  color: string;
}
const WikiHomeChipGroup: React.FC<WikiHomeChipGroupProps> = (props) => {
  const [items, setItems] = useState<Array<Option>>([]);

  // get the items from the database with the necessary metadata
  useEffect(() => {
    const getItems = async () =>
      await axios
        .get<Array<{ id: string; label: string }>>(`/${props.category}`)
        .then(({ data }) => setItems(data));
    getItems();
  }, [props.category]);

  return <ChipGroup color={props.color} options={items} center />;
};

export default WikiHomeChipGroup;
