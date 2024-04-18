import Segmented, { SegmentedOption } from '../components/Segmented'

import Flex from '../components/Flex'
import Text from '../components/Text'
import { useState } from 'preact/hooks'

const SettingsModal = () => {
  const options: SegmentedOption[] = [
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
    { label: 'Option 3', value: 3 },
  ]

  const [option, setOption] = useState<SegmentedOption | null>(null)

  return (
    <Flex column gap={12} width={400} padding={24} paddingTop={12}>
      <Flex column gap={4}>
        <Text>Verb types</Text>
        <Segmented
          value={option?.value}
          options={options}
          onChange={setOption}
        />
      </Flex>

      <Flex column gap={4}>
        <Text>Mujarrad chapter headings</Text>
        <Segmented
          value={option?.value}
          options={options}
          onChange={setOption}
        />
      </Flex>

      <Flex column gap={4}>
        <Text>Edit root letters</Text>
        <Segmented
          value={option?.value}
          options={options}
          onChange={setOption}
        />
      </Flex>

      <Flex column gap={4}>
        <Text>Sarf sagheer</Text>
        <Segmented
          value={option?.value}
          options={options}
          onChange={setOption}
        />
      </Flex>

      <Flex column gap={4}>
        <Text>Majhool</Text>
        <Segmented
          value={option?.value}
          options={options}
          onChange={setOption}
        />
      </Flex>
    </Flex>
  )
}

export default SettingsModal
