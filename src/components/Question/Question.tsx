import React from "react";
import styles from "./styles.module.css";
import Link from "next/link";

type QuestionType = {
    _id: string;
    question_text: string;
    date: string;
    user_id: string;
};

type QuestionComponentType = {
    question : QuestionType;
};

const Question : React.FC<QuestionComponentType> = ({ question }) => {
    console.log(typeof question.date )
    return (
        <Link className={styles.link} href={`/question/${question._id}`}>
            <div className={styles.wrapper}>
                <div className={styles.text}>{question.question_text}</div>
                <div className={styles.date}>{new Date(question.date).toLocaleString()}</div>
            </div>
        </Link>
    )
}

export default Question;