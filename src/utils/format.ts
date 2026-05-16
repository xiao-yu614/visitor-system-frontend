export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const formatTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

export const formatDateTime = (date: Date | string): string => {
  return `${formatDate(date)} ${formatTime(date)}`
}

export const formatIdCard = (idCard: string): string => {
  if (idCard.length !== 18) return idCard
  return idCard.slice(0, 4) + '**********' + idCard.slice(-4)
}

export const formatPhone = (phone: string): string => {
  if (phone.length !== 11) return phone
  return phone.slice(0, 3) + '****' + phone.slice(-4)
}
