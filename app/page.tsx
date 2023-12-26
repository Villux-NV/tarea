import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';

export default function Home() {
  const {userId} = auth();

  if (userId) {
    redirect('/dashboard');
  };

  return (
    <main className='border h-max flex flex-col justify-around items-center'>
        <h1 className='h-28 flex items-center'>
          {/* make blink */}
          ..a place to house all your work
        </h1>

        <div className='border h-60 w-3/5 flex justify-center items-center'>
          <div>Demo Box</div>
        </div>

        <div className='h-28 flex items-center'>
          <p>retro take on a modern solution.. (idk emoji) </p>
        </div>
    </main>
  )
}
