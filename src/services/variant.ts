import Variant, { VariantDocument } from '../models/Variant'

const create = async (variant: VariantDocument): Promise<VariantDocument> => {
  return variant.save()
}

const findAll = async (): Promise<VariantDocument[]> => {
  return Variant.find()
}

export default {
  create,
  findAll,
}
