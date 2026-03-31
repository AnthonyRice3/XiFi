"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import FaqSection from '@/components/FaqSection'
import { PriceHero } from '@/components/PriceHero'
import WaitlistSection from '@/components/Waitlist'
import { SupportTicketModal } from '@/components/SupportTicketModal'

export default function ContactPage() {
  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const { isSignedIn } = useUser();
  const router = useRouter();

  function handleContactSupport() {
    if (!isSignedIn) {
      router.push("/sign-in?redirect_url=/Contact");
      return;
    }
    setTicketModalOpen(true);
  }

  return (
    <main className="relative bg-black flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
        {ticketModalOpen && <SupportTicketModal onClose={() => setTicketModalOpen(false)} />}
        <div className="w-full">
            <PriceHero />
            <WaitlistSection />
            <FaqSection onContactSupport={handleContactSupport} />
        </div>
    </main>
  )
}