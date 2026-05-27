import {
  Box,
  Container,
  Heading,
  List,
  ListItem,
  SimpleGrid,
  Text
} from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'

const gearGroups = [
  {
    title: 'Desk Setup',
    items: [
      'MacBook Pro 14-inch',
      'Studio Display',
      'HHKB Professional Hybrid Type-S',
      'Logitech MX Master 3S'
    ]
  },
  {
    title: 'Development',
    items: [
      'VS Code',
      'Claude Code',
      'Raycast',
      'iTerm2 + Fish shell'
    ]
  },
  {
    title: 'Audio',
    items: [
      'Sony WH-1000XM5',
      'AirPods Pro',
      'Shure MV7',
      'Yamaha HS5'
    ]
  },
  {
    title: 'Daily Carry',
    items: [
      'iPhone 15 Pro',
      'Kindle Paperwhite',
      'Leica Q2',
      'Bellroy Tech Kit'
    ]
  }
]

const Uses = () => (
  <Layout title="Uses">
    <Container>
      <Heading as="h3" fontSize={20} mb={4}>
        Gears
      </Heading>

      <Text mb={6}>
        A few things I use every day for coding, writing and making things.
      </Text>

      <SimpleGrid columns={[1, 1, 2]} gap={6}>
        {gearGroups.map((group, index) => (
          <Section key={group.title} delay={0.1 * (index + 1)}>
            <Box
              borderWidth="1px"
              borderRadius="lg"
              p={5}
              bg="whiteAlpha.50"
            >
              <Heading as="h4" fontSize={16} mb={3}>
                {group.title}
              </Heading>
              <List spacing={2}>
                {group.items.map(item => (
                  <ListItem key={item}>{item}</ListItem>
                ))}
              </List>
            </Box>
          </Section>
        ))}
      </SimpleGrid>
    </Container>
  </Layout>
)

export default Uses
export { getServerSideProps } from '../components/chakra'
