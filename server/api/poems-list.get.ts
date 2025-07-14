import { readdir } from 'fs/promises';
import { join } from 'path';

export default defineEventHandler(async (event) => {
  try {
    const poemsDir = join('content', 'poems');
    const files = await readdir(poemsDir);
    
    const poemSlugs = files
      .filter(file => file.endsWith('.md'))
      .map(file => file.replace('.md', ''));
    
    return poemSlugs.map(slug => {
      return {
        slug: slug,
        _path: `/poems/${slug}`
      };
    });
  } catch (error) {
    console.error('Error reading poems directory:', error);
    return [];
  }
});
