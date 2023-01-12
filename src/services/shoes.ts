import Shoes, { ShoesDocument } from '../models/Shoes'
import { NotFoundError } from '../helpers/apiError'
import { UserDocument } from '../models/User'

const create = async (shoes: ShoesDocument): Promise<ShoesDocument> => {
  return shoes.save()
}

const findById = async (shoesId: string): Promise<ShoesDocument> => {
  const foundShoes = await Shoes.findById(shoesId)

  if (!foundShoes) {
    throw new NotFoundError(`shoe ${shoesId} not found`)
  }

  return foundShoes
}

const findAll = async (): Promise<ShoesDocument[]> => {
  return Shoes.find()
}

const findByCategory = async (category: string): Promise<ShoesDocument[]> => {
  const foundCategory = await Shoes.find({ category: category })

  if (!foundCategory) {
    throw new NotFoundError(`category ${category} not found`)
  }

  return foundCategory
}

const update = async (
  shoesId: string,
  update: Partial<ShoesDocument>
): Promise<ShoesDocument | null> => {
  const foundShoes = await Shoes.findByIdAndUpdate(shoesId, update, {
    new: true,
  })

  if (!foundShoes) {
    throw new NotFoundError(`Movie ${shoesId} not found`)
  }

  return foundShoes
}

const deleteShoes = async (shoesId: string): Promise<ShoesDocument | null> => {
  const foundShoes = Shoes.findByIdAndDelete(shoesId)

  if (!foundShoes) {
    throw new NotFoundError(`Movie ${shoesId} not found`)
  }

  return foundShoes
}

const addUserToShoe = async (shoesId: string, userId: string) => {
  const userToShoes = Shoes.findByIdAndUpdate(
    { _id: shoesId },
    { $push: { user: userId } },
    { new: true, useFindAndModify: false }
  )

  if (!userToShoes) {
    throw new NotFoundError(`Shoe id ${shoesId} not found`)
  }
  console.log('in service')
  return userToShoes
}

export default {
  create,
  findById,
  findAll,
  update,
  deleteShoes,
  findByCategory,
  addUserToShoe,
}
