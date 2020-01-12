import React from "react"
import { Link } from "gatsby"


const AllProducts = (props) => {
  
  const { data, shop, lang }= props
  const env = process.env.NODE_ENV

  return (
    <div>    
        {/* Product list */}
        {data.map( ({node: product}) => {
          console.log(data)
          const srcImg = `https:${product.image.file.url}`
          const productSlug = product.name.trim().toLowerCase().replace('%','percent').replace(/\s/gm, '-')
          const productLink = env!== 'production' ? `/${shop}/${lang}/${productSlug}` : `/${lang}/${productSlug}`
          return (
            <div key={product.id}>
              <Link to={productLink} aria-label={product.name}>
                <img 
                src={srcImg} 
                alt={product.name} />
                <h3>{product.name}</h3>
                <p>Reference: {product.reference}</p>
              </Link>
            </div>
          )
        })}
    </div>
  )
}

export default AllProducts