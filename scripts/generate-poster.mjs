/**
 * Gera hero-video-poster.jpg a partir de hero-video.mp4
 * usando ffmpeg-static (npm package que inclui o binário ffmpeg)
 */
import { execSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, '..', 'public');

// Instala ffmpeg-static temporariamente se necessário
let ffmpegPath;
try {
  const require = createRequire(import.meta.url);
  ffmpegPath = require('ffmpeg-static');
} catch {
  console.log('Instalando ffmpeg-static...');
  execSync('npm install --no-save ffmpeg-static', { cwd: path.resolve(__dirname, '..'), stdio: 'inherit' });
  const require = createRequire(import.meta.url);
  ffmpegPath = require('ffmpeg-static');
}

const input = path.join(publicDir, 'hero-video.mp4');
const output = path.join(publicDir, 'hero-video-poster.jpg');

console.log(`\nUsando ffmpeg: ${ffmpegPath}`);
console.log(`Input:  ${input}`);
console.log(`Output: ${output}\n`);

execSync(`"${ffmpegPath}" -i "${input}" -ss 00:00:00.5 -vframes 1 -q:v 2 "${output}" -y`, { stdio: 'inherit' });

console.log('✅ hero-video-poster.jpg gerado com sucesso!');
