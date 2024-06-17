import { ComponentStyleConfig, StyleFunctionProps } from '@chakra-ui/react'

const CardStyle: ComponentStyleConfig = {
  variants: {
    primary: (props: StyleFunctionProps) => ({
      container: {
        bgColor: 'white',
        boxShadow: "0 4px 120px 0 rgba(115, 115, 155, 8%)",
        borderRadius: '8px',
      },
    }),
  },

  defaultProps: {
    variant: 'primary',
  },
}

export default CardStyle
