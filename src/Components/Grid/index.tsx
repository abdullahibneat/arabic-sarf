import Cell from './Cell'
import './GridStyles.scss'

export type GridCell = {
  id: string
  heading: string
  description?: string
  disabled?: boolean
}

type Props = {
  cells: GridCell[]
  rtl?: boolean
  onCellClick?: (cell: GridCell) => void
}

const Grid = ({ cells, rtl, onCellClick }: Props) => (
  <div class="grid" style={{ direction: rtl ? 'rtl' : undefined }}>
    {cells.map((cell) => (
      <Cell key={cell.id} cell={cell} onCellClick={onCellClick} />
    ))}
  </div>
)

export default Grid
