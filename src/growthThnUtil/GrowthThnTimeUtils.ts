export function growthThnFormatTimer(seconds: number): string {
  const growthThnMins = Math.floor(seconds / 60);
  const growthThnSecs = seconds % 60;
  return `${String(growthThnMins).padStart(2, '0')}:${String(growthThnSecs).padStart(2, '0')}`;
}

export function growthThnFormatFocusTime(totalSeconds: number): string {
  return growthThnFormatTimer(totalSeconds);
}

export function growthThnFormatCompletedAt(iso: string): string {
  const growthThnDate = new Date(iso);
  const growthThnMonth = growthThnDate.toLocaleString('en-US', {month: 'short'});
  const growthThnDay = growthThnDate.getDate();
  const growthThnTime = growthThnDate.toLocaleString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  return `${growthThnMonth} ${growthThnDay}, ${growthThnTime}`;
}

export function growthThnGetDayIndex(date = new Date()): number {
  const growthThnStart = new Date(date.getFullYear(), 0, 0);
  return Math.floor((date.getTime() - growthThnStart.getTime()) / 86400000);
}
