import '../styles/Sidebar.scss'

import { useLocation, useRoute } from 'preact-iso'

import AppState from '../AppState'
import Flex from './Flex'
import IconButton from './IconButton'
import MenuItem from './MenuItem'
import Text from './Text'
import replaceRoots from '../helpers/replaceRoots'
import useAppState from '../hooks/useAppState'
import { useState } from 'preact/hooks'
import verbTypes from '../../data'

const Sidebar = () => {
  const [open, setOpen] = useState(false)

  const { tasreefGroupMode } = useAppState()

  const route = useRoute()
  const location = useLocation()

  const {
    صحيح: { I: mujarrad, ...mazeedFih },
  } = verbTypes

  const letters = ['a', 'b', 'c', 'd', 'e', 'f']

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
          onClick={() => location.route('/')}
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
                onClick={() => location.route(`/صحيح/${form}/${باب}`)}
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
                  onClick={() => location.route(`/صحيح/${form}`)}
                />
              )
            })}
        </Flex>
      </Flex>

      <Flex class="footer" gap={16}>
        <IconButton
          active={tasreefGroupMode === 'by-person'}
          name="group-by-person"
          color={tasreefGroupMode === 'by-person' ? 'text' : 'text-secondary'}
          onClick={() => AppState.setItem('tasreefGroupMode', 'by-person')}
        />
        <IconButton
          active={tasreefGroupMode === 'by-gender'}
          name="group-by-gender"
          color={tasreefGroupMode === 'by-gender' ? 'text' : 'text-secondary'}
          onClick={() => AppState.setItem('tasreefGroupMode', 'by-gender')}
        />
        <IconButton
          active={tasreefGroupMode === 'list'}
          name="list"
          color={tasreefGroupMode === 'list' ? 'text' : 'text-secondary'}
          onClick={() => AppState.setItem('tasreefGroupMode', 'list')}
        />
      </Flex>
    </aside>
  )
}

export default Sidebar
