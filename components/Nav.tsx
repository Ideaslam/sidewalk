import React, { useEffect, useState } from "react";
import styles from "./styles/Nav.module.css";
import Logo from "./Logo";
import AuthButtons from "./AuthButtons";
import keycloak from '../utils/keycloakConfig';

export default function Nav() {



    const handleLogout = async () => {
        (await keycloak()).logout();
    };
    const handleLogin = async () => {

        (await keycloak()).login();
    };

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

                    <li> 
                        <button onClick={handleLogout}>Logout</button> 
                    </li>
                </ul>
            </div>
        </nav>




    );
}