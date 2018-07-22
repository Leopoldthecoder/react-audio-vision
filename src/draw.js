export default function(param) {
  const { ctx, height, width, bars, barColor } = param
  return arr => {
    ctx.clearRect(0, 0, width, height)
    if (Array.isArray(barColor)) {
      const line = ctx.createLinearGradient(0, 0, 0, height)
      for (let i = 0, len = barColor.length; i < len; i++) {
        line.addColorStop(i / (len - 1), barColor[i])
      }
      ctx.fillStyle = line
    } else {
      ctx.fillStyle = barColor
    }
    const rectWidth = width / bars
    const barWidth = rectWidth * 0.5
    const capHeight = Math.min(barWidth, 10)
    for (let i = 0; i < bars; i++) {
      const rectHeight = arr[i] / 256 * height
      const o = arr[i] > 0
        ? Math.min(rectHeight + 40, height - capHeight)
        : 0
      ctx.fillRect(rectWidth * i, height - rectHeight, barWidth, rectHeight)
      ctx.fillRect(rectWidth * i, height - (o + capHeight), barWidth, capHeight)
    }
  }
}
