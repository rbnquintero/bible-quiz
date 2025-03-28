"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ChevronRight } from 'lucide-react'

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

export default function Home() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Load questions from JSON file
  useEffect(() => {
    async function loadQuestions() {
      try {
        const response = await fetch("/api/questions")
        const data = await response.json()
        setQuestions(data)
        selectRandomQuestion(data)
        setIsLoading(false)
      } catch (error) {
        console.error("Failed to load questions:", error)
        setIsLoading(false)
      }
    }

    loadQuestions()
  }, [])

  // Select a random question from the array
  const selectRandomQuestion = (questionArray: QuizQuestion[]) => {
    if (questionArray.length > 0) {
      const randomIndex = Math.floor(Math.random() * questionArray.length)
      setCurrentQuestion(questionArray[randomIndex])
      setSelectedAnswer(null)
      setIsAnswered(false)
    }
  }

  // Handle answer selection
  const handleAnswerSelect = (value: string) => {
    setSelectedAnswer(value)
    setIsAnswered(true)
  }

  // Handle next question button click
  const handleNextQuestion = () => {
    selectRandomQuestion(questions)
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
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-center mb-8">Preguntas Bíblicas</h1>

      {currentQuestion ? (
        <div className="space-y-8">
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
                  className={`flex items-start space-x-2 p-3 rounded-md ${
                    isAnswered && key === currentQuestion.answer.letter
                      ? "bg-green-100 dark:bg-green-900/30"
                      : isAnswered && key === selectedAnswer
                        ? "bg-red-100 dark:bg-red-900/30"
                        : "hover:bg-muted/50"
                  }`}
                >
                  <RadioGroupItem value={key} id={`option-${key}`} />
                  <Label htmlFor={`option-${key}`} className="flex-grow cursor-pointer">
                    <span className="font-medium">{key.toUpperCase()}:</span> {value}
                  </Label>
                  {isAnswered && key === currentQuestion.answer.letter && (
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
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
                  <Badge 
                    className={`mb-2 ${getSubjectBadgeColor(currentQuestion.context.subject)}`}
                  >
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
        </div>
      ) : (
        <div className="text-center">
          <p className="text-lg mb-4">No se pudieron cargar las preguntas.</p>
          <Button onClick={() => window.location.reload()}>Reintentar</Button>
        </div>
      )}
    </main>
  )
}