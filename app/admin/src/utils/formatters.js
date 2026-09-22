export function formatNumber(value) {
  return new Intl.NumberFormat('en-IN').format(value)
}

export function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}

export function sentenceCase(value = '') {
  return value
    .toString()
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/(^\w|\s\w)/g, (match) => match.toUpperCase())
}
