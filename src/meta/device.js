const Device = {
    S: "small",
    M: "medium",
    L: "large",
    XL: "extraLarge"
}

export const getMinWidthPx = (device) => {
    switch (device) {
        case Device.S:
            return 0;
        case Device.M:
            return 601;
        case Device.L:
            return 993;
        case Device.XL:
            return 1201;
    }
}

export const getMinWidthMedia = (device) => {
    return `min-width: ${getMinWidthPx(device)}px`;
}

export default Device;
