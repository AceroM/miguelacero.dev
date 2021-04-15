import {useSpring} from '@react-spring/core'
import {a as web} from '@react-spring/web'
import {EffectComposer} from '@react-three/postprocessing'
import tw from 'twin.macro'
import {styled} from '../stitches.config'

const Container = styled(web.div, {
  ...tw`absolute h-full w-full z-50`,
  backgroundColor: '#FFFDD0',
  opacity: 0.5
})

const Text = styled('h2', {
  ...tw`h-full flex items-center justify-center`,
  transform: 'translate3d(86px, -45px, 0) rotate(-5deg)',
  fontSize: 34
})

const C = styled('span', {
  fontSize: 69
})

const Intro = () => {
  const fadeIn = useSpring({
    from: {opacity: 0, transform: 'translateX(-30px)'},
    to: {opacity: 1, transform: 'translateX(0px)'},
  })
  return (
    <Container>
      <EffectComposer>
      </EffectComposer>
      <Text>
        <C>M</C>iguel Acero
      </Text>
    </Container>
  )
}

export default Intro