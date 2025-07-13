import { readdir } from 'fs/promises'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  try {
    // Read the poems directory
    const poemsDir = join(process.cwd(), 'content', 'poems')
    const files = await readdir(poemsDir)
    
    // Filter for markdown files and extract slugs
    const poemSlugs = files
      .filter(file => file.endsWith('.md'))
      .map(file => file.replace('.md', ''))
    
    // Return just the slugs so the frontend can query them
    return poemSlugs.map(slug => {
      return {
        slug: slug,
        _path: `/poems/${slug}`
      }
    })
  } catch (error) {
    console.error('Error reading poems directory:', error)
    return []
  }
})
