"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Trophy, Twitter, Instagram, Sparkles, Brain, Zap } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Question {
  id: number
  question: string
  options: string[]
  correct: number
  explanation?: string
}

interface Score {
  name: string
  score: number
  date: string
}

const questions: Question[] = [
  {
    id: 1,
    question: "Which sentence is grammatically correct?",
    options: [
      "Me and my friend went to the store",
      "My friend and I went to the store",
      "My friend and me went to the store",
      "I and my friend went to the store",
    ],
    correct: 1,
    explanation: "Always put the other person first, and use 'I' as the subject!",
  },
  {
    id: 2,
    question: "What's the correct use of 'your' vs 'you're'?",
    options: ["Your going to love this!", "You're dog is so cute!", "You're going to love this!", "Your welcome!"],
    correct: 2,
    explanation: "You're = You are. Your = possessive. Easy peasy!",
  },
  {
    id: 3,
    question: "Which is the proper comma usage?",
    options: [
      "I went to the store, and bought milk bread and eggs",
      "I went to the store and bought milk, bread, and eggs",
      "I went to the store and bought milk bread, and eggs",
      "I went to the store, and bought milk, bread and eggs",
    ],
    correct: 1,
    explanation: "The Oxford comma saves lives: 'Let's eat, Grandma!' vs 'Let's eat Grandma!'",
  },
  {
    id: 4,
    question: "What's wrong with this sentence: 'Between you and I, this is secret.'",
    options: [
      "Nothing, it's perfect",
      "Should be 'Between you and me'",
      "Should be 'Among you and I'",
      "Should be 'Between yourself and I'",
    ],
    correct: 1,
    explanation: "After prepositions like 'between', use object pronouns (me, not I)!",
  },
  {
    id: 5,
    question: "Which sentence uses 'affect' correctly?",
    options: [
      "The rain will effect our picnic plans",
      "The rain will affect our picnic plans",
      "The affect of rain on our picnic",
      "Rain has a good affect on plants",
    ],
    correct: 1,
    explanation: "Affect = verb (to influence), Effect = noun (result) A for Action, E for End result!",
  },
]

const correctMessages = [
  "🎉 Yasss! You're a grammar guru!",
  "✨ Absolutely brilliant! Shakespeare is shaking!",
  "🔥 On fire! Your English teacher would be proud!",
  "💯 Perfect! You're basically a walking dictionary!",
  "🚀 Stellar! NASA wants to hire you for their grammar missions!",
  "🎯 Bullseye! You hit that answer like a pro!",
  "⭐ Magnificent! You're glowing with grammar greatness!",
]

const wrongMessages = [
  "😅 Oops! Even autocorrect makes mistakes sometimes!",
  "🤔 Close, but no cigar! Grammar is tricky business!",
  "😬 Uh oh! That answer went on a little vacation!",
  "🙈 Don't worry, even Shakespeare had rough drafts!",
  "💭 Nice try! Your brain was in the right neighborhood!",
  "🎭 Plot twist! That wasn't quite the right answer!",
  "🤷‍♀️ Hey, at least you're learning! Growth mindset!",
]

