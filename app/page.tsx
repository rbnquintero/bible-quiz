"use client"

import { useState } from "react"
import questions from './_questions.json'
import { SubjectsList } from "./_subjects-list"
import { QuizContainer } from "./_quiz-container"
import { PWAInstaller } from "./_pwa-installer"
import { UpdatePrompt } from "./_update-prompt"

export default function Home() {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])

  // Filter questions based on selected subjects
  const filteredQuestions =
    selectedSubjects.length > 0 ? questions.filter((q) => selectedSubjects.includes(q.context.subject)) : questions

  const handleSubjectToggle = (subject: string) => {
    setSelectedSubjects(
      (prev) =>
        prev.includes(subject)
          ? prev.filter((s) => s !== subject) // Remove if already selected
          : [...prev, subject], // Add if not selected
    )
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-center mb-2">Preguntas Bíblicas</h1>
      <SubjectsList selectedSubjects={selectedSubjects} onSubjectToggle={handleSubjectToggle} />
      <QuizContainer
        questions={filteredQuestions}
        key={selectedSubjects.join(",")} // Force re-render when selection changes
      />
      <PWAInstaller />
      <UpdatePrompt />
    </main>
  )
}

