import type { CategoriesType } from '../../../types/home'

type categoryPropsType = {
  categories: CategoriesType | undefined
}

const Category = (props: categoryPropsType) => {
  const { categories } = props

  return (
    <div className="category">
      {(categories || []).map((item) => {
        return (
          <div key={item.id} className="category-item">
            <img src={item.imgUrl} alt={item.name} />
            <p>{item.name}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Category
