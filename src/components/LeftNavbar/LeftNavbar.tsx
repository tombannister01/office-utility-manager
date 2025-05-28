import Link from "next/link";
import classes from "../styles/Navbar.module.css";

export function LeftNavbar() {
  return (
    <nav className={`${classes.navbarBase} ${classes.navbarLeft}`}>
      <div className={classes.navbarMain}>
        <Link href="/meeting-room-bookings" className={classes.link}>
          Dash
        </Link>
        <Link href="/reports" className={classes.link}>
          Reports
        </Link>
      </div>
    </nav>
  );
}
