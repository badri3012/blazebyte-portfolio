const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('./src');
let changedFiles = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  let newContent = content
    .replace(/bg-background-light/g, 'bg-background')
    .replace(/text-text-primary/g, 'text-primary')
    .replace(/text-text-secondary/g, 'text-secondary')
    .replace(/border-background-light/g, 'border-background')
    .replace(/border-surface-light/g, 'border-surface')
    .replace(/bg-surface-light/g, 'bg-surface')
    // We explicitly keep bg-primary if we want dark sections, but let's change bg-background-dark 
    // to bg-primary and text-[#f4f4f5] to text-background so it uses inverted colors.
    .replace(/bg-background-dark/g, 'bg-primary')
    .replace(/text-\[\#f4f4f5\]/g, 'text-background')
    .replace(/bg-\[\#000000\]/g, 'bg-primary')
    .replace(/bg-black/g, 'bg-primary');
  
  if (content !== newContent) {
    fs.writeFileSync(file, newContent);
    console.log(`Updated ${file}`);
    changedFiles++;
  }
});

console.log(`\nComplete! Updated ${changedFiles} files.`);
