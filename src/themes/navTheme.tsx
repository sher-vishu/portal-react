import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const brandPrimary = defineStyle({
  background: 'white',
  color: '#334d80',
  fontSize: 'sm',
  fontWeight: 'semibold',
})
  

export const buttonTheme = defineStyleConfig({
  variants: { brandPrimary },
})