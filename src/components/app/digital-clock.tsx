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
      <p className="font-mono text-xl font-bold text-foreground">
        {format(time, 'HH:mm:ss')}
      </p>
      <p className="text-xs text-muted-foreground">
        {format(time, 'eeee, MMMM do yyyy')}
      </p>
    </div>
  );
}
