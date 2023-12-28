import { useState } from "react";
import axios from "axios";
import styles from "./style.module.css"
import cookie from "js-cookie"
import { useRouter } from "next/router";
import PageTemplate from "@/components/PageTemplate/PageTemplate";

const AddQuestion = () => {
    const [question, setQuestion] = useState<string>("");

    const router = useRouter();

    const onSubmit = async () => {
        const headers = {
            authorization: cookie.get("jwt_token"),
        }

        const body = {
            question_text: question
        }

        const response = await axios.post(
            `${process.env.SERVER_URL}/questions/`, body,
            {
                headers,
            }
        )

        if (response.status === 200) {
            router.push("/");
        }
    }

    return (
        <PageTemplate>
            <div className={styles.form}>
                <input
                    placeholder="insert your question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />
                <button onClick={onSubmit}>Submit</button>
            </div>
        </PageTemplate>
    )
}

export default AddQuestion;