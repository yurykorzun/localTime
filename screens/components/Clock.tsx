import React, { useEffect, useState } from "react";
import {
  View,
  Text,
} from "react-native";
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

export default function Clock({ timezone }: { timezone: string }) {
  const [formattedDateTime, setFormattedDateTime] = useState('');
  const timerRef = React.useRef<NodeJS.Timer|null>(null);

  const refreshClock = () => {
    setFormattedDateTime(formatDateTime());
  };

  const initInterval = () => {
    timerRef.current = setInterval(refreshClock, 1000);
  };

  const clear = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }

  useEffect(() => {
    refreshClock();

    clear();
    initInterval();
    
    return clear;
  }, [timezone]);


  const formatDateTime = () => {
    return dayjs(new Date()).tz(timezone).format('HH:mm:ss a');
  };

  return (
    <View>
      <Text style={{fontSize: 16, fontWeight: "bold"}}>{formattedDateTime}</Text>
    </View>
  );
}
