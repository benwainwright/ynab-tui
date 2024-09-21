import { Box, DOMElement, measureElement, Text } from 'ink'
import { useState } from 'react'

export type Scalar = string | number | boolean | null | undefined

type ScalarDict = {
  [key: string]: Scalar
}

interface TableProps<T extends ScalarDict> {
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

export const Table = <T extends ScalarDict>({
  start,
  selected,
  end,
  data,
  cellComponents,
}: TableProps<T>) => {
  const headerRow = Object.entries(data[0]).map(
    ([key]) => `${key.charAt(0).toLocaleUpperCase()}${key.slice(1)}`,
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
        if (maxWidth.length > String(row[i]).length) {
          return maxWidth
        } else {
          return { length: String(row[i]).length, content: String(row[i]) }
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
            const color = rowSelected ? { color: 'green' } : {}
            return (
              <Box
                borderBottom={false}
                borderTop={false}
                borderStyle="single"
                borderRight={false}
                borderLeft={ic > 0 ? true : false}
                key={`cell-${cell}-${ic}`}
                width={widths[ic].length}
                paddingX={1}
              >
                {CellComponent ? (
                  <CellComponent {...color} value={cell} />
                ) : (
                  <Text {...color}>{cell}</Text>
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
