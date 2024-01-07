'use client';

import { useUser } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import tareaDarkLogo from '../../public/tareaDarkLogo.png';

export default function Header() {
    const {user, isLoaded} = useUser();

    return (
        <header className="grid grid-cols-3 bg-black">
               {/* {'className: z-50 fixed top-0 grid grid-cols-3 w-full p-6' + getClass()} */}
            <div className="">
                <Image 
                    src={tareaDarkLogo} 
                    alt="Tarea logo"
                    width={85}
                />
            </div>

            <Link href={'/'} className="flex justify-center items-center">
                Tarea Playground
            </Link>


            <nav className="list-none flex justify-center">
                {
                    !user &&
                    <Link href={'/sign-in'} className="w-full flex justify-center items-center">Login</Link>
                }

                {
                    isLoaded && user &&
                    <div className="w-full flex justify-between items-center px-8">
                        <Link href={'/dashboard'}>Dashboard</Link>
                        <Link href={'/support'}>Support</Link>
                        <UserButton afterSignOutUrl="/">Logout</UserButton>
                    </div>
                }
            </nav>
        </header>
    )
}
