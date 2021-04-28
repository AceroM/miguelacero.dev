import {useSpring} from '@react-spring/core'
import {animated} from '@react-spring/web'
import {useState} from 'react'
import tw from 'twin.macro'
import {styled} from '../stitches.config'
import useStore from '../store'

const Container = styled('div', {
  variants: {
    position: {
      center: tw`flex flex-col items-center overflow-auto`,
    }
  }
})

const DefaultWindowContent = ({scrollColor, height = 20, width = 300, position, children}) => {
  const {getThemeFromSticker} = useStore(state => state)
  const {backgroundColor, color} = getThemeFromSticker()

  return (
    <Container position={position}
               style={{scrollbarColor: scrollColor || `${backgroundColor} ${color}`, height, width}}>
      {children}
    </Container>
  )
}

const TwoColumn = styled('div', {
  ...tw`grid gap-4`,
  gridTemplateColumns: '69% auto',
})

const Img = styled(animated.img, {
  ...tw`mt-3 rounded-md max-w-full max-h-full`,
})

export const WithImage = ({src, alt, children}) => {
  const [hover, setHover] = useState(false)
  const props = useSpring({
    transform: hover ? "rotate(69deg)" : "rotate(0deg)"
  });

  return (
    <TwoColumn>
      <div>{children}</div>
      <Img
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={props}
        src={src}
        alt={alt}
      />
    </TwoColumn>
  )
}

export default DefaultWindowContent