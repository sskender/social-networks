const mongoose = require('mongoose')
const { Schema } = mongoose

const eventSchema = new Schema({
  type: String,
  id: Number,
  datetime_utc: String,
  venue: mongoose.Mixed,
  datetime_tbd: Boolean,
  performers: mongoose.Mixed,
  is_open: Boolean,
  links: mongoose.Mixed,
  datetime_local: String,
  time_tbd: Boolean,
  short_title: String,
  visible_until_utc: String,
  stats: mongoose.Mixed,
  taxonomies: mongoose.Mixed,
  url: String,
  score: Number,
  announce_date: String,
  created_at: String,
  date_tbd: Boolean,
  title: String,
  popularity: Number,
  description: String,
  status: String,
  access_method: mongoose.Mixed,
  event_promotion: mongoose.Mixed,
  announcements: mongoose.Mixed,
  conditional: Boolean,
  enddatetime_utc: mongoose.Mixed,
  last_full_index_at: String,
  themes: mongoose.Mixed,
  domain_information: mongoose.Mixed
})

const Event = mongoose.model('Event', eventSchema)

module.exports = Event
