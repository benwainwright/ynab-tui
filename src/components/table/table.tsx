import { Box, DOMElement, measureElement, Text } from 'ink'

export type Scalar = string | number | boolean | null | undefined

type ScalarDict = {
  [key: string]: Scalar
}

interface TableProps<T extends ScalarDict> {
  data: T[]
  cellComponents?: (
    | (<V extends Scalar>(config: { value: V }) => React.ReactNode)
    | undefined
  )[]
}

export const Table = <T extends ScalarDict>({
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
  }).map(() => 0)

  const widths = all
    .reduce<number[]>((previousWidths, row) => {
      return previousWidths.map((maxWidth, i) => {
        return Math.max(maxWidth, String(row[i]).length)
      })
    }, startWidths)
    .map((item) => item + 2)

  const headerBoxes = (
    <Box flexDirection="row" gap={3}>
      {headerRow.map((header, i) => (
        <Box paddingX={1} key={`header-cell-${header}`} width={widths[i]}>
          <Text color="green" bold>
            {header}
          </Text>
        </Box>
      ))}
    </Box>
  )

  const contentBoxes = rows.map((row, i) => (
    <Box
      flexDirection="row"
      key={`table-row-${i}`}
      gap={3}
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
            width={widths[ic]}
            paddingX={1}
          >
            <Text>{CellComponent ? <CellComponent value={cell} /> : cell}</Text>
          </Box>
        )
      })}
    </Box>
  ))

  return (
    <Box flexDirection="column" borderStyle={'single'} width={"100%"}>
      {headerBoxes}
      {contentBoxes}
    </Box>
  )
}
