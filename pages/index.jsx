import Link from 'next/link'
import { motion } from 'framer-motion'
import { styled } from '../stitches.config'
import { Page, Box, Card, Image, Text } from '../components'

const Main = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  width: '100vw',

  backgroundColor: '$blue200',
  color: '$locontrast',

  bp1: {
    display: 'grid',
  },
})

const Home = () => {
  return (
    <Page title="Home">
      <Main>
        <Text as="h1">Work in Progress...</Text>
      </Main>
    </Page>
  )
}

export default Home
