import User, { UserDocument } from '../models/User'
import { NotFoundError } from '../helpers/apiError'
import { ShoesDocument } from '../models/Shoes'

// eslint-disable-next-line
const findOrCreate = async (
  userEmail: string,
  given_name: string,
  family_name: string
) => {
  const user = await User.findOne({ emailId: userEmail })
  // eslint-disable-next-line
  if (!user) {
    const newUser = new User({
      firstName: given_name,
      lastName: family_name,
      emailId: userEmail,
    })
    // const user={firstName:name,lastName:family_name,emailId:userEmail,shoes:[],order:[]}
    const created = await create(newUser)
    return created
  } else {
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
    throw new NotFoundError(`User ${userId} not found`)
  }

  return foundUser
}

const addShoeToUser = async (userId: string, shoesId: string) => {
  const shoesToUser = User.findByIdAndUpdate(
    { _id: userId },
    { $push: { shoes: shoesId } },
    { new: true, useFindAndModify: false }
  )

  if (!shoesToUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }

  return shoesToUser
}

export default {
  create,
  findById,
  findAll,
  update,
  deleteUser,
  findOrCreate,
  addShoeToUser,
}
