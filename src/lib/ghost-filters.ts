export function buildDateFilter(
  year?: number,
  month?: number
): string | undefined {
  if (!year) return undefined

  if (month) {
    const start = `${year}-${String(month).padStart(2, "0")}-01`
    const endYear = month === 12 ? year + 1 : year
    const endMonth = month === 12 ? 1 : month + 1
    const end = `${endYear}-${String(endMonth).padStart(2, "0")}-01`
    return `published_at:>='${start}'+published_at:<'${end}'`
  }

  return `published_at:>='${year}-01-01'+published_at:<'${year + 1}-01-01'`
}
