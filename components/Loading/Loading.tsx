'use client'

import { useLoading } from '@/context/LoadingContext'
import { DynamicIcon } from 'lucide-react/dynamic'

export default function Loading() {
    const { loading } = useLoading()

    if (!loading) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div>
                <DynamicIcon name="loader-circle" size="60px" strokeWidth="1px" className='text-white animate-spin mb-3' />
                <p className='text-white'>Loading...</p>
            </div>
        </div>
    )
}
