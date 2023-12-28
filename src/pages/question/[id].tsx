import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import cookie from "js-cookie";


import styles from "./styles.module.css";
import Button from "@/components/Button/Button";
import PageTemplate from "@/components/PageTemplate/PageTemplate";

const dateFormat = new Intl.DateTimeFormat('lt-LT', { dateStyle: 'short', timeStyle: 'medium' });

type QuestionWithAnswersType = {
    _id: string;
    question_text: string;
    date: string;
    question_answers: Array<any> | null;
    user_name: string;
    user_id: string;
}

const QuestionWithAnswers = () => {
    const [question, setQuestion] = useState<QuestionWithAnswersType | null>(null);
    const [answer, setAnswer] = useState<string>("");

    const router = useRouter();

    const fetchQuestion = async (id: string) => {

        const question = await axios.get(
            `${process.env.SERVER_URL}/questions/${id}`
        )
        setQuestion(question.data.question[0]);
    }

    useEffect(() => {
        router.query.id && fetchQuestion(router.query.id as string);
    }, [router.query.id]);

    const onSubmit = async () => {
        try {
            const headers = {
                authorization: cookie.get("jwt_token"),
            }

            const body = {
                answer_text: answer
            }

            const response = await axios.post(
                `${process.env.SERVER_URL}/questions/${question?._id}/answers`, body,
                {
                    headers,
                }
            )

            if (response.status === 200) {
                router.reload();
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const onDeleteQuestion = async () => {
        try {
            const headers = {
                authorization: cookie.get("jwt_token"),
            }

            const response = await axios.delete(
                `${process.env.SERVER_URL}/questions/${question?._id}`, {
                headers,
            }
            )

            if (response.status === 200) {
                router.push("/");
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <PageTemplate>
            {question && (
                <div className={styles.wrapper}>
                    <div className={styles.question}>
                        <div className={styles.text}>{question.question_text}</div>
                        <div className={styles.date}>Posted on: {dateFormat.format(new Date(question.date))}</div>
                        <Button
                            className={styles.deleteButton}
                            text="X"
                            onClick={onDeleteQuestion}
                        />
                    </div>
                    <div className={styles.answers}>
                        {question.question_answers &&
                            question.question_answers.map((answer) => (
                                <div className={styles.answer} key={answer._id}>
                                    <div >{answer.answer_text}</div>
                                    <div className={styles.date}>Posted on: {dateFormat.format(new Date(answer.date))}</div>
                                </div>
                            ))}
                    </div>
                </div>
            )}
            <div className={styles.form}>
                <input
                    placeholder="insert your answer"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                />
                <button onClick={onSubmit}>Submit</button>
            </div>
        </PageTemplate>
    )
}

export default QuestionWithAnswers;