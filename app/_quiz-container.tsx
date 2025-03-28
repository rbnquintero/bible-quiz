"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ChevronRight } from "lucide-react"
import confetti from "canvas-confetti"

// Define types for our quiz data
interface QuizOption {
  a: string
  b: string
  c: string
  d: string
}

interface QuizAnswer {
  letter: string
  text: string
}

interface QuizContext {
  subject: string
  title: string
  keyword: string
  significado: string
  verse: string
  cita: string
}

interface QuizQuestion {
  questionNumber: number
  page: number
  question: string
  options: QuizOption
  answer: QuizAnswer
  context: QuizContext
}

// Function to determine badge color based on subject
const getSubjectBadgeColor = (subject: string) => {
  switch (subject) {
    case "Conoce a Jesús":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
    case "Eres especial":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
    case "Tu regalo especial":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100"
    case "Los que te rodean":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
    case "Observa la creación":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
  }
}

// Function to trigger confetti effect
const triggerConfetti = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ["#4CAF50", "#FFC107", "#2196F3", "#9C27B0", "#FF5722"],
  })
}

interface QuizContainerProps {
  questions: QuizQuestion[]
}

export function QuizContainer({ questions }: QuizContainerProps) {
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [askedQuestions, setAskedQuestions] = useState<number[]>([])
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [totalAttempted, setTotalAttempted] = useState(0)

  // Calculate score on a 100-point scale
  const score = totalAttempted > 0 ? Math.round((correctAnswers / totalAttempted) * 100) : 0

  // Reset quiz when questions change (due to subject filtering)
  useEffect(() => {
    setAskedQuestions([])
    setCorrectAnswers(0)
    setTotalAttempted(0)
    localStorage.removeItem("askedQuestions")
    localStorage.removeItem("correctAnswers")
    localStorage.removeItem("totalAttempted")
    selectQuestion()
    setIsLoading(false)
  }, [questions])

  // Load asked questions from localStorage on component mount
  useEffect(() => {
    const storedAskedQuestions = localStorage.getItem("askedQuestions")
    if (storedAskedQuestions) {
      // Only load stored questions that are still in the filtered set
      const parsedQuestions = JSON.parse(storedAskedQuestions)
      const validQuestions = parsedQuestions.filter((qNum: number) => questions.some((q) => q.questionNumber === qNum))
      setAskedQuestions(validQuestions)
    }

    // Load score data from localStorage
    const storedCorrectAnswers = localStorage.getItem("correctAnswers")
    const storedTotalAttempted = localStorage.getItem("totalAttempted")

    if (storedCorrectAnswers) {
      setCorrectAnswers(Number.parseInt(storedCorrectAnswers))
    }

    if (storedTotalAttempted) {
      setTotalAttempted(Number.parseInt(storedTotalAttempted))
    }

    selectQuestion()
    setIsLoading(false)
  }, [])

  // Update localStorage when score changes
  useEffect(() => {
    localStorage.setItem("correctAnswers", correctAnswers.toString())
    localStorage.setItem("totalAttempted", totalAttempted.toString())
  }, [correctAnswers, totalAttempted])

  // Update localStorage when askedQuestions changes
  useEffect(() => {
    if (askedQuestions.length > 0) {
      localStorage.setItem("askedQuestions", JSON.stringify(askedQuestions))
    }
  }, [askedQuestions])

  // Select a question that hasn't been asked yet
  const selectQuestion = () => {
    // If all questions have been asked, reset the list
    if (askedQuestions.length >= questions.length) {
      setAskedQuestions([])
      localStorage.removeItem("askedQuestions")
    }

    // Filter out questions that have already been asked
    const availableQuestions = questions.filter((q) => !askedQuestions.includes(q.questionNumber))

    if (availableQuestions.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableQuestions.length)
      const selectedQuestion = availableQuestions[randomIndex]
      setCurrentQuestion(selectedQuestion)
      setSelectedAnswer(null)
      setIsAnswered(false)
    }
  }

  // Handle answer selection
  const handleAnswerSelect = (value: string) => {
    if (isAnswered) return // Prevent changing answer after submission

    setSelectedAnswer(value)
    setIsAnswered(true)
    setTotalAttempted((prev) => prev + 1)

    // Check if answer is correct
    const isCorrect = currentQuestion && value === currentQuestion.answer.letter

    // Increment score if answer is correct
    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1)
      // Trigger confetti effect for correct answers
      triggerConfetti()
    }
  }

  // Handle next question button click
  const handleNextQuestion = () => {
    if (currentQuestion) {
      // Add current question to the list of asked questions
      setAskedQuestions((prev) => [...prev, currentQuestion.questionNumber])
    }
    selectQuestion()
  }

  // Handle reset button click
  const handleReset = () => {
    setAskedQuestions([])
    setCorrectAnswers(0)
    setTotalAttempted(0)
    localStorage.removeItem("askedQuestions")
    localStorage.removeItem("correctAnswers")
    localStorage.removeItem("totalAttempted")
    selectQuestion()
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Cargando preguntas...</h2>
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {currentQuestion ? (
        <>
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">{currentQuestion.question}</h2>

            <RadioGroup
              value={selectedAnswer || ""}
              onValueChange={handleAnswerSelect}
              disabled={isAnswered}
              className="space-y-3"
            >
              {Object.entries(currentQuestion.options).map(([key, value]) => (
                <div
                  key={key}
                  onClick={() => !isAnswered && handleAnswerSelect(key)}
                  className={`flex items-start space-x-2 p-3 rounded-md cursor-pointer ${
                    isAnswered && key === currentQuestion.answer.letter
                      ? "bg-green-100 dark:bg-green-900/30"
                      : isAnswered && key === selectedAnswer
                        ? "bg-red-100 dark:bg-red-900/30"
                        : "hover:bg-muted/50"
                  }`}
                >
                  <RadioGroupItem value={key} id={`option-${key}`} className="pointer-events-none" />
                  <Label htmlFor={`option-${key}`} className="flex-grow cursor-pointer pointer-events-none">
                    <span className="font-medium">{key.toUpperCase()}:</span> {value}
                  </Label>
                  {isAnswered && key === currentQuestion.answer.letter && (
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 pointer-events-none"
                    >
                      Correcto
                    </Badge>
                  )}
                </div>
              ))}
            </RadioGroup>
          </Card>

          {isAnswered && (
            <Card className="p-6 bg-muted/30">
              <h3 className="text-lg font-semibold mb-2">Información Adicional</h3>
              <div className="space-y-4">
                <div>
                  <Badge className={`mb-2 ${getSubjectBadgeColor(currentQuestion.context.subject)}`}>
                    {currentQuestion.context.subject}
                  </Badge>
                  <h4 className="font-medium">{currentQuestion.context.title}</h4>
                </div>

                <Separator />

                <div>
                  <p className="font-semibold">Palabra clave: {currentQuestion.context.keyword}</p>
                  <p className="text-muted-foreground">{currentQuestion.context.significado}</p>
                </div>

                <div className="bg-primary/10 p-3 rounded-md italic">
                  <p>"{currentQuestion.context.verse}"</p>
                  <p className="text-right font-medium mt-1">{currentQuestion.context.cita}</p>
                </div>
              </div>
            </Card>
          )}

          <div className="flex justify-center">
            <Button onClick={handleNextQuestion} size="lg" className="gap-2">
              {isAnswered ? "Siguiente Pregunta" : "Otra Pregunta"}
              <ChevronRight size={18} />
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center">
          <p className="text-lg mb-4">No se pudieron cargar las preguntas.</p>
          <Button onClick={() => window.location.reload()}>Reintentar</Button>
        </div>
      )}

      <div className="text-center text-sm text-muted-foreground mt-8">
        <div className="flex justify-between items-center mb-2">
          <p>
            Preguntas respondidas: {askedQuestions.length} de {questions.length}
          </p>
          <div className="flex items-center gap-2">
            <p className="font-medium">
              Puntuación: <span className="text-primary">{score}</span>
            </p>
            <Badge
              variant="outline"
              className={
                score >= 70
                  ? "bg-green-100 text-green-800"
                  : score >= 50
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
              }
            >
              {correctAnswers}/{totalAttempted}
            </Badge>
          </div>
        </div>
        {askedQuestions.length === questions.length && (
          <p className="mt-2 font-medium text-primary">
            ¡Has completado todas las preguntas! El próximo ciclo comenzará con nuevas preguntas.
          </p>
        )}
        <Button variant="outline" size="sm" onClick={handleReset} className="mt-4">
          Reiniciar Quiz
        </Button>
      </div>
    </div>
  )
}

