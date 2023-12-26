'use client';

import { useScrollTop } from "@/hooks/use-scroll-top";
import Link from "next/link";

export const DashNav = () => {
    const scrolled = useScrollTop();

    const getClass= () => {
        console.log(scrolled);
        if (scrolled) {
            return " border-b shadow-sm"
        }
    }
    return (
        <div className={'className= flex justify-center ' }>
            {/* "flex justify-center"  + getClass() */}
            {/* add hover  */}
            <Link href="/dashboard?show=true" className="px-8">Add Project</Link>
            <div className="px-8">Quick Task</div>
            <div className="px-8">Urgent</div>
        </div>

    )
}