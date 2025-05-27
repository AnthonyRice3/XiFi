"use client";

import { cn } from "@/lib/utils";
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
  HTMLAttributes,
} from "react";
import { createNoise3D } from "simplex-noise";

type WavyBackgroundProps = {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
} & HTMLAttributes<HTMLDivElement>; // for spreading {...props}

export const WavyBackground: React.FC<WavyBackgroundProps> = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const wRef = useRef<number>(0);
  const hRef = useRef<number>(0);
  const ntRef = useRef<number>(0);
  const animationIdRef = useRef<number>(0);

  const noise = useRef(createNoise3D()).current;

  const getSpeed = useCallback(() => {
    return speed === "fast" ? 0.002 : 0.001;
  }, [speed]);

  const waveColors = useMemo(
    () => colors ?? ["#fd9a00", "#FFFBEB", "#fd9a00", "#FFFBEB", "#B1C5FF"],
    [colors]
  );

  const drawWave = useCallback(
    (n: number) => {
      ntRef.current += getSpeed();
      const ctx = ctxRef.current;
      if (!ctx) return;

      for (let i = 0; i < n; i++) {
        ctx.beginPath();
        ctx.lineWidth = waveWidth || 50;
        ctx.strokeStyle = waveColors[i % waveColors.length];

        for (let x = 0; x < wRef.current; x += 5) {
          const y = noise(x / 800, 0.3 * i, ntRef.current) * 100;
          ctx.lineTo(x, y + hRef.current * 0.5);
        }

        ctx.stroke();
        ctx.closePath();
      }
    },
    [getSpeed, waveColors, waveWidth, noise]
  );

  const render = useCallback(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;

    ctx.fillStyle = backgroundFill || "black";
    ctx.globalAlpha = waveOpacity || 0.5;
    ctx.fillRect(0, 0, wRef.current, hRef.current);

    drawWave(5);
    animationIdRef.current = requestAnimationFrame(render);
  }, [drawWave, backgroundFill, waveOpacity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctxRef.current = ctx;
    wRef.current = canvas.width = window.innerWidth;
    hRef.current = canvas.height = window.innerHeight;
    ctx.filter = `blur(${blur}px)`;
    ntRef.current = 0;

    const handleResize = () => {
      wRef.current = canvas.width = window.innerWidth;
      hRef.current = canvas.height = window.innerHeight;
      ctx.filter = `blur(${blur}px)`;
    };

    window.addEventListener("resize", handleResize);
    render();

    return () => {
      cancelAnimationFrame(animationIdRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [render, blur]);

  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome")
    );
  }, []);

  return (
    <div
      className={cn(
        "h-screen flex flex-col items-center justify-center ",
        containerClassName
      )}
    >
      <canvas
        className="absolute inset-0 z-0 "
        ref={canvasRef}
        id="canvas"
        style={isSafari ? { filter: `blur(${blur}px)` } : {}}
      />
      <div className={cn("relative z-10", className)} {...props}>
        {children}
      </div>
    </div>
  );
};
