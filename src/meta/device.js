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

const FlexAlignment = {
    start: "start",
    center: "center",
    end: "end"
}

export const FlexDirection = {
    row: "row",
    column: "column"
}

export default FlexDirection;

export default FlexAlignment;

export default Device;
