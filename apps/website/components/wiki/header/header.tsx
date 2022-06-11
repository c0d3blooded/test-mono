import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { HiMenuAlt2, HiSearch } from 'react-icons/hi';
import Button from '../../common/button';
import Input from '../../common/input';

interface Props {
  onOpenSidebar: () => void;
}
const WikiHeader: React.FC<Props> = ({ onOpenSidebar }) => {
  const router = useRouter();
  const [sarchText, setSearchText] = useState<string>();
  /* User searches text */
  const onSearch = () => {
    router.push('/wiki/1');
  };

  /**
   *
   * @returns A rendered search result
   */
  //  const _renderResult = () => {
  //   return (
  //     <Link href="/wiki/1">
  //       <a>
  //         <li className="flex flex-col cursor-pointer select-none px-4 py-2 hover:bg-secondary-500 hover:text-white">
  //           <span className="">Common name</span>
  //           <span className="text-gray-400">botanical name</span>
  //         </li>
  //       </a>
  //     </Link>
  //   );
  // };

  return (
    <div
      className="flex flex-row px-3 items-center w-full bg-gradient-to-r from-green-400 to-green-700"
      aria-modal="true"
    >
      <div className="flex overflow-y-auto py-4 w-7/8 lg:w-1/3 flex-1">
        <button
          type="button"
          className="border-r border-gray-200 px-4 mr-4 text-gray-500 focus:outline-none md:hidden"
          onClick={onOpenSidebar}
        >
          <span className="sr-only">Open sidebar</span>
          <HiMenuAlt2 className="h-6 w-6 text-white" />
        </button>
        <div className="flex flex-1 flex-row items-center px-4 transform divide-y divide-gray-100 rounded-xl bg-white shadow-md ring-1 ring-black ring-opacity-5 transition-all">
          <HiSearch className="pointer-events-none h-5 w-5 text-gray-400" />
          {/* search */}
          <Input
            containerClassName="flex-1"
            inputProps={{
              type: 'text',
              placeholder:
                'Search (e.g. fruiting trees, ground cover 11a, etc)',
              onChange: (e) => setSearchText(e.target.value),
              onKeyUp: (e) => {
                if (e.key === 'Enter') onSearch();
              },
              role: 'combobox',
              'aria-expanded': 'false',
              'aria-controls': 'options',
              className:
                'w-full h-12 pt-4 border-0 bg-transparent text-gray-800 placeholder-gray-400 focus:ring-0 text-sm'
            }}
          />
          {/* search button */}
          <Button
            buttonProps={{
              onClick: () => onSearch()
            }}
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WikiHeader;
