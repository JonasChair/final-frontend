import React, { useEffect, useState } from "react";


import styles from "./styles.module.css";
import Link from "next/link";

const Header = () => {
    const [isUserLoggedIn, setUserLoggedIn] = useState(false);

    useEffect(() => {
        const savedCookie = true;

        if (savedCookie) {
            setUserLoggedIn(true);
        }
    }, []);

    const onLogout = () => {
        setUserLoggedIn(false);
    }

    return (
        <div className={styles.wrapper}>
            <Link className={styles.link} href="/">
                <div className={styles.logo}>Soup Bread & IT</div>
            </Link>

            <nav className={styles.navbar}>
                <li>
                    <Link className={styles.link} href="/questions">
                        Questions
                    </Link>
                </li>
                {isUserLoggedIn ?
                    (
                        <>
                            <li>
                                <Link className={styles.link} href="/add-question">
                                    Ask Question
                                </Link>
                            </li>
                            <li>
                                <button onClick={onLogout}>Log out</button>
                            </li>
                        </>
                    ) :
                    <li>
                        <Link className={styles.link} href="/login">
                            Log in
                        </Link>
                    </li>
                }

            </nav>

        </div>
    )
}

export default Header;