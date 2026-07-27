import { 
  ArrowRightStartOnRectangleIcon,
  ArrowLeftStartOnRectangleIcon, 
  CursorArrowRaysIcon, 
  CalendarIcon, 
  AtSymbolIcon, 
  UserCircleIcon 
} from "@heroicons/react/24/solid";

export const RightIcon = <ArrowRightStartOnRectangleIcon className="w-6 h-6"/>
export const LeftIcon = <ArrowLeftStartOnRectangleIcon className="w-6 h-6"/>
export const DashboardIcon = () => <CursorArrowRaysIcon className="w-6 h-6" />;
export const EventsIcon = () => <CalendarIcon className="w-6 h-6" />;
export const ContactsIcon = () => <AtSymbolIcon className="w-6 h-6" />;
export const ProfileIcon = () => <UserCircleIcon className="w-6 h-6" />;