const getLearningContent = (questionId: number) => {
  const learningData = {
    1: {
      emoji: "👑",
      title: "The Royal Order Rule",
      explanation:
        "Always put the other person first in a sentence - it's like being polite in grammar! 'My friend and I' sounds way classier than 'Me and my friend.'",
      memeTrick:
        "Think of it as grammar etiquette: Would you walk through a door before your friend? Nope! Same with sentences! 🚪👫",
      proTip:
        "Quick test: Remove the other person from the sentence. 'I went to the store' ✅ vs 'Me went to the store' ❌",
    },
    2: {
      emoji: "🔄",
      title: "The Contraction Confusion",
      explanation:
        "You're = You are (contraction). Your = belongs to you (possessive). It's like the difference between 'you are awesome' and 'your awesomeness'!",
      memeTrick:
        "If you can replace it with 'you are' and it still makes sense, use YOU'RE. Otherwise, it's YOUR problem! 😄",
      proTip:
        "When in doubt, expand it! 'You are going to love this' = You're. 'You are dog is cute' = Nope, that's YOUR!",
    },
    3: {
      emoji: "🍽️",
      title: "The Life-Saving Oxford Comma",
      explanation:
        "The Oxford comma (also called serial comma) goes before 'and' in a list. It prevents hilarious misunderstandings!",
      memeTrick:
        "Remember: 'I love my parents, Lady Gaga and Humpty Dumpty' vs 'I love my parents, Lady Gaga, and Humpty Dumpty' - Unless Lady Gaga and Humpty Dumpty are your parents! 🥚👨‍👩‍👧‍👦",
      proTip:
        "When listing 3+ items, always use the Oxford comma. It's like wearing a seatbelt - better safe than sorry!",
    },
    4: {
      emoji: "🎯",
      title: "The Preposition Position",
      explanation:
        "After prepositions (between, with, for, etc.), use object pronouns (me, him, her, us, them) not subject pronouns (I, he, she, we, they).",
      memeTrick:
        "Think of prepositions as bridges, and you need the 'object' form to cross them! 'Between you and ME' - not 'I'! 🌉",
      proTip: "Remove the other person: 'Between I' sounds wrong, 'Between me' sounds right. Trust your ears!",
    },
    5: {
      emoji: "⚡",
      title: "The Affect vs Effect Effect",
      explanation: "AFFECT is a verb (action) - it influences something. EFFECT is a noun (result) - it's the outcome.",
      memeTrick:
        "A for Affect = Action! E for Effect = End result! Or remember: 'The rain will AFFECT my hair, and the EFFECT will be a disaster!' 💇‍♀️☔",
      proTip: "Try substituting 'influence' for affect and 'result' for effect. If it works, you've got the right one!",
    },
  }

  return (
    learningData[questionId] || {
      emoji: "🤔",
      title: "Grammar Mystery",
      explanation: "Every grammar rule has a story!",
      memeTrick: "When in doubt, Google it out! 📱",
      proTip: "Practice makes perfect!",
    }
  )
}

