'use client'

import { usePathname } from 'next/navigation'

import Header from './header/Header'
import SmartHeader from './header/SmartHeader'
import Footer from './footer/Footer'
import TextAnimation from './textanimation/TextAnimation'
import CircularText from './circulartext/CircularText'
import HoverEffectClient from './HoverEffectClient'

export default function SiteLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')

  if (isAdmin) {
    return <>{children}</>
  }

  return (
    <>
      <Header />
      <SmartHeader />
      <TextAnimation />
      <CircularText />
      <HoverEffectClient />
      {children}
      <Footer />
    </>
  )
}