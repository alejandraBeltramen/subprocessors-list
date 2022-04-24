// Default browsers font-size: 16px
const htmlFontSize = 16;

export function pxToRem(size) {
    if (typeof size === 'string') {
        return size.split(' ').map(token => pxToRem(Number(token.replace('px', '')))).join(' ');
    }

    return `${(size / htmlFontSize)}rem`;
}