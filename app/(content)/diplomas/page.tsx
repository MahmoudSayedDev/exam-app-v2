"use client"

import { CustomBreadcrumb } from '@/components/breadcrumb/CustomBreadcrumb'
import { diplomaService } from './services/diplomas.service'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import style from './diplomas.module.scss'
import Link from 'next/link'
import { DynamicIcon } from 'lucide-react/dynamic'
import { useLoading } from '@/context/LoadingContext'

export default function Diplomas() {

    const [diplomas, setDiplomas] = useState([])
    const { setLoading } = useLoading()

    useEffect(() => {
        getDiplomas()

        return () => { }
    }, [])


    const getDiplomas = async () => {
        try {
            setLoading(true)
            const { data } = await diplomaService.getDiplomas()
            setDiplomas(data.payload.data)
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
            }
        ]} />


        <div className="container mx-auto px-3 lg:px-0 py-6">
            {diplomas.length ? <>
                <div className="text-white bg-primary flex items-center gap-2 md:gap-5 p-2 md:px-5 md:py-3 mb-5">
                    <DynamicIcon name="graduation-cap" size="50px" strokeWidth="1px" />
                    <h2 className="capitalize text-2xl md:text-4xl font-medium">Diplomas</h2>
                </div>

                <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                    {diplomas.map((d: any, index) => {
                        return <Link href={`/diplomas/${d.id}/exams`} key={index} className=''>
                            <div className={`${style.card} relative w-full h-125 overflow cursor-pointer`}>
                                <Image
                                    src={d.image}
                                    alt={d.title}
                                    fill
                                    sizes='100%'
                                    loading='eager'
                                    className="object-cover"
                                />

                                <div className={`${style.content} absolute text-white left-3 bottom-3 right-3 p-3`}>
                                    <h3 className="font-bold mb-2">{d.title}</h3>
                                    <p>{d.description}</p>
                                </div>
                            </div>
                        </Link>
                    })}
                </div> </> : <>
                    <p className="p-7 text-center text-2xl">There are no diplomas currently available.</p>
            </>}
        </div >
    </>

}
