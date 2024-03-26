import '../styles/Sidebar.scss'

import AppState from '../AppState'
import Flex from './Flex'
import IconButton from './IconButton'
import MenuItem from './MenuItem'
import Text from './Text'
import useAppState from '../hooks/useAppState'
import { useState } from 'preact/hooks'

const Sidebar = () => {
  const [open, setOpen] = useState(false)

  const { tasreefGroupMode } = useAppState()

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
        <MenuItem tag="All" title="Overview" />

        <Flex column gap={8}>
          <MenuItem tag="1a" title="نَصَرَ يَنْصُرُ" />
          <MenuItem tag="1b" title="ضَرَبَ يَضْرِبُ" />
          <MenuItem tag="1c" title="فَتَحَ يَفْتَحُ" />
          <MenuItem tag="1d" title="سَمْعَ يَسْمَعُ" />
          <MenuItem tag="1e" title="حَسِبَ يَحْسِبُ" />
          <MenuItem tag="1f" title="كَرُمَ يَكْرُمُ" />
        </Flex>

        <Flex column gap={8}>
          <MenuItem tag="2" title="كَذَّبَ يُكَذِّبُ" />
          <MenuItem tag="3" title="شَاهَدَ يُشَاهِدُ" />
          <MenuItem tag="4" title="أَنْزَلَ يُنْزِلُ" />
          <MenuItem tag="5" title="تَذَكَّرَ يَتَذَكَّرُ" />
          <MenuItem tag="6" title="تبادَلَ يَتَبَادَلُ" />
          <MenuItem tag="7" title="انْصَرَفَ يَنْصَرِفُ" />
          <MenuItem tag="8" title="احْتَرَمَ يَحْتَرِمُ" />
          <MenuItem tag="9" title="احْمَرَّ يَحْمَرُّ" />
          <MenuItem tag="10" title="اسْتَخْدَمَ يَسْتَخْدِمُ" />
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
