'use client'

import { CustomBreadcrumb } from '@/components/breadcrumb/CustomBreadcrumb'
import React, { use, useEffect, useState } from 'react'
import { examService } from '../../services/exams.service'
import { DynamicIcon } from 'lucide-react/dynamic'
import Image from 'next/image'
import style from './exams.module.scss'
import { useLoading } from '@/context/LoadingContext'
import Link from 'next/link'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


export default function Examx({ params }: { params: Promise<{ diplomaId: string }> }) {

  const { diplomaId } = use(params)
  const [exams, setExams] = useState([])
  const [diploma, setDiploma] = useState('')
  const { setLoading } = useLoading()

  useEffect(() => {
    getExams(diplomaId)

    return () => { }
  }, [diplomaId])

  const getExams = async (diplomaId: string) => {
    try {
      setLoading(true)
      const { data } = await examService.getExams(diplomaId)
      setExams(data.payload.data)
      setDiploma(data.payload.data[0]?.diploma.title)
    } catch (error) {
      console.log(error);
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
        label: diploma,
      },
      {
        label: 'Exams',
      }
    ]} />

    <div className="container mx-auto px-3 lg:px-0 py-6">
      {exams.length ? <>

        <div className="text-white bg-primary flex items-center gap-2 md:gap-5 p-2 md:px-5 md:py-3 mb-5 rounded-">
          <DynamicIcon name="book-open-check" size="50px" strokeWidth="1px" />
          <h2 className="capitalize text-2xl md:text-4xl font-medium">{diploma}</h2>
        </div>

        <div className="mt-5 p-5 bg-white dark:bg-gray-900 grid lg:grid-cols-1 gap-4">
          {exams.map((exam: any, index) => {
            return <div key={index} className={`${style.card} p-5 bg-blue-50 border-2 border-blue-50 dark:bg-gray-800 dark:border-gray-800 dark:hover:border-gray-700 hover:border-blue-200 hover:border-dashed relative overflow-hidden grid lg:grid-cols-12 gap-4`}>
              <div className="lg:col-span-1 p-3 bg-blue-100 border border-blue-200 dark:bg-gray-700 dark:border-gray-600 relative h-52 lg:h-auto">
                <Image
                  src={exam.image}
                  alt={exam.title}
                  fill
                  sizes='100%'
                  loading='eager'
                  className="object-cover"
                />
              </div>
              <div className="content lg:col-span-11">
                <div className="flex justify-between items-start flex-col-reverse lg:flex-row lg:items-center mb-2">
                  <h3 className="text-primary font-bold text-2xl">{exam.title}</h3>

                  <div className="info flex items-center gap-3">
                    <DynamicIcon name="circle-question-mark" size="19px" />
                    <span>{exam.questionsCount} Questions</span>
                    |
                    <DynamicIcon name="timer" size="19px" />
                    <span>{exam.duration} minutes</span>
                  </div>
                </div>
                <p className=" text-muted-color">{exam.description}</p>
              </div>

              <AlertDialog>
                <AlertDialogTrigger>
                  <div
                    className={`${style.btnStart} absolute right-4 rtl:right-auto rtl:left-4 bg-primary text-sm text-white uppercase px-4 py-1 cursor-pointer hover:bg-blue-700 flex items-center gap-3`}
                  >
                    <span>start</span>
                    <DynamicIcon name="move-right" size="19px" />
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Start exam</AlertDialogTitle>
                    <AlertDialogDescription>
                      Do you want to start the exam?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>
                      <Link href={`/diplomas/exam/${exam.id}`} className='px-7'>start</Link>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>


            </div>
          })}
        </div>
      </> : <>

        <p className="p-7 text-center text-2xl">There are no exams currently available</p>
      </>
      }


    </div>

  </>
}


