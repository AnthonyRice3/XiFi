"use client";
import { MaskContainer } from "@/components/ui/MaskEffect";

export function MaskText() {
  return (
    <div className="flex h-[40rem] w-full items-center justify-center overflow-hidden pt-24 z-50">
      <MaskContainer
        revealText={
          <p className="mx-auto max-w-4xl text-center text-4xl font-bold text-amber-400 dark:text-white">
            Operate Under Cover Let Us be YOur Invisibility cloak while searching the web!
          </p>
        }
        className="h-[40rem] rounded-md border text-white dark:text-black"
      >
        Your Data is Valuable{" "}
        <span className="text-amber-700">AND</span> should be given at your own discretion. 
        <span className="text-amber-700">Let Us be your Mask.</span>.
      </MaskContainer>
    </div>
  );
}
