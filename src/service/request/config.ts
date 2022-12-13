let BASE_URL: string;
const TIME_OUT = 10000;

if (import.meta.env.MODE === 'development') {
  BASE_URL = '';
} else if (import.meta.env.MODE === 'production') {
  BASE_URL = 'production';
} else {
  BASE_URL = 'test';
}

export { BASE_URL, TIME_OUT };
