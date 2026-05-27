import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

const colorModeScript = `(function () {
  try {
    var STORAGE_KEY = 'chakra-ui-color-mode'
    var DARK_CLASS = 'chakra-ui-dark'
    var LIGHT_CLASS = 'chakra-ui-light'

    function parseCookie(cookie) {
      var match = cookie.match(new RegExp('(^| )' + STORAGE_KEY + '=([^;]+)'))
      return match ? match[2] : undefined
    }

    function writeCookie(value) {
      document.cookie = STORAGE_KEY + '=' + value + '; max-age=31536000; path=/'
    }

    function getBeijingColorMode() {
      var hour = Number(
        new Intl.DateTimeFormat('en-US', {
          hour: 'numeric',
          hour12: false,
          timeZone: 'Asia/Shanghai'
        }).format(new Date())
      )

      return hour >= 20 || hour < 8 ? 'dark' : 'light'
    }

    var cookieValue = parseCookie(document.cookie)
    var localValue

    try {
      localValue = localStorage.getItem(STORAGE_KEY) || undefined
    } catch (error) {}

    if (!cookieValue && localValue) {
      writeCookie(localValue)
    }

    var value = cookieValue || localValue || getBeijingColorMode()
    var isDark = value === 'dark'

    document.body.classList.add(isDark ? DARK_CLASS : LIGHT_CLASS)
    document.body.classList.remove(isDark ? LIGHT_CLASS : DARK_CLASS)
    document.documentElement.style.colorScheme = value
    document.documentElement.dataset.theme = value
  } catch (error) {}
})()`

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <script dangerouslySetInnerHTML={{ __html: colorModeScript }} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
