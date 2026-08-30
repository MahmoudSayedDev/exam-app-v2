import React from 'react'
import style from './layout.module.scss'
import { DynamicIcon } from 'lucide-react/dynamic';


export default function Layout({ children }: LayoutProps<"/">) {
    return <>
        <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
            <div className={`${style.infoPanel} relative hidden lg:inline`}>
                <div className="container mx-auto p-5 sm:p-10 lg:p-20 xl:p-30">
                    <div className="logo flex items-center gap-5 text-primary font-bold text-lg">
                        <DynamicIcon name="folder-code" className="text-primary"/>
                        <h2>Exam App</h2>
                    </div>

                    <div className="info ring-ri">
                        <p className=" font-bold text-3xl mt-30 mb-20">Empower your learning journey <br /> with our smart exam platform.</p>


                        <div className="list flex items-start gap-4 mb-10">
                            <div className="icon border border-primary p-1">
                                <DynamicIcon name="brain" strokeWidth={'1px'} className="text-primary"/>
                            </div>
                            <div>
                                <h4 className="text-primary font-medium">Tailored Diplomas</h4>
                                <p className="opacity-75">Choose from specialized tracks like Frontend, Backend, and Mobile Development.</p>
                            </div>
                        </div>

                        <div className="list flex items-start gap-4 mb-10">
                            <div className="icon border border-primary p-1">
                                <DynamicIcon name="book-open-check" strokeWidth={'1px'} className="text-primary"/>
                            </div>
                            <div>
                                <h4 className="text-primary font-medium">Focused Exams</h4>
                                <p className="opacity-75">Access topic-specific tests including HTML, CSS, JavaScript, and more.</p>
                            </div>
                        </div>

                        <div className="list flex items-start gap-4 mb-10">
                            <div className="icon border border-primary p-1">
                                <DynamicIcon name="rectangle-ellipsis" strokeWidth={'1px'} className="text-primary"/>
                            </div>
                            <div>
                                <h4 className="text-primary font-medium">Smart Multi-Step Forms</h4>
                                <p className="opacity-75">Choose from specialized tracks like Frontend, Backend, and Mobile Development.</p>
                            </div>
                        </div>
                    </div >
                </div >
                <div className={`${style.blurShape} ${style.top}`}></div>
                <div className={`${style.blurShape} ${style.bottom}`}></div>
            </div >


            <div className="h-full flex justify-center items-center">
                <div className="container mx-auto p-5 sm:p-15 lg:p-30 xl:p-40">
                    {children}
                </div>
            </div>
        </div >
    </>
}
