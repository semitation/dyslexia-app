import { useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { AuthModal } from "@/features/auth/components/auth-modal"
import { BaseLayout } from "@/features/layouts/base-layout"

import {
  Hero,
  FeaturePreview,
  KeyFeatures,
  Mission,
  News,
  CallToAction,
} from "@/page/landing"

export const Route = createFileRoute("/")({
  component: Landing,
})

export function Landing() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  return (
    <BaseLayout onAuthClick={() => setIsAuthModalOpen(true)}>
      <section className="w-full flex flex-col gap-y-32">
        <Hero />
        <FeaturePreview />
        <KeyFeatures />
        <Mission />
        <News />
        <CallToAction />
      </section>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </BaseLayout>
  )
}
