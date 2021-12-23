import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'

let timeAgoDefaultLocaleAdded = false

if (!timeAgoDefaultLocaleAdded) {
  timeAgoDefaultLocaleAdded = true
  TimeAgo.setDefaultLocale(en.locale)
  TimeAgo.addLocale(en)
}

export const timeAgo = new TimeAgo('en-US')
