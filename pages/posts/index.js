import { useMemo, useState } from 'react'
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  SimpleGrid,
  Stack,
  Text,
  Wrap,
  WrapItem,
  useColorModeValue
} from '@chakra-ui/react'
import Layout from '../../components/layouts/article'
import Section from '../../components/section'
import { PostGridItem } from '../../components/grid-item'
import { getSortedPosts } from '../../lib/posts'

const Posts = ({ posts }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTag, setActiveTag] = useState('All')

  const allTags = useMemo(
    () => ['All', ...new Set(posts.flatMap(post => post.tags || []))],
    [posts]
  )

  const filteredPosts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    return posts.filter(post => {
      const matchesTag =
        activeTag === 'All' || (post.tags || []).includes(activeTag)

      if (!matchesTag) {
        return false
      }

      if (!normalizedQuery) {
        return true
      }

      const searchableText = [post.title, post.summary, ...(post.tags || [])]
        .join(' ')
        .toLowerCase()

      return searchableText.includes(normalizedQuery)
    })
  }, [activeTag, posts, searchQuery])

  return (
    <Layout title="Posts">
      <Container>
        <Heading as="h3" fontSize={20} mb={4}>
          Posts
        </Heading>

        <Text mb={6}>Writing, notes and a few things I want to remember.</Text>

        <Box
          borderWidth="1px"
          borderRadius="lg"
          p={5}
          mb={6}
          bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.100')}
        >
          <Stack spacing={4}>
            <Input
              value={searchQuery}
              onChange={event => setSearchQuery(event.target.value)}
              placeholder="Search posts"
              borderRadius="md"
            />

            <Wrap spacing={2}>
              {allTags.map(tag => {
                const isActive = tag === activeTag

                return (
                  <WrapItem key={tag}>
                    <Button
                      size="sm"
                      borderRadius="full"
                      colorScheme="teal"
                      variant={isActive ? 'solid' : 'ghost'}
                      onClick={() => setActiveTag(tag)}
                    >
                      {tag}
                    </Button>
                  </WrapItem>
                )
              })}
            </Wrap>

            <Text fontSize="sm" color="gray.500">
              {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
            </Text>
          </Stack>
        </Box>

        <Section delay={0.1}>
          {filteredPosts.length ? (
            <SimpleGrid columns={[1, 2, 2]} gap={6}>
              {filteredPosts.map(post => (
                <PostGridItem
                  key={post.slug}
                  slug={post.slug}
                  title={post.title}
                  thumbnail={post.coverImage}
                  date={post.date}
                >
                  {post.summary}
                </PostGridItem>
              ))}
            </SimpleGrid>
          ) : (
            <Text>No posts match your search.</Text>
          )}
        </Section>
      </Container>
    </Layout>
  )
}

export const getStaticProps = async () => ({
  props: {
    posts: getSortedPosts()
  }
})

export default Posts
