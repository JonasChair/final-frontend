import { useState } from "react";
import axios from "axios";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import styles from "./styles.module.css";

import PageTemplate from "@/components/PageTemplate/PageTemplate";

const Login = () => {
    const router = useRouter();

    const [email,setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const onLogin = async () => {
        const body = {
            email: email,
            password: password,
        };

        const response = await axios.post(
            `${process.env.SERVER_URL}/login`,
            body
        );

        if (response.status === 200) {
            cookie.set("jwt_token", response.data.token);
            router.push("/");
        }
    }

    return (
        <PageTemplate>
            <div className={styles.form}>
                <input 
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                />
                <button onClick={onLogin}>Login</button>
            </div>
        </PageTemplate>
    )
}

export default Login;