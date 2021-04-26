import tw from 'twin.macro'
import {styled} from '../stitches.config'

const Container = styled('div', {
  ...tw`container mx-auto`,
})

const Language = ({name, children}) => {
  return (
    <div>hello</div>
  )
}

const Uses = () => {
  return (
    <Container>
      hello
      <Language name="Javascript">Da homie</Language>
    </Container>
  )
}

export default Uses