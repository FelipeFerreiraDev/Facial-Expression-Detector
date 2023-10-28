interface ExpressionProps {
    neutral: number,
    happy: number,
    sad: number,
    angry: number,
    fearful: number,
    disgusted: number,
    surprised: number
}

export function formatedData(data: ExpressionProps[]) {
    return data.map((item) => {
        return {
            neutral: item.neutral.toFixed(5),
            happy: item.happy.toFixed(5),
            sad: item.sad.toFixed(5),
            angry: item.angry.toFixed(5),
            fearful: item.fearful.toFixed(5),
            disgusted: item.disgusted.toFixed(5),
            surprised: item.surprised.toFixed(5)
        }
    })
}