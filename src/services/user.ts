import User, { UserDocument } from '../models/User'
import { NotFoundError } from '../helpers/apiError'

const findOrCreate = async (
  userEmail: string,
  given_name: string,
  family_name: string
) => {
  const user = await User.findOne({ emailId: userEmail })

  if (!user) {
    const newUser = new User({
      firstName: given_name,
      lastName: family_name,
      emailId: userEmail,
    })
    console.log('newUser', newUser)
    // const user={firstName:name,lastName:family_name,emailId:userEmail,shoes:[],order:[]}
    create(newUser)
    return newUser
  } else {
    console.log('olduser', user)
    return user
  }
}

const create = async (user: UserDocument): Promise<UserDocument> => {
  return user.save()
}

const findById = async (userId: string): Promise<UserDocument> => {
  const foundUser = await User.findById(userId)

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }

  return foundUser
}

const findAll = async (): Promise<UserDocument[]> => {
  return User.find().sort({ name: 1, publishedYear: -1 })
}

const update = async (
  userId: string,
  update: Partial<UserDocument>
): Promise<UserDocument | null> => {
  const foundUser = await User.findByIdAndUpdate(userId, update, {
    new: true,
  })

  if (!foundUser) {
    throw new NotFoundError(`Movie ${userId} not found`)
  }

  return foundUser
}

const deleteUser = async (userId: string): Promise<UserDocument | null> => {
  const foundUser = User.findByIdAndDelete(userId)

  if (!foundUser) {
    throw new NotFoundError(`Movie ${userId} not found`)
  }

  return foundUser
}

export default {
  create,
  findById,
  findAll,
  update,
  deleteUser,
  findOrCreate,
}
