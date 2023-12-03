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
  onCellClick?: (cell: GridCell) => void
}

const Grid = ({ cells, onCellClick }: Props) => (
  <div class="grid">
    {cells.map((cell) => (
      <Cell key={cell.id} cell={cell} onCellClick={onCellClick} />
    ))}
  </div>
)

export default Grid
