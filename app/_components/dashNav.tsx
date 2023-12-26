'use client';

import Link from "next/link";

export const DashNav = () => {
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