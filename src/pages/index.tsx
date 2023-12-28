import { useEffect, useState } from "react";
import axios from "axios";
import cookie from "js-cookie";
import { useRouter } from "next/router";

import PageTemplate from "@/components/PageTemplate/PageTemplate";
import Questions from "@/components/Questions/Questions";

export default function Home() {
  const router = useRouter();

  const [questions, setQuestions] = useState<Array<any> | null>(null);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`${process.env.SERVER_URL}/questions`);
      setQuestions(response.data.questions)
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <PageTemplate>
      <Questions questions={questions} />
    </PageTemplate>
  )
}