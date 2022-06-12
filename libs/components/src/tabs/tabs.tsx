import cn from 'classnames';
import Link from 'next/link';

interface Tab {
  label: string;
  icon?: (className: string) => JSX.Element;
  hash: string;
}

interface Props {
  selectedTab: number;
  tabs: Array<Tab>;
  onChange: (value: number) => void;
}

export const Tabs: React.FC<Props> = ({ selectedTab, tabs, onChange }) => {
  /**
   * Renders a tab
   * @param tab
   * @returns A rendered tab
   */
  const _renderTab = (item: Tab, index: number) => {
    const className = cn(
      'flex flex-row items-center justify-center px-8 py-3 font-medium text-sm rounded-md transition-colors',
      {
        'bg-secondary-100 text-secondary-700': index === selectedTab,
        'text-secondary-500 hover:text-secondary-700': index !== selectedTab
      }
    );
    return (
      <Link
        key={`${index}`}
        href={{
          hash: item.hash
        }}
      >
        <a onClick={() => onChange(index)} className={className}>
          {/* icon */}
          {item.icon && item.icon('h-5 w-5 mr-2 hidden md:block')}
          {/* label */}
          {item.label}
        </a>
      </Link>
    );
  };

  return (
    <div className="bg-gray-100 p-4 max-w-screen">
      {/* mobile */}
      {/* <div className="hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full focus:ring-primary-500 focus:border-primary-500 border-gray-300 rounded-md"
          onChange={(e) => onChange(parseInt(e.target.value))}
        >
          {tabs.map((t, i) => (
            <option key={`${i}`} value={`${i}`} selected={i === selectedTab}>
              {t.label}
            </option>
          ))}
        </select>
      </div> */}
      {/* desktop tabs */}
      <div className="block">
        <nav className="flex space-x-4" aria-label="Tabs">
          {tabs.map((t, i) => _renderTab(t, i))}
        </nav>
      </div>
    </div>
  );
};
