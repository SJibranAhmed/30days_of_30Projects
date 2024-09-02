"use client";
import { ChangeEvent, useState, useRef, useEffect } from "react";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Countdown = () => {
  // State to manage the duration input
  const [duration, setDuration] = useState<number | string>(0);
  // State to manage the countdown timer value
  const [timeLeft, setTimeLeft] = useState<number>(0);
  // State to track if the timer is active
  const [isActive, setIsActive] = useState<boolean>(false);
  // State to track if the timer is paused
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Reference to store the timer ID
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // function for get user time duration
  const handleDurationChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setDuration(Number(e.target.value));
  };

  //   function for handling duration which is set the user for start
  const handleSetDuration = () => {
    if (typeof duration === "number" && duration > 0) {
      setTimeLeft(duration);
      setIsActive(false);
      setIsPaused(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  //   function for countdown
  const handleStart = () => {
    if (timeLeft > 0) {
      setIsActive(true);
      setIsPaused(false);
    }
  };

  //   function for handling pause button
  const handlePause = () => {
    if (isActive) {
      setIsPaused(true);
      setIsActive(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  //   function for handling reset button
  const handleReset = () => {
    setIsActive(false);
    setIsPaused(false);
    setTimeLeft(typeof duration === "number" ? duration : 0);

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  //   useEffect() for re-rendering our countdown
  useEffect(() => {
    if (isActive && !isPaused) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current!);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, isPaused]);

  // format of time for user display
  const formatTime = (time: number): string => {
    const min = Math.floor(time / 60);
    const sec = time % 60;

    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  return (
    <main className="flex flex-col bg-slate-300 items-center justify-center h-screen dark:bg-gray-900">
      <div className="w-[490px] bg-slate-100 h-[50%] rounded-2xl items-center text-center shadow-2xl">
        <h1 className="text-2xl font-semibold mt-7">Countdown Timer</h1>
        <div className="searchbar flex items-center justify-around mt-6">
          <Input
            type="text"
            placeholder="Enter duration in seconds"
            onChange={handleDurationChange}
          />
          <Button
            className="bg-white hover:bg-slate-200 text-black -ml-14 border-2"
            onClick={handleSetDuration}
          >
            Set
          </Button>
        </div>
        <div className="showtime">
          <p className="text-6xl font-bold mt-4">{formatTime(timeLeft)}</p>
        </div>
        <div className="actionBtn mt-7 px-24 flex justify-around">
          {/* start or resume buttons */}
          <Button
            className="bg-white px-[10%] hover:bg-slate-200 text-black border-2"
            onClick={handleStart}
          >
            {isPaused ? "Resume" : "Start"}
          </Button>

          {/* pause button */}
          <Button
            className="bg-white hover:bg-slate-200 text-black border-2"
            onClick={handlePause}
          >
            Pause
          </Button>

          {/* reset button */}
          <Button
            className="bg-white hover:bg-slate-200 text-black border-2"
            onClick={handleReset}
          >
            Reset
          </Button>

          {/* developer name */}
        </div>
        <p className="text-[9px] mt-8">
          created by :{" "}
          <div className="name text-[12px] underline tracking-wider leading-6">
            {" "}
            <span>S</span>heikh <span>J</span>ibran <span>A</span>hmed
          </div>
        </p>
      </div>
    </main>
  );
};

export default Countdown;
