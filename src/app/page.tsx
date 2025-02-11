'use client';

import { Suspense, useEffect, useState } from 'react';
import Image from "next/image";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import { retrieveLaunchParams  } from '@telegram-apps/sdk-react';
import dynamic from 'next/dynamic';

const TaskBoardClient = dynamic(() => Promise.resolve(TaskBoard),
  {ssr: false}  
);

function TaskBoard() {
  const [groupId, setGroupId] = useState<string |null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const launchParams = retrieveLaunchParams ();

  useEffect(() => {
    const initializeComponent = async () => {
      try {
        if (launchParams?.startParam) {
          const encodedGroupId = launchParams.startParam as string;
          try {
            const decodedGroupId = atob(encodedGroupId);
            console.log('Decoded Group ID:', decodedGroupId);
            setGroupId(decodedGroupId);
          } catch (error) {
            console.error('Error decoding group ID:', error); 
            setError('Error decoding group ID');
          }
        } else {
          console.error('Group ID not found');
          setError('Group ID not found');
        }
      } catch (error) {
        console.error('Error initializing component:', error);
        setError('Error initializing component');
      } finally {
        setIsLoading(false);
      }
    };
    initializeComponent();
  }, [launchParams]);

  if (isLoading) {
    return <div className='p-8'>Loading...</div>;
  }

  if (error) {
    return <div className='p-8 text-red-500'>{error}</div>;
  }

  if (!groupId) {
    return <div className='p-8 text-red-500'>Group ID not found</div>;
  }
  
  return (
    <div className='grid grid-rows-[auto,1fr,auto] min-h-screen p-8 gap-8'> 
      <header className='flex items-center justify-between'>
        <Image
          className='dark:invert'
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <h1 className='text-2xl font-bold'> Task Board - Group {groupId}</h1>
      </header>
    
      <main className='flex flex-col gap-8'>
        <TaskForm groupId={groupId} />
        <TaskList groupId={groupId} />
      </main>

      <footer className='flex justify-center text-sm text-gray-500'> 
        Developed during studing the mini apps development
      </footer>
    </div>
  )
}


export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TaskBoardClient />
    </Suspense>
  );
}
