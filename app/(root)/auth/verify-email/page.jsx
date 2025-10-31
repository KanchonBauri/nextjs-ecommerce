'use client'

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import axios from "axios"
import verifiedImg from "@/public/assets/images/verified.gif"
import verificationFailedImg from "@/public/assets/images/verification-failed.gif"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { WEBSITE_HOME } from "@/routes/WebsiteRoute"
import { useSearchParams } from "next/navigation"

export default function EmailVerification() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const [isVerified, setIsVerified] = useState(null) // null = loading

  useEffect(() => {
    if (!token) return;

    const verifyEmail = async () => {
      try {
        const { data } = await axios.post('/api/auth/verify-email', { token })
        if (data.success) {
          setIsVerified(true)
        } else {
          setIsVerified(false)
        }
      } catch (err) {
        setIsVerified(false)
      }
    }

    verifyEmail()
  }, [token])

  if (isVerified === null) {
    return <div className="text-center mt-20 text-xl">Verifying your email...</div>
  }

  return (
    <Card className="w-[400px] flex justify-center items-center min-h-[400px] mx-auto">
      <CardContent>
        {isVerified ? (
          <div>
            <div className="flex justify-center items-center ">
              <Image src={verifiedImg} alt="Verified" width={400} height={100} />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold my-5 text-green-500 ">Email verification success!</h1>
              <Button asChild>
                <Link href={WEBSITE_HOME}>Continue Shopping</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-center items-center ">
              <Image src={verificationFailedImg} alt="Verification Failed" width={400} height={100} />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold my-5 text-red-500 ">Email verification failed!</h1>
              <Button asChild>
                <Link href={WEBSITE_HOME}>Continue Shopping</Link>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
