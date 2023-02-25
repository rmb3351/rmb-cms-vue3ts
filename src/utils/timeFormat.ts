import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const DEFAULT_TIME_FORMAT_STRING = 'YYYY-MM-DD HH:mm:ss';

export function formatUtcString(
  utcString: string,
  formatString: string = DEFAULT_TIME_FORMAT_STRING
) {
  return dayjs.utc(utcString).format(formatString);
}
