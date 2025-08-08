import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { NavigationItem } from "@/constants/navigation";
import { getNavLinkClasses, SIDEBAR_CLASSES } from "@/utils/sidebarUtils";

interface NavigationItemProps {
  item: NavigationItem;
  isActive: boolean;
  onItemClick: () => void;
}

export default function NavigationItemComponent({
  item,
  isActive,
  onItemClick,
}: NavigationItemProps) {
  const navLinkClasses = getNavLinkClasses(isActive);

  const content = (
    <>
      <item.icon className={SIDEBAR_CLASSES.NAV_ICON} size={16} />
      <span className={SIDEBAR_CLASSES.NAV_TEXT}>{item.name}</span>
      {item.hasDropdown && (
        <ChevronDown className={SIDEBAR_CLASSES.NAV_DROPDOWN_ICON} size={12} />
      )}
    </>
  );

  return item.hasDropdown ? (
    <span className={navLinkClasses}>{content}</span>
  ) : (
    <Link to={item.path} className={navLinkClasses} onClick={onItemClick}>
      {content}
    </Link>
  );
}
