import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'
export default function Page() {
  return (
    <div className="flex items-center justify-center h-full w-full py-12">
      <div className="flex-1 flex items-center justify-center h-full">
      <Image 
        src="https://placehold.co/1080x1080.jpg" 
            alt="logo" 
            width={1080}
            height={1080}
            className="h-full w-full object-cover"
          />
        </div>
      <div className="flex-1 h-full flex items-center justify-center">
      <SignIn />
      </div>
    </div>
  )
}
