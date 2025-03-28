import { QuizContainer } from "./_quiz-container";
import questions from './_questions.json'

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-center mb-8">Preguntas Bíblicas</h1>
      <QuizContainer questions={questions} />
    </main>
  )
}