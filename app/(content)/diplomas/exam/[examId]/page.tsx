"use client"

import { CustomBreadcrumb } from '@/components/breadcrumb/CustomBreadcrumb'
import { DynamicIcon } from 'lucide-react/dynamic'
import React, { use, useCallback, useEffect, useState } from 'react'
import { QuestionsService } from '../../services/questions.service'
import { useLoading } from '@/context/LoadingContext'
import {
    Questionnaire,
    QuestionnaireActions,
    QuestionnaireChoice,
    QuestionnaireChoices,
    QuestionnaireError,
    QuestionnaireItem,
    QuestionnaireNext,
    QuestionnairePrevious,
    QuestionnaireProgress,
    QuestionnaireSubmit,
    QuestionnaireTitle,
} from "@/components/ui/questionnaire"
import style from './exam.module.scss'
import { examService } from '../../services/exams.service'
import CountdownTimer from './countdown-timer/CountdownTimer'
import { submissionService } from '../../services/submissions.service'
import Link from 'next/link'
import Piechart from '@/components/charts/pie-chart/PieChart'


type Answer = {
    id: string
    text: string
}

type Question = {
    id: string
    text: string
    answers: Answer[]
}

export default function ExamId({ params }: { params: Promise<{ examId: string }> }) {


    const { examId } = use(params)
    const [diploma, setDiploma] = useState({} as any)
    const [exam, setExam] = useState({} as any)

    const [questions, setQuestions] = useState<Question[]>([])
    const [currentQuestion, setCurrentQuestion] = useState<string>("")
    const [answers, setAnswers] = useState<Record<string, string>>({})
    const [analytics, setAnalytics] = useState([])
    const [submission, setSubmission] = useState({} as any)

    const { setLoading } = useLoading()
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        getExams(examId)
        getQuestions(examId)

        return () => { }
    }, [examId])

    const getExams = async (examId: string) => {
        try {
            setLoading(true)
            const { data } = await examService.getExam(examId)
            setExam(data.payload.exam)
            setDiploma(data.payload.exam.diploma)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    const getQuestions = async (examId: string) => {
        try {
            setLoading(true)
            const { data } = await QuestionsService.getQuestions(examId)
            setQuestions(data.payload.questions)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }


    const handleAnswerChange = (
        questionId: string,
        answerId: string
    ) => {
        setAnswers((current) => ({
            ...current,
            [questionId]: answerId,
        }))
    }

    const items = questions.map((question, index) => ({
        name: question.id,
        required: true,
        label: `Question ${index + 1}`,
    }))

    const currentIndex = questions.findIndex(
        (question) => question.id === currentQuestion
    )

    const currentQuestionData = questions[currentIndex]

    const unanswered =
        !currentQuestionData ||
        !answers[currentQuestionData.id]


    const handleSubmit = useCallback(async (event?: React.FormEvent<HTMLFormElement>) => {
        event?.preventDefault();

        if (submitted) return;

        setSubmitted(true);

        const dataToSend = {
            examId,
            answers: Object.entries(answers).map(
                ([questionId, answerId]) => ({
                    questionId,
                    answerId,
                })
            ),
        };

        try {
            const { data } = await submissionService.submitExamAnswers(dataToSend)
            setAnalytics(data.payload.analytics)
            setSubmission(data.payload.submission)
            setQuestions([])

        } catch (error) {
            console.log(error);
        }
    }, [submitted, examId, answers]);


    const restartExam = async () => {
        try {
            setLoading(true)

            // Reset exam state
            setSubmitted(false)
            setAnswers({})
            setAnalytics([])
            setSubmission({})
            setCurrentQuestion(questions[0]?.id ?? "")

            // Reload questions/exam if needed
            await Promise.all([
                getExams(examId),
                getQuestions(examId),
            ])
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }


    return <>

        <CustomBreadcrumb items={[
            {
                label: 'Diplomas',
                href: '/diplomas'
            },
            {
                label: diploma.title,
            },
            {
                label: exam.title,
                styleClass: 'text-primary'
            }
        ]} />


        <div className="container mx-auto px-3 lg:px-0 py-6">

            {questions.length || analytics.length ? <>

                <div className="text-white bg-primary flex items-center gap-2 md:gap-5 p-2 md:px-5 md:py-3 mb-5 rounded-">
                    <DynamicIcon name="book-open-check" size="50px" strokeWidth="1px" />
                    <h2 className="capitalize text-2xl md:text-4xl font-medium">{exam.title}</h2>
                </div>


                <Questionnaire
                    className="mx-auto bg-white dark:bg-gray-900 px-5 py-9 shadow"
                    item={currentQuestion}
                    items={items}
                    onItemChange={(nextItem) => setCurrentQuestion(nextItem)}
                    onSubmit={handleSubmit}
                >
                    <div className='flex justify-between items-center'>
                        {questions.length ?
                            <QuestionnaireProgress className='text-lg' />
                            :
                            <h4 className="text-3xl text-primary font-medium">Results:</h4>
                        }

                        <CountdownTimer
                            examId={exam.id}
                            duration={exam.duration}
                            onTimeUp={handleSubmit}
                            submitted={submitted}
                        />
                    </div>

                    {questions.length ?
                        <>
                            {questions.map((question, index) => (
                                <QuestionnaireItem
                                    key={question.id}
                                    name={question.id}
                                    required
                                    className=' mt-7'
                                >
                                    <QuestionnaireTitle>
                                        <span className=' text-2xl text-primary font-bold'>{index + 1}. {question.text}</span>
                                    </QuestionnaireTitle>

                                    <QuestionnaireChoices>
                                        {question.answers.map((answer) => (
                                            <QuestionnaireChoice
                                                className={`${style.item} data-checked:border-blue-700 text-md rounded-none`}
                                                key={answer.id}
                                                value={answer.id}
                                                checked={
                                                    answers[question.id] ===
                                                    answer.id
                                                }
                                                onChange={() =>
                                                    handleAnswerChange(
                                                        question.id,
                                                        answer.id
                                                    )
                                                }
                                            >
                                                {answer.text}
                                            </QuestionnaireChoice>
                                        ))}
                                    </QuestionnaireChoices>

                                    <QuestionnaireError />
                                </QuestionnaireItem>
                            ))}

                            <QuestionnaireActions className='mt-6 grid grid-cols-2'>
                                <QuestionnairePrevious className='rounded-none w-full py-6 text-md' />

                                <QuestionnaireNext
                                    className="data-[status=unanswered]:opacity-50 text-white bg-primary w-full py-6 col-start-2 text-md rounded-none flex gap-3 items-center"
                                    disabled={unanswered}
                                >
                                    <span>Next</span>
                                    <DynamicIcon name="move-right" strokeWidth='3px'/>
                                </QuestionnaireNext>

                                <QuestionnaireSubmit className='rounded-none w-full py-6 text-md col-start-2 bg-green-700 hover:bg-green-700 hover:opacity-95'
                                    disabled={unanswered}
                                >
                                    Submit Exam
                                </QuestionnaireSubmit>
                            </QuestionnaireActions>
                        </>

                        :

                        <>
                            <div className="grid grid-cols-12 gap-4">
                                <div className="col-span-12 md:col-span-4 bg-blue-100 border border-blue-200 dark:bg-gray-800 dark:border-gray-700 flex justify-center items-center flex-col gap-12 py-3">
                                    <Piechart chartData={
                                        [
                                            { label: 'Correct', count: submission.correctAnswers, fill: '#00BC7D' },
                                            { label: 'Incorrect', count: submission.wrongAnswers, fill: '#EF4444' },
                                        ]
                                    } />
                                    <div className={`${style.labels}`}>
                                        <p className={`${style.correct} font-medium mb-3`}> Correct: {submission?.correctAnswers}</p>
                                        <p className={`${style.incorrect} font-medium mb-3`}>Incorrect: {submission?.wrongAnswers}</p>
                                    </div>
                                </div>

                                <div className="col-span-12 md:col-span-8 p-5 border-2 border-blue-200 border-dashed dark:border-gray-700 overflow-auto" style={{ height: '75vh' }}>
                                    {analytics.map((item: any, index) => {
                                        return <div key={index}>
                                            <h5 className="text-lg md:text-2xl text-primary font-medium mb-2">{item.questionText}</h5>

                                            {
                                                !item.isCorrect ? <div className="flex items-center gap-5 px-4 py-3 bg-red-100 dark:bg-red-300 dark:text-red-950 mb-3 text-sm md:text-lg">
                                                    <span className={`${style.radioAnswer} ${!item.isCorrect ? style.incorrect : ''} w-6 md:w-4 h-4 rounded-full border border-red-500 dark:border-red-950`}></span>
                                                    {item.selectedAnswer ? item.selectedAnswer.text : 'No answer was selected'}
                                                </div> : ''
                                            }


                                            <div className="flex items-center gap-5 px-4 py-3 bg-green-100 dark:bg-green-300 dark:text-green-950 mb-3 text-sm md:text-lg">
                                                <span className={`${style.radioAnswer} ${item.isCorrect ? style.correct : ''} w-6 md:w-4 h-4 rounded-full border border-green-600 dark:border-green-950`}></span>
                                                {item.correctAnswer.text}
                                            </div>

                                            {index + 1 !== analytics.length ? <hr className='mb-5' /> : ''}
                                        </div>
                                    })}
                                </div>
                            </div>

                            <div className="mt-7 grid grid-cols-2 gap-4">
                                <button
                                    onClick={restartExam}
                                    className="w-full bg-gray-300 text-dark capitalize px-4 py-3 cursor-pointer dark:bg-gray-800 dark:hover:bg-gray-700 hover:bg-gray-200 flex justify-center items-center gap-3"
                                >
                                    <DynamicIcon name="rotate-ccw" size="19px" />
                                    <span>Restart</span>
                                </button>

                                <Link
                                    href={'/diplomas'}
                                    className="w-full bg-primary text-white capitalize px-4 py-3 cursor-pointer hover:bg-blue-700 flex justify-center items-center gap-3"
                                >
                                    <DynamicIcon name="folder-search" size="19px" />
                                    <span>Explore</span>
                                </Link>
                            </div>
                        </>
                    }


                </Questionnaire >



            </> : <>
                <p className="p-7 text-center text-2xl">
                    There are no questions currently available
                </p>
            </>
            }
        </div >
    </>
}
