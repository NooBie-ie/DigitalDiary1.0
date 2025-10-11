"use client";

import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

export default function DigitalClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <div className="text-right">
      <p className="font-mono text-2xl font-bold animated-gradient-text">
        {format(time, 'hh:mm:ss a')}
      </p>
      <p className="text-sm animated-gradient-text">
        {format(time, 'eeee, MMMM do yyyy')}
      </p>
    </div>
  );
}
