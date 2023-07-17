import React from "react";
import styles from "./styles/Nav.module.css";
import Logo from "./Logo";

export default function Nav() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.navItems}>
                <ul>
                    <li>
                   <Logo></Logo>
                    </li>
                    <li>
                        <a href="/">QR List</a>
                    </li>
                    <li>
                        <a href="/qrs">Generate QR</a>
                    </li>
                </ul>
            </div>
        </nav>




    );
}