export default function WritingSkillsQuiz() {
  const [gameState, setGameState] = useState<"start" | "quiz" | "results" | "leaderboard" | "learning">("start")
  const [playerName, setPlayerName] = useState("")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState("")
  const [isCorrect, setIsCorrect] = useState(false)
  const [leaderboard, setLeaderboard] = useState<Score[]>([])
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null)

  useEffect(() => {
    const savedScores = localStorage.getItem("writingQuizScores")
    if (savedScores) {
      setLeaderboard(JSON.parse(savedScores))
    }
  }, [])

  const startQuiz = () => {
    if (playerName.trim()) {
      setGameState("quiz")
      setCurrentQuestion(0)
      setScore(0)
    }
  }

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return

    setSelectedAnswer(answerIndex)
    const correct = answerIndex === questions[currentQuestion].correct
    setIsCorrect(correct)

    if (correct) {
      setScore(score + 1)
      setFeedbackMessage(correctMessages[Math.floor(Math.random() * correctMessages.length)])
    } else {
      setFeedbackMessage(wrongMessages[Math.floor(Math.random() * wrongMessages.length)])
    }

    setShowFeedback(true)

    setTimeout(() => {
      setShowFeedback(false)
      setSelectedAnswer(null)

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        finishQuiz()
      }
    }, 3000)
  }

  const finishQuiz = () => {
    const newScore: Score = {
      name: playerName,
      score: score,
      date: new Date().toLocaleDateString(),
    }

    const updatedLeaderboard = [...leaderboard, newScore].sort((a, b) => b.score - a.score).slice(0, 10)

    setLeaderboard(updatedLeaderboard)
    localStorage.setItem("writingQuizScores", JSON.stringify(updatedLeaderboard))
    setGameState("results")
  }

  const shareToTwitter = () => {
    const text = `Just crushed the Writing Skills Quiz with ${score}/${questions.length}! 🔥📝 My grammar game is STRONG! 💪 Think you can beat my score? Take the challenge at [your-website.com] #WritingSkillsQuiz #GrammarGuru #ChallengeAccepted`
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, "_blank")
  }

  const shareToInstagram = () => {
    const text = `OMG just SLAYED the Writing Skills Quiz! 🔥📝 Got ${score}/${questions.length} and I'm feeling like Shakespeare's cousin! 💅✨ Your turn to prove your grammar game at [your-website.com] 🎯 #WritingSkillsQuiz #GrammarQueen`
    navigator.clipboard.writeText(text)
    alert("Epic share text copied! 📱✨ Paste it in your Instagram story and watch your friends cry! 😂")
  }

  const resetQuiz = () => {
    setGameState("start")
    setPlayerName("")
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowFeedback(false)
  }

  if (gameState === "start") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-100 to-rose-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full max-w-md shadow-2xl border-0">
            <CardHeader className="text-center space-y-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <Brain className="w-16 h-16 mx-auto text-amber-600" />
              </motion.div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent">
                Writing Skills Quiz
              </CardTitle>
              <CardDescription className="text-lg">
                Test your grammar knowledge and become a writing wizard! ✨
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  What's your name, future grammar guru?
                </label>
                <Input
                  id="name"
                  placeholder="Enter your name..."
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="text-center text-lg"
                />
              </div>
              <Button
                onClick={startQuiz}
                disabled={!playerName.trim()}
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-lg py-6"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Start the Challenge!
              </Button>
              <Button variant="outline" onClick={() => setGameState("leaderboard")} className="w-full">
                <Trophy className="w-4 h-4 mr-2" />
                View Leaderboard
              </Button>
              <Button variant="outline" onClick={() => setGameState("learning")} className="w-full">
                <Brain className="w-4 h-4 mr-2" />
                Learning Hub
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  if (gameState === "quiz") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-100 via-neutral-50 to-amber-50 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <motion.div
            key={currentQuestion}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="shadow-2xl border-0">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <Badge variant="secondary" className="text-lg px-4 py-2">
                    Question {currentQuestion + 1} of {questions.length}
                  </Badge>
                  <Badge variant="outline" className="text-lg px-4 py-2">
                    Score: {score}
                  </Badge>
                </div>
                <CardTitle className="text-2xl mt-4">{questions[currentQuestion].question}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.div key={index} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      variant={
                        selectedAnswer === index
                          ? index === questions[currentQuestion].correct
                            ? "default"
                            : "destructive"
                          : "outline"
                      }
                      className="w-full text-left justify-start p-6 text-lg h-auto"
                      onClick={() => handleAnswer(index)}
                      disabled={selectedAnswer !== null}
                    >
                      <span className="font-bold mr-3">{String.fromCharCode(65 + index)}.</span>
                      {option}
                    </Button>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6"
            >
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-amber-700">Progress</span>
                    <span className="text-sm font-medium text-amber-700">
                      {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
                    </span>
                  </div>

                  {/* Progress Bar Background */}
                  <div className="w-full bg-amber-100 rounded-full h-3 overflow-hidden shadow-inner">
                    {/* Progress Bar Fill */}
                    <motion.div
                      className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full shadow-sm"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                      }}
                      transition={{
                        duration: 0.8,
                        ease: "easeOut",
                        delay: 0.3,
                      }}
                    />
                  </div>

                  {/* Question Indicators */}
                  <div className="flex justify-between mt-3">
                    {questions.map((_, index) => (
                      <motion.div
                        key={index}
                        className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                          index < currentQuestion
                            ? "bg-green-400 border-green-500 shadow-sm"
                            : index === currentQuestion
                              ? "bg-amber-400 border-amber-500 shadow-sm scale-125"
                              : "bg-white border-amber-300"
                        }`}
                        initial={{ scale: 0 }}
                        animate={{ scale: index <= currentQuestion ? 1 : 0.8 }}
                        transition={{ delay: index * 0.1 + 0.5 }}
                      />
                    ))}
                  </div>

                  {/* Progress Text */}
                  <div className="text-center mt-2">
                    <span className="text-xs text-amber-600 font-medium">
                      Question {currentQuestion + 1} of {questions.length}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <AnimatePresence>
            {showFeedback && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50"
              >
                <motion.div
                  initial={{ y: 50, scale: 0.8 }}
                  animate={{ y: 0, scale: 1 }}
                  exit={{ y: -50, scale: 0.8 }}
                  transition={{ type: "spring", damping: 15 }}
                >
                  <Card
                    className={`max-w-lg mx-4 shadow-2xl border-0 ${
                      isCorrect
                        ? "bg-gradient-to-br from-green-50 to-emerald-100"
                        : "bg-gradient-to-br from-red-50 to-rose-100"
                    }`}
                  >
                    <CardContent className="text-center p-8 space-y-6">
                      <motion.div
                        animate={{
                          rotate: isCorrect ? [0, 10, -10, 0] : [0, -5, 5, 0],
                          scale: [1, 1.2, 1],
                        }}
                        transition={{ duration: 0.6, repeat: 1 }}
                        className={`text-8xl mb-4 ${isCorrect ? "drop-shadow-lg" : ""}`}
                      >
                        {isCorrect ? "🎉" : "😅"}
                      </motion.div>

                      <div
                        className={`p-4 rounded-xl ${
                          isCorrect ? "bg-green-100 border-2 border-green-300" : "bg-red-100 border-2 border-red-300"
                        }`}
                      >
                        <h3 className={`text-2xl font-bold mb-2 ${isCorrect ? "text-green-800" : "text-red-800"}`}>
                          {feedbackMessage}
                        </h3>
                      </div>

                      {questions[currentQuestion].explanation && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-amber-200"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">💡</span>
                            <span className="font-semibold text-amber-800">Pro Tip:</span>
                          </div>
                          <p className="text-amber-700 text-sm leading-relaxed">
                            {questions[currentQuestion].explanation}
                          </p>
                        </motion.div>
                      )}

                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 3 }}
                        className={`h-1 rounded-full ${isCorrect ? "bg-green-400" : "bg-red-400"}`}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    )
  }

  if (gameState === "results") {
    const percentage = Math.round((score / questions.length) * 100)
    const getGrade = () => {
      if (percentage >= 90) return { grade: "A+", emoji: "🏆", message: "Grammar Genius!" }
      if (percentage >= 80) return { grade: "A", emoji: "⭐", message: "Excellent Writer!" }
      if (percentage >= 70) return { grade: "B", emoji: "👏", message: "Good Job!" }
      if (percentage >= 60) return { grade: "C", emoji: "👍", message: "Not Bad!" }
      return { grade: "D", emoji: "📚", message: "Keep Learning!" }
    }

    const result = getGrade()

    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-orange-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full max-w-md shadow-2xl border-0">
            <CardHeader className="text-center space-y-4">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                className="text-8xl"
              >
                {result.emoji}
              </motion.div>
              <CardTitle className="text-3xl font-bold">Congratulations, {playerName}!</CardTitle>
              <CardDescription className="text-xl">{result.message}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-center">
              <div className="space-y-2">
                <div className="text-6xl font-bold text-primary">
                  {score}/{questions.length}
                </div>
                <div className="text-2xl font-semibold">Grade: {result.grade}</div>
                <div className="text-lg text-muted-foreground">{percentage}% Correct</div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Share Your Achievement!</h3>
                <div className="flex gap-3">
                  <Button onClick={shareToTwitter} className="flex-1 bg-transparent" variant="outline">
                    <Twitter className="w-4 h-4 mr-2" />
                    Twitter
                  </Button>
                  <Button onClick={shareToInstagram} className="flex-1 bg-transparent" variant="outline">
                    <Instagram className="w-4 h-4 mr-2" />
                    Instagram
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <Button onClick={resetQuiz} className="w-full">
                  <Zap className="w-4 h-4 mr-2" />
                  Play Again
                </Button>
                <Button onClick={() => setGameState("leaderboard")} variant="outline" className="w-full">
                  <Trophy className="w-4 h-4 mr-2" />
                  View Leaderboard
                </Button>
              </div>
            </CardContent>
            {/* Learning Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-6"
            >
              <Card className="shadow-xl border-0 bg-gradient-to-br from-amber-50 to-orange-50">
                <CardHeader className="text-center pb-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-3xl">🎓</span>
                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent">
                      Grammar Bootcamp
                    </CardTitle>
                    <span className="text-3xl">📚</span>
                  </div>
                  <CardDescription className="text-lg">Time to level up your writing game! 💪✨</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {questions.map((question, index) => {
                    const wasWrong = selectedAnswer !== question.correct
                    const learningContent = getLearningContent(question.id)

                    return (
                      <motion.div
                        key={question.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 + index * 0.2 }}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                          wasWrong
                            ? "bg-gradient-to-r from-red-50 to-rose-100 border-red-200 shadow-md"
                            : "bg-gradient-to-r from-green-50 to-emerald-100 border-green-200 shadow-sm"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="text-3xl mt-1">{wasWrong ? "🤯" : "🧠"}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant={wasWrong ? "destructive" : "default"} className="text-xs">
                                Question {index + 1}
                              </Badge>
                              <span className="text-sm font-semibold">{wasWrong ? "Oops Moment!" : "Nailed It!"}</span>
                            </div>

                            <div className="space-y-3">
                              <div className="bg-white/80 backdrop-blur-sm p-3 rounded-lg border border-amber-200">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-xl">{learningContent.emoji}</span>
                                  <span className="font-bold text-amber-800">{learningContent.title}</span>
                                </div>
                                <p className="text-sm text-amber-700 leading-relaxed">{learningContent.explanation}</p>
                              </div>

                              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg border border-purple-200">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-xl">🎭</span>
                                  <span className="font-bold text-purple-800">Meme Memory Trick</span>
                                </div>
                                <p className="text-sm text-purple-700 font-medium italic">
                                  {learningContent.memeTrick}
                                </p>
                              </div>

                              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-3 rounded-lg border border-blue-200">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-xl">💡</span>
                                  <span className="font-bold text-blue-800">Pro Tip</span>
                                </div>
                                <p className="text-sm text-blue-700">{learningContent.proTip}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}

                  {/* Fun Grammar Facts */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2, duration: 0.5 }}
                    className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border-2 border-yellow-300"
                  >
                    <div className="text-center space-y-3">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-2xl">🤓</span>
                        <h3 className="text-xl font-bold text-yellow-800">Bonus: Grammar Meme Facts!</h3>
                        <span className="text-2xl">🤓</span>
                      </div>

                      <div className="grid gap-3">
                        <div className="bg-white/80 p-3 rounded-lg">
                          <p className="text-sm text-yellow-700">
                            <strong>🍕 Fun Fact:</strong> The Oxford comma literally saves lives! "Let's eat, Grandma!"
                            vs "Let's eat Grandma!" - Grandma appreciates proper punctuation! 😂
                          </p>
                        </div>

                        <div className="bg-white/80 p-3 rounded-lg">
                          <p className="text-sm text-yellow-700">
                            <strong>🎯 Grammar Ninja Tip:</strong> "I before E except after C" has more exceptions than
                            rules. English is basically trolling us at this point! 🤷‍♀️
                          </p>
                        </div>

                        <div className="bg-white/80 p-3 rounded-lg">
                          <p className="text-sm text-yellow-700">
                            <strong>🚀 Mind Blown:</strong> Shakespeare invented over 1,700 words we still use today.
                            Dude was basically the original influencer! 💅
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Motivational Message */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.5 }}
                    className="text-center p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl border-2 border-rose-200"
                  >
                    <div className="space-y-2">
                      <div className="text-4xl">🎉</div>
                      <h3 className="text-lg font-bold text-rose-800">
                        You're officially 10x smarter than when you started!
                      </h3>
                      <p className="text-sm text-rose-600">
                        Grammar is like a gym for your brain - the more you practice, the stronger you get! 💪
                      </p>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </Card>
        </motion.div>
      </div>
    )
  }

  if (gameState === "leaderboard") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-100 via-stone-50 to-rose-50 flex items-center justify-center p-4">
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
          <Card className="w-full max-w-md shadow-2xl border-0">
            <CardHeader className="text-center">
              <Trophy className="w-12 h-12 mx-auto text-yellow-600 mb-2" />
              <CardTitle className="text-2xl font-bold">🏆 Hall of Fame 🏆</CardTitle>
              <CardDescription>Top Writing Champions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {leaderboard.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No scores yet! Be the first to play! 🎯</p>
              ) : (
                leaderboard.map((entry, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      index === 0
                        ? "bg-yellow-100 border-2 border-yellow-400"
                        : index === 1
                          ? "bg-gray-100 border-2 border-gray-400"
                          : index === 2
                            ? "bg-orange-100 border-2 border-orange-400"
                            : "bg-muted"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">
                        {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `#${index + 1}`}
                      </span>
                      <div>
                        <div className="font-semibold">{entry.name}</div>
                        <div className="text-sm text-muted-foreground">{entry.date}</div>
                      </div>
                    </div>
                    <Badge variant={index < 3 ? "default" : "secondary"} className="text-lg px-3 py-1">
                      {entry.score}/{questions.length}
                    </Badge>
                  </motion.div>
                ))
              )}

              <Separator />

              <Button onClick={() => setGameState("start")} className="w-full">
                <Sparkles className="w-4 h-4 mr-2" />
                Back to Start
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  const lessons = [
    {
      id: 1,
      title: "Your vs You're Mastery",
      emoji: "🔄",
      difficulty: "Beginner",
      content: {
        explanation: "The classic confusion that haunts the internet! Let's end this once and for all.",
        rule: "YOU'RE = YOU ARE (contraction) | YOUR = belongs to you (possessive)",
        examples: [
          { correct: "You're amazing!", wrong: "Your amazing!", why: "You ARE amazing = You're amazing" },
          { correct: "Your dog is cute!", wrong: "You're dog is cute!", why: "The dog belongs to YOU = Your dog" },
          {
            correct: "You're going to love your new car!",
            wrong: "Your going to love you're new car!",
            why: "YOU ARE going to love the car that belongs to YOU",
          },
        ],
        memeTrick:
          "If you can replace it with 'you are' and it still makes sense, use YOU'RE. Otherwise, it's YOUR problem! 😄",
        proTip:
          "When texting, take 2 seconds to expand it in your head. 'You are phone is ringing' sounds wrong, so it's 'Your phone'!",
        funFact: "This mistake is so common, there are entire meme pages dedicated to it. Don't be meme material! 📱",
      },
    },
    {
      id: 2,
      title: "There, Their, They're Chaos",
      emoji: "🌪️",
      difficulty: "Beginner",
      content: {
        explanation:
          "The triple threat of English confusion! These three sound identical but mean totally different things.",
        rule: "THERE = place/location | THEIR = belongs to them | THEY'RE = THEY ARE",
        examples: [
          { correct: "Put it over there!", wrong: "Put it over their!", why: "THERE indicates a place/location" },
          {
            correct: "Their house is huge!",
            wrong: "There house is huge!",
            why: "The house belongs to THEM = Their house",
          },
          {
            correct: "They're coming to dinner!",
            wrong: "Their coming to dinner!",
            why: "THEY ARE coming = They're coming",
          },
        ],
        memeTrick:
          "THERE has 'here' in it (both about places). THEIR has 'heir' in it (inheritance/ownership). THEY'RE has an apostrophe (contraction)! 🏠👑✂️",
        proTip:
          "Point to a location and say 'THERE!' Point to someone's stuff and say 'THEIR!' Point to people and say 'THEY'RE awesome!'",
        funFact: "Even native speakers mess this up in texts. You're not alone in this struggle! 💪",
      },
    },
    {
      id: 3,
      title: "Apostrophe Apocalypse",
      emoji: "☄️",
      difficulty: "Intermediate",
      content: {
        explanation:
          "Apostrophes are like the seasoning of English - a little goes a long way, but too much ruins everything!",
        rule: "Use apostrophes for CONTRACTIONS (don't, can't) and POSSESSION (John's car), NOT for plurals!",
        examples: [
          {
            correct: "The cats are sleeping",
            wrong: "The cat's are sleeping",
            why: "Multiple cats = plural, no apostrophe needed",
          },
          {
            correct: "The cat's toy is missing",
            wrong: "The cats toy is missing",
            why: "The toy belongs to the cat = possessive apostrophe",
          },
          { correct: "It's raining outside", wrong: "Its raining outside", why: "IT IS raining = It's (contraction)" },
        ],
        memeTrick:
          "If you can replace it with 'it is' or 'it has', use IT'S. If something belongs to 'it', use ITS. Think of ITS like HIS or HER - no apostrophe! 🤔",
        proTip:
          "When you see an apostrophe, ask: 'Is this a contraction or does something belong to someone?' If neither, you probably don't need it!",
        funFact:
          "The 'Apostrophe Protection Society' was a real organization in the UK that fought against apostrophe abuse. They gave up in 2019. RIP. 😢",
      },
    },
    {
      id: 4,
      title: "Affect vs Effect Showdown",
      emoji: "⚡",
      difficulty: "Intermediate",
      content: {
        explanation: "The ultimate grammar boss battle! These two words are the final exam of English confusion.",
        rule: "AFFECT = verb (action/influence) | EFFECT = noun (result/consequence)",
        examples: [
          {
            correct: "The rain will affect our picnic",
            wrong: "The rain will effect our picnic",
            why: "Rain will INFLUENCE (verb) our picnic = affect",
          },
          {
            correct: "The effect of rain was a cancelled picnic",
            wrong: "The affect of rain was a cancelled picnic",
            why: "The RESULT (noun) of rain = effect",
          },
          {
            correct: "How did the movie affect you?",
            wrong: "How did the movie effect you?",
            why: "How did it INFLUENCE (verb) you = affect",
          },
        ],
        memeTrick:
          "A for Affect = Action (verb)! E for Effect = End result (noun)! Or remember: 'The rain will AFFECT my hair, and the EFFECT will be a disaster!' 💇‍♀️☔",
        proTip:
          "Try substituting 'influence' for affect and 'result' for effect. If it works, you've got the right one!",
        funFact: "Even professional writers Google this one. You're in good company! 🤝",
      },
    },
    {
      id: 5,
      title: "Who vs Whom Mystery",
      emoji: "🕵️",
      difficulty: "Advanced",
      content: {
        explanation:
          "The grammar mystery that makes even English teachers sweat! But we're about to crack this case wide open.",
        rule: "WHO = subject (does the action) | WHOM = object (receives the action)",
        examples: [
          {
            correct: "Who ate my sandwich?",
            wrong: "Whom ate my sandwich?",
            why: "Someone (subject) did the eating = Who",
          },
          {
            correct: "To whom should I give this?",
            wrong: "To who should I give this?",
            why: "You're giving TO someone (object) = whom",
          },
          { correct: "Who is calling?", wrong: "Whom is calling?", why: "Someone (subject) is calling = Who" },
        ],
        memeTrick:
          "Replace with HE/HIM. If HE works, use WHO. If HIM works, use WHOM. 'HE ate my sandwich' ✅ = WHO ate my sandwich! 🥪",
        proTip:
          "If there's a preposition (to, for, with, by), you probably need WHOM. 'To whom it may concern' sounds fancy! 💼",
        funFact:
          "Many grammar experts say WHOM is dying out in casual speech. But knowing it makes you sound super sophisticated! 🎩",
      },
    },
    {
      id: 6,
      title: "Comma Drama Queens",
      emoji: "👑",
      difficulty: "Intermediate",
      content: {
        explanation: "Commas are the drama queens of punctuation - they show up everywhere and cause all the problems!",
        rule: "Use commas to separate items in lists, before conjunctions in compound sentences, and around non-essential information.",
        examples: [
          {
            correct: "I bought apples, bananas, and oranges",
            wrong: "I bought apples bananas and oranges",
            why: "Oxford comma separates list items clearly",
          },
          {
            correct: "I went to the store, and I bought milk",
            wrong: "I went to the store and I bought milk",
            why: "Comma before 'and' in compound sentences",
          },
          {
            correct: "My brother, who lives in NYC, is visiting",
            wrong: "My brother who lives in NYC is visiting",
            why: "Commas around non-essential info",
          },
        ],
        memeTrick:
          "Commas are like breathing pauses in sentences. If you'd naturally pause while speaking, you probably need a comma! 🫁",
        proTip: "Read your sentence out loud. Where you naturally pause for breath, that's usually where a comma goes!",
        funFact: "The Oxford comma debate has literally ended friendships. Choose your side wisely! ⚔️",
      },
    },
  ]

  if (selectedLesson !== null) {
    const lesson = lessons.find((l) => l.id === selectedLesson)
    if (!lesson) return null

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 p-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {/* Header */}
            <Card className="shadow-xl border-0 mb-6">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Button variant="outline" onClick={() => setSelectedLesson(null)} className="absolute left-4">
                    ← Back
                  </Button>
                  <span className="text-4xl">{lesson.emoji}</span>
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {lesson.title}
                  </CardTitle>
                </div>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  {lesson.difficulty} Level
                </Badge>
              </CardHeader>
            </Card>

            {/* Lesson Content */}
            <div className="space-y-6">
              {/* Explanation */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                <Card className="shadow-lg border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">📖</span>
                      <h3 className="text-xl font-bold text-purple-800">What's the Deal?</h3>
                    </div>
                    <p className="text-lg text-gray-700 leading-relaxed">{lesson.content.explanation}</p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Rule */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-50 to-cyan-50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">⚖️</span>
                      <h3 className="text-xl font-bold text-blue-800">The Golden Rule</h3>
                    </div>
                    <p className="text-lg font-semibold text-blue-700 bg-white/80 p-4 rounded-lg border border-blue-200">
                      {lesson.content.rule}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Examples */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
                <Card className="shadow-lg border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">💡</span>
                      <h3 className="text-xl font-bold text-green-800">Examples That Actually Make Sense</h3>
                    </div>
                    <div className="space-y-4">
                      {lesson.content.examples.map((example, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200"
                        >
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <span className="text-green-600 font-bold">✅ CORRECT:</span>
                                <span className="font-semibold text-green-800">"{example.correct}"</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-red-600 font-bold">❌ WRONG:</span>
                                <span className="font-semibold text-red-800 line-through">"{example.wrong}"</span>
                              </div>
                            </div>
                            <div className="bg-white/80 p-3 rounded-lg">
                              <span className="text-sm font-medium text-gray-700">💭 Why: {example.why}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Meme Trick */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}>
                <Card className="shadow-lg border-0 bg-gradient-to-r from-yellow-50 to-amber-50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">🎭</span>
                      <h3 className="text-xl font-bold text-yellow-800">Meme Memory Trick</h3>
                    </div>
                    <p className="text-lg font-medium text-yellow-700 bg-white/80 p-4 rounded-lg border border-yellow-200 italic">
                      {lesson.content.memeTrick}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Pro Tip */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.0 }}>
                <Card className="shadow-lg border-0 bg-gradient-to-r from-indigo-50 to-purple-50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">🎯</span>
                      <h3 className="text-xl font-bold text-indigo-800">Pro Tip</h3>
                    </div>
                    <p className="text-lg text-indigo-700 bg-white/80 p-4 rounded-lg border border-indigo-200">
                      {lesson.content.proTip}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Fun Fact */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2 }}>
                <Card className="shadow-lg border-0 bg-gradient-to-r from-pink-50 to-rose-50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">🤯</span>
                      <h3 className="text-xl font-bold text-pink-800">Mind-Blowing Fun Fact</h3>
                    </div>
                    <p className="text-lg text-pink-700 bg-white/80 p-4 rounded-lg border border-pink-200">
                      {lesson.content.funFact}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Navigation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                className="flex gap-4 justify-center pt-6"
              >
                <Button onClick={() => setSelectedLesson(null)} variant="outline" className="px-8">
                  Back to Lessons
                </Button>
                <Button onClick={() => setGameState("start")} className="px-8">
                  Take the Quiz!
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Header */}
          <Card className="shadow-xl border-0 mb-8">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Button variant="outline" onClick={() => setGameState("start")} className="absolute left-4">
                  ← Home
                </Button>
                <span className="text-4xl">🎓</span>
                <CardTitle className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Grammar Learning Hub
                </CardTitle>
                <span className="text-4xl">📚</span>
              </div>
              <CardDescription className="text-xl">
                Master the art of writing with our meme-powered grammar lessons! 🚀
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Lessons Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson, index) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className="shadow-lg border-0 cursor-pointer hover:shadow-xl transition-all duration-300 h-full"
                  onClick={() => setSelectedLesson(lesson.id)}
                >
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="text-center mb-4">
                      <div className="text-5xl mb-3">{lesson.emoji}</div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{lesson.title}</h3>
                      <Badge
                        variant={
                          lesson.difficulty === "Beginner"
                            ? "default"
                            : lesson.difficulty === "Intermediate"
                              ? "secondary"
                              : "destructive"
                        }
                        className="text-sm"
                      >
                        {lesson.difficulty}
                      </Badge>
                    </div>

                    <div className="flex-1 flex items-end">
                      <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
                        Start Learning! 🚀
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Fun Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8"
          >
            <Card className="shadow-lg border-0 bg-gradient-to-r from-orange-50 to-red-50">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="text-3xl">🔥</span>
                  <h3 className="text-2xl font-bold text-orange-800">Why Learn Grammar?</h3>
                  <span className="text-3xl">🔥</span>
                </div>
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div className="bg-white/80 p-4 rounded-lg">
                    <div className="text-2xl mb-2">💼</div>
                    <p className="text-sm font-semibold text-orange-700">
                      Better job prospects - employers notice good grammar!
                    </p>
                  </div>
                  <div className="bg-white/80 p-4 rounded-lg">
                    <div className="text-2xl mb-2">🧠</div>
                    <p className="text-sm font-semibold text-orange-700">
                      Clearer thinking - good grammar = organized thoughts!
                    </p>
                  </div>
                  <div className="bg-white/80 p-4 rounded-lg">
                    <div className="text-2xl mb-2">😎</div>
                    <p className="text-sm font-semibold text-orange-700">
                      Instant credibility - sound smarter in every conversation!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
