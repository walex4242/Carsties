"use client"
import React from 'react'
import { AiOutlineCar } from 'react-icons/ai'
import { useParamsStore } from '@/hooks/useParamsStore'
import { usePathname, useRouter } from 'next/navigation'

export default function Logo() {
    const router = useRouter();
    const pathname = usePathname();
    function doReset() {
        if (pathname !== '/') router.push('/');
        reset();
    }
    const reset = useParamsStore(state => state.reset)

    return (
        <div
            onClick={doReset}
            className="cursor-pointer flex items-center gap-2 text-red-500 font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl"
        >
            <AiOutlineCar className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" size={34} />
            <div className="hidden sm:block">Auctions</div>
        </div>
    )
}
