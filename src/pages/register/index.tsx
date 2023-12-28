import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "./styles.module.css";

import PageTemplate from "@/components/PageTemplate/PageTemplate";

const Register = () => {
    const router = useRouter();

    const [name,setName] = useState<string>("");
    const [email,setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const onRegister = async () => {
        const body = {
            name,
            email,
            password,
        };

        const response = await axios.post(
            `${process.env.SERVER_URL}/register`,
            body
        );

        if (response.status === 200) {
            router.push("/login");
        }
    }

    return (
        <PageTemplate>
            <div className={styles.form}>
                <input 
                    placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
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
                <button onClick={onRegister}>Register</button>
            </div>
        </PageTemplate>
    )
}

export default Register;