import { SignUp } from "@clerk/nextjs";

const appearance = {
          layout: {
                    logoPlacement: "none"
          },
          variables: {
                    colorPrimary: "#d97706",
                    colorBackground: "#0c0a09",
                    colorInputBackground: "#1c1917",
                    colorInputText: "#f5f5f4",
                    colorText: "#f5f5f4",
                    colorTextSecondary: "#a8a29e",
                    colorNeutral: "#44403c",
                    borderRadius: "0.75rem",
                    fontFamily: "inherit"
          },
          elements: {
                    card: "bg-stone-950 border border-zinc-800 shadow-2xl rounded-2xl",
                    headerTitle: "text-white font-bold text-xl",
                    headerSubtitle: "text-zinc-400 text-sm",
                    formButtonPrimary: "bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-xl",
                    formFieldInput: "bg-zinc-900 border border-zinc-700 text-white rounded-xl",
                    formFieldLabel: "text-zinc-400 text-sm font-medium",
                    footerActionLink: "text-amber-400 hover:text-amber-300 font-semibold",
                    footerAction: "text-zinc-500",
                    dividerLine: "bg-zinc-800",
                    dividerText: "text-zinc-600",
                    socialButtonsBlockButton: "border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl",
                    socialButtonsBlockButtonText: "text-zinc-300 font-medium",
                    identityPreviewText: "text-zinc-300",
                    identityPreviewEditButton: "text-amber-400"
          }
} as const;

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center px-4 py-16">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-amber-600/10 blur-[120px]" />
      </div>
      <div className="relative z-10 mb-8 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-2">
          Mobile Proxy Infrastructure
        </p>
        <h1 className="text-4xl font-extrabold text-white tracking-tight">
          ProX<span className="text-amber-400">iFi</span>
        </h1>
        <p className="text-zinc-500 text-sm mt-2">Create your free account</p>
      </div>
      <div className="relative z-10">
        <SignUp routing="hash" appearance={appearance} />
      </div>
      <p className="relative z-10 mt-8 text-xs text-zinc-700">
        &copy; {new Date().getFullYear()} ProXiFi. All rights reserved.
      </p>
    </main>
  );
}
