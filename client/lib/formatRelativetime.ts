// utils/timeUtils.ts
import { formatDistanceToNow } from 'date-fns';

export function formatRelativeTime(timestamp: string): string {
  return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
}
