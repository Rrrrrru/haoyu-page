import { ChakraProvider } from '@chakra-ui/react'
import theme from '../lib/theme'

const STORAGE_KEY = 'chakra-ui-color-mode'
const COOKIE_MAX_AGE = 31536000

const parseCookie = (cookie = '') => {
  const match = cookie.match(new RegExp(`(^| )${STORAGE_KEY}=([^;]+)`))
  return match?.[2]
}

const getBeijingColorMode = () => {
  try {
    const hour = Number(
      new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        hour12: false,
        timeZone: 'Asia/Shanghai'
      }).format(new Date())
    )

    return hour >= 20 || hour < 8 ? 'dark' : 'light'
  } catch (error) {
    return 'light'
  }
}

const writeCookie = value => {
  document.cookie = `${STORAGE_KEY}=${value}; max-age=${COOKIE_MAX_AGE}; path=/`
}

const createColorModeManager = cookies => ({
  ssr: typeof cookies === 'string',
  type: 'cookie',
  get(init) {
    if (typeof document === 'undefined') {
      if (typeof cookies === 'string') {
        return parseCookie(cookies) || getBeijingColorMode() || init
      }

      return init
    }

    const cookieValue = parseCookie(document.cookie)

    if (cookieValue) {
      return cookieValue
    }

    try {
      const localValue = localStorage.getItem(STORAGE_KEY)

      if (localValue) {
        writeCookie(localValue)
        return localValue
      }
    } catch (error) {}

    return getBeijingColorMode() || init
  },
  set(value) {
    if (typeof document === 'undefined') {
      return
    }

    try {
      localStorage.setItem(STORAGE_KEY, value)
    } catch (error) {}

    writeCookie(value)
  }
})

export default function Chakra({ cookies, children }) {
  return (
    <ChakraProvider
      theme={theme}
      colorModeManager={createColorModeManager(cookies)}
    >
      {children}
    </ChakraProvider>
  )
}

export async function getServerSideProps({ req }) {
  return {
    props: {
      cookies: req.headers.cookie ?? ''
    }
  }
}
