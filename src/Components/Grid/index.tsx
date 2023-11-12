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
      <div
        key={cell.id}
        class="cell"
        disabled={cell.disabled}
        onClick={() => onCellClick?.(cell)}
      >
        <h2>{cell.heading}</h2>
        {cell.description && <p>{cell.description}</p>}
      </div>
    ))}
  </div>
)

export default Grid
