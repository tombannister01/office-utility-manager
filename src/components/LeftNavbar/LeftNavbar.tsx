"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconHome,
  IconHomeFilled,
  IconCalendarWeek,
  IconCalendarWeekFilled,
  IconQrcode,
  IconBuilding,
  IconLogin,
  IconTopologyStarRing3,
  TablerIcon,
} from "@tabler/icons-react";
import classes from "../styles/Navbar.module.css";

interface NavItem {
  href: string;
  Icon: TablerIcon;
  IconFilled?: TablerIcon;
  label: string;
}

const mainLinks: NavItem[] = [
  { href: "/", Icon: IconHome, IconFilled: IconHomeFilled, label: "Home" },
  {
    href: "/meeting-room-bookings",
    Icon: IconCalendarWeek,
    IconFilled: IconCalendarWeekFilled,
    label: "Bookings",
  },
  { href: "/", Icon: IconQrcode, label: "Check-in" },
];

const bottomLinks: NavItem[] = [
  { href: "/", Icon: IconBuilding, label: "Buildings" },
  { href: "/", Icon: IconLogin, label: "Logout" },
];

export function LeftNavbar() {
  const pathname = usePathname();

  return (
    <nav className={`${classes.navbarBase} ${classes.navbarLeft}`}>
      <div
        className={classes.navbarLogo}
        onClick={() => (window.location.href = "/")}
        style={{ cursor: "pointer" }}
      >
        <IconTopologyStarRing3 stroke={2} size={32} />
      </div>

      <div className={classes.navbarMain}>
        {mainLinks.map(({ href, Icon, IconFilled, label }) => {
          const isActive = href === pathname;
          const IconComponent = isActive && IconFilled ? IconFilled : Icon;
          return (
            <Link key={label} href={href} className={classes.link} title={label}>
              <IconComponent stroke={2} size={24} />
            </Link>
          );
        })}
      </div>

      <div className={classes.navbarBottom}>
        {bottomLinks.map(({ href, Icon, label }) => (
          <Link key={label} href={href} className={classes.link} title={label}>
            <Icon stroke={2} size={24} />
          </Link>
        ))}
      </div>
    </nav>
  );
}