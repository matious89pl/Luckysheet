const assert = require('node:assert/strict');
const test = require('node:test');

const {
    parseDropdownListText,
    normalizeDataVerificationModel,
    validateCheckboxCellValue,
    validateDropdownCellValue,
} = require('../src/controllers/dataVerificationHelper');

test('normalizes dropdown list items by trimming blanks and duplicates', () => {
    assert.deepEqual(
        parseDropdownListText(' Apple ,,Orange,Apple,, 12 , 12 '),
        ['Apple', 'Orange', '12']
    );
});

test('normalizes comma-separated multi-select values', () => {
    assert.equal(validateDropdownCellValue(' Apple, Orange ', { type: 'dropdown', type2: true }, ['Apple', 'Orange']), true);
});

test('validates checkbox values against checked and unchecked labels', () => {
    const item = { type: 'checkbox', value1: ' Yes ', value2: 'No' };

    assert.equal(validateCheckboxCellValue('Yes', item), true);
    assert.equal(validateCheckboxCellValue(' No ', item), true);
    assert.equal(validateCheckboxCellValue('Maybe', item), false);
});

test('validates dropdown multi-select values after normalizing tokens', () => {
    const item = { type: 'dropdown', type2: true };
    const list = ['Apple', 'Orange', 'Banana'];

    assert.equal(validateDropdownCellValue('Apple, Orange', item, list), true);
    assert.equal(validateDropdownCellValue('Apple, Pear', item, list), false);
    assert.equal(validateDropdownCellValue('', item, list), false);
});

test('validates single dropdown values after trimming list and cell values', () => {
    assert.equal(validateDropdownCellValue(' Apple ', { type: 'dropdown', type2: false }, ['Apple', 'Orange']), true);
});

test('clears empty stale data verification models to null', () => {
    assert.equal(normalizeDataVerificationModel({}), null);
    assert.equal(normalizeDataVerificationModel(null), null);
    assert.deepEqual(
        normalizeDataVerificationModel({ '1_1': undefined, '2_2': { type: 'dropdown' } }),
        { '2_2': { type: 'dropdown' } }
    );
});
