export function cloneDataVerificationItem(item) {
    if (item == null) {
        return null;
    }

    return JSON.parse(JSON.stringify(item));
}

export function normalizeDropdownValue(value) {
    if (value == null) {
        return "";
    }

    return value.toString().trim();
}

export function parseDropdownListText(text) {
    return normalizeDropdownValue(text)
        .split(",")
        .map(function(item) {
            return item.trim();
        })
        .filter(function(item) {
            return item.length > 0;
        })
        .filter(function(item, index, list) {
            return list.indexOf(item) === index;
        });
}

export function validateCheckboxCellValue(cellValue, item) {
    const value = normalizeDropdownValue(cellValue);

    return value === normalizeDropdownValue(item.value1) || value === normalizeDropdownValue(item.value2);
}

export function validateDropdownCellValue(cellValue, item, list) {
    const normalizedList = list
        .map(normalizeDropdownValue)
        .filter(function(value) {
            return value.length > 0;
        });

    if (item.type2) {
        const selectedValues = normalizeDropdownValue(cellValue)
            .split(",")
            .map(function(value) {
                return value.trim();
            })
            .filter(function(value) {
                return value.length > 0;
            });

        if (selectedValues.length === 0) {
            return false;
        }

        return selectedValues
            .every(function(value) {
                return normalizedList.indexOf(value) !== -1;
            });
    }

    return normalizedList.indexOf(normalizeDropdownValue(cellValue)) !== -1;
}

export function normalizeDataVerificationModel(dataVerification) {
    if (dataVerification == null) {
        return null;
    }

    const normalized = {};

    Object.keys(dataVerification).forEach(function(key) {
        if (dataVerification[key] != null) {
            normalized[key] = dataVerification[key];
        }
    });

    return Object.keys(normalized).length > 0 ? normalized : null;
}

export function setDataVerificationFromSource(dataVerification, targetKey, sourceItem) {
    delete dataVerification[targetKey];

    if (sourceItem != null) {
        dataVerification[targetKey] = cloneDataVerificationItem(sourceItem);
    }
}
