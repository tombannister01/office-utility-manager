"use client";

import Link from "next/link";
import {
  IconHome,
  IconCalendarWeek,
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
  label: string;
}

const mainLinks: NavItem[] = [
  { href: "/", Icon: IconHome, label: "Home" },
  { href: "/meeting-room-bookings", Icon: IconCalendarWeek, label: "Bookings" },
  { href: "/", Icon: IconQrcode, label: "Check-in" },
];

const bottomLinks: NavItem[] = [
  { href: "/", Icon: IconLogin, label: "Login" },
  { href: "/", Icon: IconBuilding, label: "Buildings" },
];

export function LeftNavbar() {
  return (
    <nav className={`${classes.navbarBase} ${classes.navbarLeft}`}>
      <div className={classes.navbarLogo}>
        <IconTopologyStarRing3 stroke={2} size={32} />
      </div>

      <div className={classes.navbarMain}>
        {mainLinks.map(({ href, Icon, label }) => (
          <Link key={label} href={href} className={classes.link} title={label}>
            <Icon stroke={2} size={24} />
          </Link>
        ))}
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
