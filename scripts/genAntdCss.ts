import fs from 'fs';
import { extractStyle } from '@ant-design/static-style-extract';

const OUTPUT_PATH = './public/antd.min.css';

const css = extractStyle();
fs.writeFileSync(OUTPUT_PATH, css);
