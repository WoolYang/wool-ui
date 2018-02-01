export function contains(elem: any, current: any) {
    if (elem.compareDocumentPosition) {
        return elem === current || !!(elem.compareDocumentPosition(current) & 16);
    }

    if (elem.contains && current.nodeType === 1) {
        return elem.contains(current) && elem !== current;
    }

    while (current = current.parentNode) {
        if (current === elem) {
            return true;
        }
    }
    return false;
};

export { default as DateUtils } from './dateUtils'