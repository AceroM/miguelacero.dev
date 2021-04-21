import tw from 'twin.macro'
import {styled} from '../../stitches.config'

const Container = styled('div', {
  ...tw`flex flex-col items-center overflow-auto`,
  width: 400,
  height: 200,
})

const Img = styled('img', {
  ...tw`rounded-md my-2`,
  width: 300,
})

const Article = styled('article', {
  ...tw`prose text-white`,
})

const Codefest = styled('img', {
  width: 200,
  height: 150,
})

const Hunter = () => {
  return (
    <Container>
      <Img src="https://lh3.googleusercontent.com/proxy/fc2ZWYxX-JxybpcnGtHeTRgkizDvExxl2CUspHc3hY3LFy58l4lz75is6swT5WxxK1kex53aFoC8bAkw2mFitvmcbM8CwFr2tNSohh7BLV79RjbBL5TQZNF1RVaGg51rLStb6A2FUuhKFuc" />
      <Article>
        <p>
          I graduated Hunter College with a majors in Computer Science and a minor in Japanese Language.
        </p>
        <p>
          I was in the Daedalus program, and helped organize codefest, an annual hackathon for hunter college.
          <Codefest src="images/codefest.png" />
        </p>
      </Article>
    </Container>
  )
}

export default Hunter