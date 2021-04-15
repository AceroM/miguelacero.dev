import tw, {theme} from 'twin.macro'
import {styled} from '../stitches.config'
import useStore from '../store'

const Container = styled('div', {
  ...tw`bg-white overflow-hidden rounded-2xl p-0 shadow-md`,
  height: '60vh',
  width: '70vw',
  '@bp1': {
    width: '75w'
  },
  '@bp2': {
    width: '10w'
  }
})

const TitleBar = styled('div', {
  ...tw`relative text-center rounded-t-2xl`,
  padding: '4px 65px 5px',
  boxShadow: 'inset 0 0 0 0 hsl(0deg 0% 100% / 60%), inset 0 0 0 0 rgb(0 0 0 / 20%)',
  backgroundImage: 'linear-gradient(180deg,#e7e6e7,#d1d0d1)',
})

const Controls = styled('div', {
  ...tw`flex absolute items-center`,
  top: 5, bottom: 5, left: 6,
})

const Button = styled('button', {
  ...tw`block h-4 w-4 mr-0.5 p-0 rounded-full cursor-pointer`,
  variants: {
    color: {
      red: {
        backgroundColor: '#ff5f58',
        borderColor: '#e1483f',
      },
      yellow: {
        backgroundColor: '#ffbe2f',
        borderColor: '#e0a028',
      },
      green: {
        backgroundColor: '#2ac940',
        borderColor: '#2bac2d',
      },
    }
  }
})

const Text = styled('div', {
  fontWeight: 400,
  letterSpacing: -0.3,
  color: String(theme`colors.macText`),
  fontSize: 15,
})

const Body = styled('div', {
  ...tw`h-full m-0 flex-1`,
})

const Center = styled('div', {
  ...tw`h-full p-8 flex flex-col items-center justify-center`,
})

const Window = ({title, children}) => {
  const {getThemeFromSticker} = useStore(state => state)
  return (
    <Container>
      <TitleBar>
        <Controls>
          <Button color="red"/>
          <Button color="yellow"/>
          <Button color="green"/>
        </Controls>
        <Text>
          {title}
        </Text>
      </TitleBar>
      <Body>
        <Center style={getThemeFromSticker()}>
          {children}
        </Center>
      </Body>
    </Container>
  )
}

export default Window