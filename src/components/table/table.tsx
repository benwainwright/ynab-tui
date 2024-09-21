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
  cellComponents?: (
    | (<V extends Scalar>(config: { value: V }) => React.ReactNode)
    | undefined
  )[]
}

export const Table = <T extends ScalarDict>({
  start,
  end,
  data,
  cellComponents,
}: TableProps<T>) => {
  const headerRow = Object.entries(data[0]).map(([key]) => key)

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
    .map((row, i) => (
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
              <Text wrap="truncate-end">
                {CellComponent ? <CellComponent value={cell} /> : cell}
              </Text>
            </Box>
          )
        })}
      </Box>
    ))

  return (
    <Box flexDirection="column" borderStyle={'single'} width={'100%'}>
      {headerBoxes}
      {contentBoxes}
    </Box>
  )
}
