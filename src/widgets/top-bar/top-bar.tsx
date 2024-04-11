import { useNavbarContext } from '@/widgets/navbar/navbar-context';
import { SearchDetailsBar } from '@features/search-details/search-details-bar';
import { NavbarSwitcher } from '@widgets/navbar/navbar-switcher';
import classNames from 'classnames';
import { Profile } from './_ui/profile';

interface TopBarProps {
  className?: string;
}

export const TopBar = (props: TopBarProps) => {
  const { className } = props;
  const { navbarIsActive, changeNavbarIsActive } = useNavbarContext();
  const onNavbarSwitcherClick = () => {
    changeNavbarIsActive(!navbarIsActive);
  };
  return (
    <div
      className={classNames(
        'flex items-center justify-between fixed gap-4 top-0 right-0 left-0 border-b-[1px] border-b-gray h-topBar pl-pageLeft pr-pageRight bg-white z-topBar transition-margin py-2 sm:ml-navbar',
        className,
      )}
    >
      <div className={'flex gap-4 items-center h-full w-full'}>
        <NavbarSwitcher onClick={onNavbarSwitcherClick} navbarIsActive={navbarIsActive} />
        <SearchDetailsBar className={'h-full'} />
      </div>
      <Profile />
    </div>
  );
};

// export default TopBar;
