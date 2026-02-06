import type { Config } from '@react-router/dev/config';
import path from 'path';

export default {
    ssr: false,
    appDirectory: path.resolve(__dirname, 'src'),
} satisfies Config;
