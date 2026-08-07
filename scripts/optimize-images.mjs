#!/usr/bin/env node
/**
 * optimize-images.mjs
 * -------------------
 * Redimensiona e converte imagens de /public para .webp usando sharp.
 * - logo.png         → max 360px de largura (@2x de 180px exibido)
 * - footer-wireframe → max 1000px
 * - servicos/*       → max 1000px
 *
 * Mantém os originais como fallback e gera .webp ao lado.
 */

import sharp from 'sharp';
import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');

// Configuração: { caminhoRelativo: maxWidth }
const imageConfigs = [
  { file: 'logo.png', maxWidth: 360 },
  { file: 'footer-wireframe.png', maxWidth: 1000 },
];

async function getServiceImages() {
  const servicosDir = path.join(PUBLIC_DIR, 'servicos');
  const entries = await readdir(servicosDir);
  return entries
    .filter(f => /\.(png|jpe?g)$/i.test(f))
    .map(f => ({ file: path.join('servicos', f), maxWidth: 1000 }));
}

async function getFileSize(filePath) {
  const s = await stat(filePath);
  return s.size;
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  const mb = kb / 1024;
  return `${mb.toFixed(2)} MB`;
}

async function optimizeImage({ file, maxWidth }) {
  const inputPath = path.join(PUBLIC_DIR, file);
  const ext = path.extname(file);
  const baseName = file.slice(0, -ext.length);
  const outputPath = path.join(PUBLIC_DIR, `${baseName}.webp`);

  const originalSize = await getFileSize(inputPath);

  // Ler metadados para saber dimensões originais
  const metadata = await sharp(inputPath).metadata();
  const needsResize = metadata.width > maxWidth;

  let pipeline = sharp(inputPath);

  if (needsResize) {
    pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
  }

  await pipeline.webp({ quality: 80 }).toFile(outputPath);

  const optimizedSize = await getFileSize(outputPath);
  const savings = ((1 - optimizedSize / originalSize) * 100).toFixed(1);

  return {
    file,
    originalDimensions: `${metadata.width}×${metadata.height}`,
    resizedWidth: needsResize ? maxWidth : metadata.width,
    originalSize,
    optimizedSize,
    savings,
    outputFile: `${baseName}.webp`,
  };
}

async function main() {
  console.log('\n🖼️  Otimizando imagens com sharp...\n');

  const serviceImages = await getServiceImages();
  const allImages = [...imageConfigs, ...serviceImages];

  const results = [];

  for (const config of allImages) {
    try {
      const result = await optimizeImage(config);
      results.push(result);
      console.log(`  ✅ ${result.file} → ${result.outputFile}`);
    } catch (err) {
      console.error(`  ❌ Erro ao processar ${config.file}: ${err.message}`);
    }
  }

  // Tabela de resultados
  console.log('\n' + '─'.repeat(95));
  console.log(
    '  Arquivo'.padEnd(35) +
    'Original'.padEnd(15) +
    'WebP'.padEnd(15) +
    'Dimensões'.padEnd(18) +
    'Economia'
  );
  console.log('─'.repeat(95));

  let totalOriginal = 0;
  let totalOptimized = 0;

  for (const r of results) {
    totalOriginal += r.originalSize;
    totalOptimized += r.optimizedSize;

    console.log(
      `  ${r.file}`.padEnd(35) +
      formatBytes(r.originalSize).padEnd(15) +
      formatBytes(r.optimizedSize).padEnd(15) +
      `${r.originalDimensions} → ${r.resizedWidth}w`.padEnd(18) +
      `${r.savings}%`
    );
  }

  console.log('─'.repeat(95));
  console.log(
    '  TOTAL'.padEnd(35) +
    formatBytes(totalOriginal).padEnd(15) +
    formatBytes(totalOptimized).padEnd(15) +
    ''.padEnd(18) +
    `${((1 - totalOptimized / totalOriginal) * 100).toFixed(1)}%`
  );
  console.log('─'.repeat(95));
  console.log(`\n🎉 ${results.length} imagens otimizadas com sucesso!\n`);
}

main().catch(err => {
  console.error('Erro fatal:', err);
  process.exit(1);
});
