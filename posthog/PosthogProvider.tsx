import { PostHogProvider } from 'posthog-js/react'
import posthog from 'posthog-js'
import { useEffect } from 'react'

const PosthogProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      loaded: (posthog) => {
        if (process.env.NODE_ENV === 'development') posthog.debug() // debug mode in development
      },
      autocapture: false,
    })
  }, [])

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}

export default PosthogProvider
