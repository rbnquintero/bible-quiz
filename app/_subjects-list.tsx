"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, Check } from "lucide-react"

// Define the subjects and their colors
const subjects = [
  {
    name: "Conoce a Jesús",
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
    activeColor: "bg-green-600 text-white dark:bg-green-500",
  },
  {
    name: "Eres especial",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
    activeColor: "bg-blue-600 text-white dark:bg-blue-500",
  },
  {
    name: "Tu regalo especial",
    color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100",
    activeColor: "bg-orange-600 text-white dark:bg-orange-500",
  },
  {
    name: "Los que te rodean",
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
    activeColor: "bg-red-600 text-white dark:bg-red-500",
  },
  {
    name: "Observa la creación",
    color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
    activeColor: "bg-purple-600 text-white dark:bg-purple-500",
  },
]

interface SubjectsListProps {
  selectedSubjects: string[]
  onSubjectToggle: (subject: string) => void
}

export function SubjectsList({ selectedSubjects, onSubjectToggle }: SubjectsListProps) {
  const [showSubjects, setShowSubjects] = useState(false)

  return (
    <div className="mb-8 text-center">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowSubjects(!showSubjects)}
        className="text-muted-foreground mb-2 flex items-center gap-1"
      >
        {showSubjects ? "Esconder temas" : "Ver temas"}
        {showSubjects ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </Button>

      {showSubjects && (
        <div className="flex flex-wrap justify-center gap-2 mt-2 mb-4 animate-in fade-in duration-300">
          {subjects.map((subject) => {
            const isSelected = selectedSubjects.includes(subject.name)
            return (
              <Badge
                key={subject.name}
                className={`${isSelected ? subject.activeColor : subject.color} px-3 py-1 cursor-pointer transition-colors duration-200 flex items-center gap-1`}
                onClick={() => onSubjectToggle(subject.name)}
              >
                {isSelected && <Check size={14} />}
                {subject.name}
              </Badge>
            )
          })}
        </div>
      )}

      {selectedSubjects.length > 0 && (
        <div className="text-sm text-muted-foreground mt-2">
          <p className="flex flex-wrap items-center gap-1">
            Mostrando preguntas de:
            {selectedSubjects.map((subject, index) => {
              const subjectData = subjects.find((s) => s.name === subject)
              return (
                <span key={subject}>
                  <Badge className={`${subjectData?.color} ml-1`}>{subject}</Badge>
                  {index < selectedSubjects.length - 1 && <span className="mx-1">,</span>}
                </span>
              )
            })}
          </p>
          <Button
            variant="link"
            size="sm"
            onClick={() => selectedSubjects.forEach((s) => onSubjectToggle(s))}
            className="text-xs"
          >
            Limpiar filtros
          </Button>
        </div>
      )}
    </div>
  )
}

