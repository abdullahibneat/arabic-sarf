import Flex from './Flex'
import Text from './Text'

export type TagProps = {
  children: string | number
}

const Tag = ({ children }: TagProps) => (
  <Flex
    height={24}
    padding="0 8px"
    backgroundColor="var(--white)"
    border="solid 1px var(--border)"
    borderRadius={12}
  >
    <Text type="small">{children}</Text>
  </Flex>
)

export default Tag
