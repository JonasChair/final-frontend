import React, { useEffect, useState } from "react";
import cookie from "js-cookie";
import { useRouter } from "next/router";

import styles from "./styles.module.css";
import Link from "next/link";

const Header = () => {
    const [isUserLoggedIn, setUserLoggedIn] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const savedCookie = cookie.get("jwt_token");

        if (savedCookie) {
            setUserLoggedIn(true);
        }
    }, []);

    const onLogout = () => {
        cookie.remove('jwt_token');
        setUserLoggedIn(false);
        router.push('/');
    }

    return (
        <div className={styles.wrapper}>
            <Link className={styles.link} href="/">
                <div className={styles.logo}>Soup Bread & IT</div>
            </Link>

            <nav className={styles.navbar}>
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
                    <>
                        <li>
                            <Link className={styles.link} href="/login">
                                Log in
                            </Link>
                        </li>
                        <li>
                            <Link className={styles.link} href="/register">
                                Register
                            </Link>
                        </li>
                    </>
                }

            </nav>

        </div>
    )
}

export default Header;