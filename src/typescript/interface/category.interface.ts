import type { AllCategoryResponseType } from "../type/category.type"

export interface CategoryInitialStateInterface{
  loading: boolean
  error: string | null
  page: number
  totals: number
  isEditCategoryId: string | null
  allCatagories: AllCategoryResponseType[]
}