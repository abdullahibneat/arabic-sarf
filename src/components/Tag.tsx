import Flex from './Flex'
import Text from './Text'

export type TagProps = {
  children: string | number
}

const Tag = ({ children }: TagProps) => (
  <Flex
    height="1.5rem"
    padding="0 0.5rem"
    backgroundColor="var(--white)"
    border="solid 1px var(--border)"
    borderRadius={12}
  >
    <Text type="small" ellipsis>
      {children}
    </Text>
  </Flex>
)

export default Tag
