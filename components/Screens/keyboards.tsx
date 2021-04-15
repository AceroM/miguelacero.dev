import tw from 'twin.macro'
import {styled} from '../../stitches.config'
import Window from '../Window'

const Text = styled('h2', {
  ...tw`text-lg`,
  variants: {
    size: {
      heading: tw`text-2xl`,
      paragraph: tw`text-base`,
    },
  },
})

const Keyboards = () => {
  return (
    <Window title="Mechanical Keyboards">
      <Text size="heading"> Page in development... </Text>
      <Text size="paragraph"> Meanwhile, here's a list of my current keyboards </Text>
      <ul>
        <li>Magic Keyboard (black)</li>
        <li>Magic Keyboard (white)</li>
        <li>Rama M65-B (Yolk) with 50g Alpaca Switches (Lubed & Filmed)</li>
      </ul>
    </Window>
  )
}

export default Keyboards