import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

function loadNamedHelpers(path, names) {
    let source = readFileSync(path, "utf8");
    source = source.replace(/export\s+function\s+/g, "function ");
    source = source.replace(/export\s+const\s+/g, "const ");
    source = source.replace(/export\s*\{[^}]+\};?/g, "");

    return new Function(`${source}\nreturn { ${names.join(", ")} };`)();
}

const border = loadNamedHelpers("src/global/borderInfoHelper.js", [
    "createCellBorderInfo",
    "createEmptyCellBorderInfo",
    "removeContainedBorderInfoInRange",
    "removeCellBorderInfoInRange",
]);

const dropdown = loadNamedHelpers("src/controllers/dataVerificationHelper.js", [
    "cloneDataVerificationItem",
    "normalizeDropdownValue",
    "parseDropdownListText",
    "setDataVerificationFromSource",
    "validateCheckboxCellValue",
    "validateDropdownCellValue",
]);

const {
    createCellBorderInfo,
    createEmptyCellBorderInfo,
    removeContainedBorderInfoInRange,
    removeCellBorderInfoInRange,
} = border;

const {
    cloneDataVerificationItem,
    normalizeDropdownValue,
    parseDropdownListText,
    setDataVerificationFromSource,
    validateCheckboxCellValue,
    validateDropdownCellValue,
} = dropdown;

{
    const cfg = {
        borderInfo: [
            { rangeType: "range", range: [{ row: [1, 1], column: [1, 1] }] },
            { rangeType: "cell", value: { row_index: 1, col_index: 1, l: { color: "#111", style: "1" } } },
            { rangeType: "cell", value: { row_index: 1, col_index: 1, r: { color: "#222", style: "1" } } },
            { rangeType: "cell", value: { row_index: 2, col_index: 1, l: { color: "#333", style: "1" } } },
        ],
    };

    removeCellBorderInfoInRange(cfg, [1, 1], [1, 1]);

    assert.equal(cfg.borderInfo.length, 2);
    assert.equal(cfg.borderInfo[0].rangeType, "range");
    assert.equal(cfg.borderInfo[1].value.row_index, 2);
}

{
    const cfg = {
        borderInfo: [
            { rangeType: "range", range: [{ row: [1, 1], column: [1, 1] }] },
            { rangeType: "range", range: [{ row: [0, 3], column: [0, 3] }] },
            { rangeType: "cell", value: { row_index: 1, col_index: 1, l: { color: "#111", style: "1" } } },
        ],
    };

    removeContainedBorderInfoInRange(cfg, [1, 1], [1, 1]);

    assert.equal(cfg.borderInfo.length, 1);
    assert.deepEqual(cfg.borderInfo[0].range, [{ row: [0, 3], column: [0, 3] }]);
}

{
    const side = { color: "#123456", style: "2" };
    const entry = createCellBorderInfo(3, 4, { l: side });
    side.color = "#000000";

    assert.deepEqual(entry.value, {
        row_index: 3,
        col_index: 4,
        l: { color: "#123456", style: "2" },
        r: null,
        t: null,
        b: null,
    });
    assert.deepEqual(createEmptyCellBorderInfo(5, 6).value, {
        row_index: 5,
        col_index: 6,
        l: null,
        r: null,
        t: null,
        b: null,
    });
}

{
    assert.deepEqual(parseDropdownListText("A, B,,C "), ["A", "B", "C"]);
    assert.equal(normalizeDropdownValue(42), "42");
    assert.equal(validateDropdownCellValue("1,2", { type2: true }, [1, 2]), true);
    assert.equal(validateDropdownCellValue("1,3", { type2: true }, [1, 2]), false);
    assert.equal(validateCheckboxCellValue("Yes", { value1: "Yes", value2: "No" }), true);
    assert.equal(validateCheckboxCellValue("Maybe", { value1: "Yes", value2: "No" }), false);
}

{
    const source = { type: "dropdown", value1: "A,B" };
    const dataVerification = {
        "1_1": { type: "dropdown", value1: "old" },
        "9_9": { type: "dropdown", value1: "keep" },
    };

    setDataVerificationFromSource(dataVerification, "1_1", source);
    source.value1 = "changed";

    assert.deepEqual(dataVerification["1_1"], { type: "dropdown", value1: "A,B" });
    setDataVerificationFromSource(dataVerification, "1_1", null);
    assert.equal(dataVerification["1_1"], undefined);
    assert.deepEqual(dataVerification["9_9"], { type: "dropdown", value1: "keep" });
    assert.deepEqual(cloneDataVerificationItem(null), null);
}

console.log("border/dropdown regression helpers passed");
