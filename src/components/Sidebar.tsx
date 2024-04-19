import '../styles/Sidebar.scss'

import { useCallback, useState } from 'preact/hooks'
import { useLocation, useRoute } from 'preact-iso'

import Flex from './Flex'
import IconButton from './IconButton'
import MenuItem from './MenuItem'
import SettingsModal from '../modals/SettingsModal'
import Text from './Text'
import replaceRoots from '../helpers/replaceRoots'
import useModal from '../hooks/useModal'
import verbTypes from '../../data'

const Sidebar = () => {
  const [open, setOpen] = useState(false)

  const route = useRoute()
  const location = useLocation()
  const modal = useModal()

  const {
    صحيح: { '1': mujarrad, ...mazeedFih },
  } = verbTypes

  const letters = ['a', 'b', 'c', 'd', 'e', 'f']

  const handlePress = useCallback(
    (route: string) => () => {
      location.route(route)
      setOpen(false)
    },
    [],
  )

  const openSettings = useCallback(() => {
    modal.open({
      title: 'Settings',
      children: <SettingsModal />,
    })
  }, [])

  return (
    <aside class={open ? 'open' : ''}>
      <div class="header">
        <Text type="h2">صرف</Text>

        <div class="mobile-menu">
          <IconButton
            name={open ? 'close' : 'menu'}
            onClick={() => setOpen(!open)}
          />
        </div>
      </div>

      <Flex flex={1} column gap={36} padding="16px 24px" overflow="auto">
        <MenuItem
          tag="All"
          title="Overview"
          active={route.path === '/'}
          onClick={handlePress('/')}
        />

        <Flex column gap={8}>
          {Object.values(mujarrad).map((originalChapter) => {
            const {
              باب,
              form,
              archetype: { ماضي, مضارع },
            } = replaceRoots(originalChapter)
            return (
              <MenuItem
                key={باب}
                tag={`1${letters.shift()}`}
                title={`${ماضي.معروف} ${مضارع.معروف}`}
                active={decodeURI(route.path) === `/صحيح/${form}/${باب}`}
                onClick={handlePress(`/صحيح/${form}/${باب}`)}
              />
            )
          })}
        </Flex>

        <Flex column gap={8}>
          {Object.values(mazeedFih)
            .flatMap((chapter) => chapter ?? [])
            .map((originalChapter) => {
              const {
                باب,
                form,
                archetype: { ماضي, مضارع },
              } = replaceRoots(originalChapter)
              return (
                <MenuItem
                  key={باب}
                  tag={form}
                  title={`${ماضي.معروف} ${مضارع.معروف}`}
                  active={decodeURI(route.path) === `/صحيح/${form}`}
                  onClick={handlePress(`/صحيح/${form}`)}
                />
              )
            })}
        </Flex>
      </Flex>

      <Flex class="footer" alignItems="stretch">
        <Flex flex={1} />
        <Flex
          justifyContent="center"
          alignItems="center"
          borderLeft="solid 1px var(--border)"
          padding="0 8px"
        >
          <IconButton name="settings" onClick={openSettings} />
        </Flex>
      </Flex>
    </aside>
  )
}

export default Sidebar
