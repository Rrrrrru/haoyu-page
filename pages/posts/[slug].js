import { Container, HStack, Text } from '@chakra-ui/react'
import Layout from '../../components/layouts/article'
import { MarkdownBody, PostImage, PostMeta, PostTitle } from '../../components/post'
import { getAllPostSlugs, getPostBySlug } from '../../lib/posts'

const Post = ({ post }) => (
  <Layout title={post.title}>
    <Container>
      <PostTitle>{post.title}</PostTitle>
      <Text color="gray.500" fontSize="sm" mb={4}>
        {post.date}
      </Text>

      {post.tags?.length ? (
        <HStack spacing={0} wrap="wrap" mb={4}>
          {post.tags.map(tag => (
            <PostMeta key={tag}>{tag}</PostMeta>
          ))}
        </HStack>
      ) : null}

      {post.coverImage ? <PostImage src={post.coverImage} alt={post.title} /> : null}

      <MarkdownBody content={post.content} />
    </Container>
  </Layout>
)

export const getStaticPaths = async () => ({
  paths: getAllPostSlugs().map(slug => ({
    params: { slug }
  })),
  fallback: false
})

export const getStaticProps = async ({ params }) => {
  const post = getPostBySlug(params.slug)

  if (!post) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      post
    }
  }
}

export default Post
