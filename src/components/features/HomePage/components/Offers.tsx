"use client";
import { useEffect, useState } from "react";

export default function Offers() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 200,
    minutes: 51,
    seconds: 34,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds -= 1;
        } else if (minutes > 0) {
          minutes -= 1;
          seconds = 59;
        } else if (hours > 0) {
          hours -= 1;
          minutes = 59;
          seconds = 59;
        } else {
          clearInterval(interval);
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (value: number): string => value.toString().padStart(2, "0");

  const timeUnits = [
    { label: "hours", value: timeLeft.hours },
    { label: "minutes", value: timeLeft.minutes },
    { label: "seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="my-2">
      <div className="rounded-lg bg-gradient-to-r from-purple-600 to-purple-300 p-4 cursor-pointer hover:scale-105 transition-transform duration-300">
        <div className="text-black uppercase text-center">
          <div className="flex justify-center items-center gap-4 mb-2">
            {timeUnits.map((unit, index) => (
              <div key={unit.label} className="text-center">
                <div className="flex items-center">
                  <div className="px-3">
                    <span className="block text-2xl font-bold animate-pulse">
                      {formatTime(unit.value)}
                    </span>
                    <span className="block text-sm capitalize">
                      {unit.label}
                    </span>
                  </div>
                  {index < timeUnits.length - 1 && (
                    <div className="h-10 border-r border-purple-300 mx-1"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="text-lg font-semibold mt-2">50% Flash Offers!</div>
        </div>
      </div>
    </div>
  );
}
