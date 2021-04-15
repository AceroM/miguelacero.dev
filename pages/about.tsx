import tw from 'twin.macro'
import Header from '../components/Header'
import {styled} from '../stitches.config'

const Container = styled('div', {
  ...tw``,
})

const Body = styled('div', {
  ...tw`flex justify-center items-center h-full`,
})

const About = () => {
  return (
    <Container>
      <Header title="About" />
      <Body>
        Page in development...
      </Body>
    </Container>
  )
}

export default About