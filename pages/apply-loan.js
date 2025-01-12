'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { FileText, Calendar, Wallet, Clock, Star, CreditCard } from 'lucide-react'
import { Button } from '../components/mobileComponents/button';
import LottiePlayer from '../components/lottiePlayer';


export default function ApplyLoan() {
  const router = useRouter()

  const features = [
    {
      icon: <FileText className="h-6 w-6 text-[#194DBE]" />,
      text: "Approved Loan offer up to ₹10 lakhs"
    },
    {
      icon: <Calendar className="h-6 w-6 text-[#194DBE]" />,
      text: "Withdraw funds with flexible EMI dates"
    },
    {
      icon: <Wallet className="h-6 w-6 text-[#194DBE]" />,
      text: "Repay anytime with ZERO foreclosure charges"
    },
    {
      icon: <Clock className="h-6 w-6 text-[#194DBE]" />,
      text: "First ever loan with 3 months grace period"
    },
    {
      icon: <CreditCard className="h-6 w-6 text-[#194DBE]" />,
      text: "No credit history required"
    },
    {
      icon: <Star className="h-6 w-6 text-[#194DBE]" />,
      text: "Exclusive offer for first-time borrowers"
    }
  ]

  return (
    <div className="min-h-screen bg-[#F2F8FD]">
      <div className="p-4 flex justify-end">
         <Image 
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/svgviewer-output%20(1)-f3bPdHVycAC0rZEIPd6E8gPnIv33Gr.svg"
            alt="Aasra Vikas Logo"
            width={120}
            height={40}
          />
      </div>

      <main className="px-6 pt-8 pb-20 flex flex-col items-center">
        <div className="w-full space-y-4 mb-12 flex flex-col">
          <LottiePlayer
            name={"base"}
            width='300'
            height='300'
            autoplay
          />
          <h1 className="text-2xl font-semibold text-center text-[#194DBE]">
            Smart Personal Loan
          </h1>
        </div>

        <div className="w-full space-y-6 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                {feature.icon}
              </div>
              <p className="text-lg font-medium text-gray-800">
                {feature.text}
              </p>
            </div>
          ))}
        </div>

        <Button 
          onClick={() => router.push('/verify')}
          className="w-full bg-[#194DBE] hover:bg-[#194DBE]/90 text-white rounded-full py-6 text-xl"
        >
          Get Money
        </Button>
      </main>
    </div>
  )
}


ApplyLoan.getLayout = function getLayout(page) {
  return <>{page}</>;
};
