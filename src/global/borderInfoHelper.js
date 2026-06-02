function cloneBorderSide(side) {
    if (side == null) {
        return null;
    }

    return {
        color: side.color,
        style: side.style,
    };
}

function cellBorderInRange(borderInfoItem, rowRange, columnRange) {
    if (
        borderInfoItem == null ||
        borderInfoItem.rangeType !== "cell" ||
        borderInfoItem.value == null
    ) {
        return false;
    }

    const row = borderInfoItem.value.row_index;
    const column = borderInfoItem.value.col_index;

    return row >= rowRange[0] && row <= rowRange[1] && column >= columnRange[0] && column <= columnRange[1];
}

function borderRangeInside(range, rowRange, columnRange) {
    return (
        range.row[0] >= rowRange[0] &&
        range.row[1] <= rowRange[1] &&
        range.column[0] >= columnRange[0] &&
        range.column[1] <= columnRange[1]
    );
}

export function createCellBorderInfo(row, column, borderValue) {
    const value = borderValue || {};

    return {
        rangeType: "cell",
        value: {
            row_index: row,
            col_index: column,
            l: cloneBorderSide(value.l),
            r: cloneBorderSide(value.r),
            t: cloneBorderSide(value.t),
            b: cloneBorderSide(value.b),
        },
    };
}

export function createEmptyCellBorderInfo(row, column) {
    return createCellBorderInfo(row, column, {
        l: null,
        r: null,
        t: null,
        b: null,
    });
}

export function ensureBorderInfo(cfg) {
    if (cfg.borderInfo == null) {
        cfg.borderInfo = [];
    }

    return cfg.borderInfo;
}

export function removeCellBorderInfoInRange(cfg, rowRange, columnRange) {
    if (cfg == null || cfg.borderInfo == null) {
        return;
    }

    cfg.borderInfo = cfg.borderInfo.filter(function(item) {
        return !cellBorderInRange(item, rowRange, columnRange);
    });
}

export function removeContainedBorderInfoInRange(cfg, rowRange, columnRange) {
    if (cfg == null || cfg.borderInfo == null) {
        return;
    }

    cfg.borderInfo = cfg.borderInfo.filter(function(item) {
        if (cellBorderInRange(item, rowRange, columnRange)) {
            return false;
        }

        if (item.rangeType === "range" && item.range != null) {
            item.range = item.range.filter(function(range) {
                return !borderRangeInside(range, rowRange, columnRange);
            });

            return item.range.length > 0;
        }

        return true;
    });
}

export function pushCellBorderInfo(cfg, row, column, borderValue) {
    ensureBorderInfo(cfg).push(createCellBorderInfo(row, column, borderValue));
}

export function pushEmptyCellBorderInfo(cfg, row, column) {
    ensureBorderInfo(cfg).push(createEmptyCellBorderInfo(row, column));
}

export function createRangeBorderInfo(rowRange, columnRange, value) {
    return {
        rangeType: "range",
        borderType: "border-all",
        color: "#000",
        style: "1",
        range: [{
            row: rowRange,
            column: columnRange,
        }],
        ...(value || {}),
    };
}
