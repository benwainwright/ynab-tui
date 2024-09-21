import { Box, DOMElement, measureElement, Text } from 'ink'
import { useState } from 'react'

export type Scalar = string | number | boolean | undefined

type Cell = Scalar | { value: Scalar; color: string }

type Row = {
  [key: string]: Cell
}

interface TableProps<T extends Row> {
  onPageChange?: (page: number) => void
  start?: number
  end?: number
  data: T[]
  selected?: number
  cellComponents?: (
    | (<V extends Scalar>(config: { value: V }) => React.ReactNode)
    | undefined
  )[]
}

export const Table = <T extends Row>({
  start,
  selected,
  end,
  data,
  cellComponents,
}: TableProps<T>) => {
  const headerRow = Object.keys(data[0]).map(
    (key) => `${key.charAt(0).toLocaleUpperCase()}${key.slice(1)}`,
  )

  const rows = data.map((row) =>
    Object.entries(row).map(([key, value]) => value),
  )

  const all = [headerRow, ...rows]

  const startWidths = Array.from({
    length: Object.entries(data[0]).length,
  }).map(() => ({ length: 0, content: '' }))

  const widths = all
    .reduce<{ length: number; content: string }[]>((previousWidths, row) => {
      return previousWidths.map((maxWidth, i) => {
        const length = Array.from(String(row[i])).length
        if (maxWidth.length > length) {
          return maxWidth
        } else {
          return { length, content: String(row[i]) }
        }
      })
    }, startWidths)
    .map((item) => ({ ...item, length: item.length + 4 }))

  const headerBoxes = (
    <Box flexDirection="row">
      {headerRow.map((header, i) => (
        <Box
          key={`header-cell-${header}`}
          width={widths[i].length}
          paddingX={1}
        >
          <Text color="green" bold>
            {header}
          </Text>
        </Box>
      ))}
    </Box>
  )

  const contentBoxes = rows
    .slice(start ?? 0, end ?? data.length)
    .map((row, i) => {
      const rowSelected = selected === i
      return (
        <Box
          flexDirection="row"
          key={`table-row-${i}`}
          borderTop={true}
          borderLeft={false}
          borderRight={false}
          borderBottom={false}
          borderStyle="single"
        >
          {row.map((cell, ic) => {
            const CellComponent = cellComponents?.[ic]
            const selectedColor = rowSelected ? { color: 'green' } : {}
            const cellValue = typeof cell === 'object' ? cell?.value : cell
            const color =
              typeof cell === 'object'
                ? { ...selectedColor, color: cell.color }
                : selectedColor

            const width =
              typeof cellValue === 'string' && cellValue.includes('❌')
                ? widths[ic].length - 1
                : widths[ic].length

            return (
              <Box
                borderBottom={false}
                borderTop={false}
                borderStyle="single"
                borderRight={false}
                borderLeft={ic > 0 ? true : false}
                key={`cell-${cell}-${ic}`}
                width={width}
                paddingX={1}
              >
                {CellComponent ? (
                  <CellComponent {...color} value={cellValue} />
                ) : (
                  <Text {...color}>{cellValue}</Text>
                )}
              </Box>
            )
          })}
        </Box>
      )
    })

  return (
    <Box flexDirection="column" borderStyle={'single'} width={'100%'}>
      {headerBoxes}
      {contentBoxes}
    </Box>
  )
}
