"use client";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";




export default function GetStarted() {

  const router = useRouter();

  return (
    <div className="mx-auto flex flex-col items-center justify-center bg-gradient-to-br from-black via-stone-950 to-black">
      <Navbar />
      <div className="absolute inset-y-0 left-0 h-full w-px bg-amber-200/80">
        <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-amber-500 to-transparent" />
      </div>
      <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80">
        <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-amber-500 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80">
        <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
      </div>
      <div className="px-4 py-10 md:py-20">
        <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-zinc-500 md:text-4xl lg:text-7xl dark:text-slate-300">
          {"Get a Mobile Proxy Now!"
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.9,
                  ease: "easeInOut",
                }}
                className="mr-2 inline-block"
              >
                {word}
              </motion.span>
            ))}
        </h1>
        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 0.8,
          }}
          className="relative z-10 mx-auto py-4 text-center text-lg font-normal text-neutral-400 "
        >
          {/* With AI, you can launch your website in hours, not days. Try our best
          in class, state of the art, cutting edge AI tools to get your website
          up. */}
        </motion.p>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 1,
          }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            type="button"
            onClick={() => router.push("/Proxies")}
            className="w-60 transform rounded-lg bg-white px-6 py-2 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-400 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            Buy Now
          </button>
          <button 
          type="button"
          onClick={() => router.push("/Contact")}
          className="w-60 transform rounded-lg border border-amber-400 bg-white px-6 py-2 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-400 dark:bg-black dark:text-white dark:hover:bg-gray-900">
            Contact Support
          </button>
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.3,
            delay: 1.2,
          }}
          className="relative z-10 mt-20 rounded-3xl border border-neutral-800 md:border-none bg-black p-4 shadow-md"
        >
          <div className="w-full overflow-hidden rounded-xl border border-amber-600">
            
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const Navbar = () => {
  return (
    <nav className="flex w-full items-center justify-between border-t border-neutral-200 px-4 py-4 dark:border-neutral-800 ">
      <div className="flex items-center gap-2">
        <div className="size-7 rounded-full bg-gradient-to-br from-zinc-500 to-amber-500" />
        <h1 className="text-base font-bold md:text-2xl">ProXiFi</h1>
      </div>
      <div className="flex justify-end items-center gap-4 p-4">
                    <SignedIn>
                      <UserButton 
                        appearance={{
                    elements: {
                      formButtonPrimary: {
                        fontSize: 14,
                        textTransform: 'none',
                        backgroundColor: '#FFFFFF',
                        '&:hover, &:focus, &:active': {
                          backgroundColor: '#49247A',
                        },
                      },
                    },
                  }}
                      />
                    </SignedIn>
                    <SignedOut>
                      <SignInButton />
                    </SignedOut>
                  </div>
    </nav>
  );
};
