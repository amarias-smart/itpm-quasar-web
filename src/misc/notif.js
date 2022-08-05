import { Notify } from 'quasar'

const position = 'bottom-left'
const timeout = 4000

const notifications = (message, caption) => {
  const positive = () => Notify.create({
    message,
    caption,
    type: 'positive',
    position,
    timeout
  })

  const negative = () => Notify.create({
    message,
    caption,
    type: 'negative',
    position,
    timeout
  })

  const warning = () => Notify.create({
    message,
    caption,
    type: 'warning',
    position,
    timeout
  })

  const info = () => Notify.create({
    message,
    caption,
    type: 'info',
    position,
    timeout
  })

  const ongoing = () => Notify.create({
    message,
    caption,
    type: 'ongoing',
    position,
    timeout
  })

  return {
    positive,
    negative,
    warning,
    info,
    ongoing
  }
}

export { notifications }
