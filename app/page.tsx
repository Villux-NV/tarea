import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';
import Image from 'next/image'
import Header from './_components/header'
import { SignUp } from '@clerk/nextjs';

export default function Home() {
  const {userId} = auth();

  if (userId) {
    redirect('/dashboard');
  };

  return (
    <main className='border h-full flex flex-col justify-around items-center'>
        <h1>
          {/* make blink */}
          ..a place to house all your work
        </h1>

        <div className='border h-1/4 w-3/5 flex justify-center items-center'>
          <div>Demo Box</div>
        </div>

        <div>
          <p>retro take on a modern solution.. (idk emoji) </p>
        </div>
    </main>
  )
}
