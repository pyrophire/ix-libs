/**
 * Reads a property from a row. A key that exists on the row wins; otherwise a dotted
 * path such as `user.name` is walked one segment at a time.
 *
 * @param row - The row to read from
 * @param prop - Property name or dotted path
 * @returns The value found, or undefined when any segment is missing
 */
function readProperty(row: unknown, prop: string): unknown {
    if (row == null) {
        return undefined;
    }
    const record = row as Record<string, unknown>;
    if (prop in Object(record) || !prop.includes('.')) {
        return record[prop];
    }
    return prop.split('.').reduce<unknown>((value, key) => (value == null ? undefined : (value as Record<string, unknown>)[key]), record);
}

/**
 * Returns a sorted copy of the rows. Null and undefined values sort last in ascending order.
 *
 * @param rows - The rows to sort; not mutated
 * @param prop - The property (or dotted path) to sort by
 * @param direction - Sort direction; anything other than 'desc' sorts ascending
 * @returns A new, sorted array
 */
export function sortByProperty<Row>(rows: readonly Row[], prop: string, direction: string): Row[] {
    const factor = direction === 'desc' ? -1 : 1;
    return [...(rows ?? [])].sort((a, b) => {
        const left = readProperty(a, prop);
        const right = readProperty(b, prop);
        if (left == null || right == null) {
            return left == null && right == null ? 0 : (left == null ? 1 : -1) * factor;
        }
        if (typeof left === 'number' && typeof right === 'number') {
            return (left - right) * factor;
        }
        if (left instanceof Date && right instanceof Date) {
            return (left.getTime() - right.getTime()) * factor;
        }
        return String(left).localeCompare(String(right), undefined, { numeric: true }) * factor;
    });
}
