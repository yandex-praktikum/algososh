export const randomArr = (): number[] => {
    const res: number[] | null = [];
    let arrLengthIndex = 0;
    while (arrLengthIndex < 3 || arrLengthIndex > 17) {
        arrLengthIndex = Math.ceil(Math.random() * 100)
    }
    for (let i = 0; i < arrLengthIndex + 1; i++) {
        res.push(Math.ceil(Math.random() * 100))
    }
    return res;
}