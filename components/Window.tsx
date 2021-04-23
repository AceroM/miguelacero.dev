import {styled} from '../stitches.config'
import tw from 'twin.macro'
import useStore from '../store'

const Container = styled('div', {
  ...tw`flex flex-col items-center overflow-auto`,
  '@initial': {
    h2: {
      backgroundColor: 'red',
    }
  }
})

const Window = ({scrollColor, height = 400, children}) => {
  const {getThemeFromSticker} = useStore(state => state)
  const {backgroundColor, color} = getThemeFromSticker()
  return (
    <Container style={{scrollbarColor: scrollColor || `${backgroundColor} ${color}`, height}}>
      {children}
    </Container>
  )
}

export default Window