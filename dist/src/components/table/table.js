import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Text } from "ink";
export const Table = ({ start, end, data, cellComponents })=>{
    const headerRow = Object.entries(data[0]).map(([key])=>key);
    const rows = data.map((row)=>Object.entries(row).map(([key, value])=>value));
    const all = [
        headerRow,
        ...rows
    ];
    const startWidths = Array.from({
        length: Object.entries(data[0]).length
    }).map(()=>({
            length: 0,
            content: ''
        }));
    const widths = all.reduce((previousWidths, row)=>{
        return previousWidths.map((maxWidth, i)=>{
            if (maxWidth.length > String(row[i]).length) {
                return maxWidth;
            } else {
                return {
                    length: String(row[i]).length,
                    content: String(row[i])
                };
            }
        });
    }, startWidths).map((item)=>({
            ...item,
            length: item.length + 4
        }));
    const headerBoxes = /*#__PURE__*/ _jsx(Box, {
        flexDirection: "row",
        children: headerRow.map((header, i)=>/*#__PURE__*/ _jsx(Box, {
                width: widths[i].length,
                paddingX: 1,
                children: /*#__PURE__*/ _jsx(Text, {
                    color: "green",
                    bold: true,
                    children: header
                })
            }, `header-cell-${header}`))
    });
    const contentBoxes = rows.slice(start ?? 0, end ?? data.length).map((row, i)=>/*#__PURE__*/ _jsx(Box, {
            flexDirection: "row",
            borderTop: true,
            borderLeft: false,
            borderRight: false,
            borderBottom: false,
            borderStyle: "single",
            children: row.map((cell, ic)=>{
                const CellComponent = cellComponents?.[ic];
                return /*#__PURE__*/ _jsx(Box, {
                    borderBottom: false,
                    borderTop: false,
                    borderStyle: "single",
                    borderRight: false,
                    borderLeft: ic > 0 ? true : false,
                    width: widths[ic].length,
                    paddingX: 1,
                    children: /*#__PURE__*/ _jsx(Text, {
                        wrap: "truncate-end",
                        children: CellComponent ? /*#__PURE__*/ _jsx(CellComponent, {
                            value: cell
                        }) : cell
                    })
                }, `cell-${cell}-${ic}`);
            })
        }, `table-row-${i}`));
    return /*#__PURE__*/ _jsxs(Box, {
        flexDirection: "column",
        borderStyle: 'single',
        width: '100%',
        children: [
            headerBoxes,
            contentBoxes
        ]
    });
};

//# sourceMappingURL=table.js.map