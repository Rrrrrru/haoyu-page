import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/posts')

const isPublished = data => data.published !== false

const normalizePostData = data => ({
  ...data,
  date:
    data.date instanceof Date
      ? data.date.toISOString().slice(0, 10)
      : data.date || '',
  tags: data.tags || []
})

const sortByDate = (a, b) => {
  if (a.date < b.date) return 1
  if (a.date > b.date) return -1
  return 0
}

export const getSortedPosts = () => {
  const fileNames = fs.readdirSync(postsDirectory)

  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)

      return {
        slug,
        ...normalizePostData(data)
      }
    })
    .filter(isPublished)
    .sort(sortByDate)
}

export const getAllPostSlugs = () => getSortedPosts().map(post => post.slug)

export const getPostBySlug = slug => {
  const fullPath = path.join(postsDirectory, `${slug}.md`)

  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug,
    content,
    ...normalizePostData(data)
  }
}
