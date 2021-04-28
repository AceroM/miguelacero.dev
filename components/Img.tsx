import {styled} from '../stitches.config'
import tw from 'twin.macro'

const Container = styled('img', {
  ...tw`rounded-md my-2`,
})

const Img = ({src, alt, width, height}) => {
  return (
    <Container
      src={src}
      alt={alt}
      style={{width, height}}
    />
  )
}

export default Img