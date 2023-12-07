import { extendTheme } from '@chakra-ui/react'
import { buttonTheme } from './navTheme';

const theme = extendTheme({
  components: {
    Button: buttonTheme,
  },
})

export default theme