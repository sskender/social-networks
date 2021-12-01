const User = require('../models/user')

const getUserFromProfile = async (profile) => {
  const currentUser = await User.findOne({ id: profile.id })
  if (!currentUser) {
    const newUser = await new User({
      id: profile.id,
      provider: profile.provider,
      username: profile.username,
      display_name: profile.displayName
    }).save()
    return newUser
  }
  return currentUser
}

module.exports = { getUserFromProfile }
