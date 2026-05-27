import NextLink from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {
  Badge,
  Box,
  Code,
  Divider,
  Heading,
  Image,
  Link,
  List,
  ListItem,
  Text
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'

export const PostTitle = ({ children }) => (
  <Box>
    <Link as={NextLink} href="/posts" scroll={false}>
      Posts
    </Link>
    <span>
      {' '}
      <ChevronRightIcon />{' '}
    </span>
    <Heading display="inline-block" as="h3" fontSize={20} mb={4}>
      {children}
    </Heading>
  </Box>
)

export const PostMeta = ({ children }) => (
  <Badge colorScheme="teal" mr={2} mb={2}>
    {children}
  </Badge>
)

export const PostImage = ({ src, alt }) => (
  <Image borderRadius="lg" w="full" src={src} alt={alt} mb={6} />
)

export const MarkdownBody = ({ content }) => (
  <Box lineHeight={1.8}>
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <Heading as="h1" fontSize={32} mt={8} mb={4}>
            {children}
          </Heading>
        ),
        h2: ({ children }) => (
          <Heading as="h2" fontSize={24} mt={8} mb={4}>
            {children}
          </Heading>
        ),
        h3: ({ children }) => (
          <Heading as="h3" fontSize={20} mt={6} mb={3}>
            {children}
          </Heading>
        ),
        p: ({ children }) => <Box mb={4}>{children}</Box>,
        a: ({ href, children }) => (
          <Link href={href} color="teal.500" isExternal={href?.startsWith('http')}>
            {children}
          </Link>
        ),
        ul: ({ children }) => (
          <List styleType="disc" pl={6} mb={4} spacing={2}>
            {children}
          </List>
        ),
        ol: ({ children }) => (
          <List as="ol" styleType="decimal" pl={6} mb={4} spacing={2}>
            {children}
          </List>
        ),
        li: ({ children }) => <ListItem>{children}</ListItem>,
        blockquote: ({ children }) => (
          <Box borderLeftWidth="4px" borderLeftColor="teal.400" pl={4} py={2} my={6}>
            <Text color="gray.600">{children}</Text>
          </Box>
        ),
        hr: () => <Divider my={8} />,
        img: ({ src, alt }) => <PostImage src={src} alt={alt} />,
        code: ({ inline, children }) => {
          if (inline) {
            return (
              <Code fontSize="0.84em" px={1.5} py={0.5} borderRadius="md">
                {children}
              </Code>
            )
          }

          return (
            <Box
              as="pre"
              bg="whiteAlpha.200"
              borderRadius="lg"
              px={4}
              py={3}
              my={6}
              overflowX="auto"
            >
              <Code bg="transparent" whiteSpace="pre" p={0}>
                {String(children).replace(/\n$/, '')}
              </Code>
            </Box>
          )
        }
      }}
    >
      {content}
    </ReactMarkdown>
  </Box>
)
