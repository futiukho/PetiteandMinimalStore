import React, {useEffect, useRef} from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import Breadcrumb from '../components/breadcrumb'
import Product from '../components/product'

const ProductTemplate = (props) => {

  const {
    pageContext: {
      language, 
      shipping,
      slug,
      categorySlug,
      categoryName,
      pageTitle
    }, data
  } = props

  const delayTimer = useRef(null)
  useEffect(() => {
    return window.clearInterval(delayTimer.current)
  })
  const handleOnClick = e => {
    if (e.target.hasAttribute('disabled')) {
      return e.preventDefault()
    }
    delayTimer.current = window.setInterval(() => {
      setStatus()
    }, 1000)
  }

  return (
    <Layout>
    <SEO title={pageTitle} />
      <div
        style={{
          margin: "0 auto",
          width: "100%",
          textAlign: "center",
        }}
      >
        <Breadcrumb
        shop={shipping.toLowerCase()}
        lang={language}
        uri={slug}
        categorySlug={categorySlug}
        categoryName={categoryName}
        productSlug={data.contentfulProduct.name}
        />
        {/* Product info */}
        <Product
        shop={shipping.toLowerCase()}
        lang={language}
        data={data.contentfulProduct}
        onClick={handleOnClick}
        />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query Product($productId: String, $language: String) {
    contentfulProduct(
      contentful_id: { eq: $productId }
      node_locale: { eq: $language }
      variants: { elemMatch: { node_locale: { eq: $language } } }
    ) {
      name
      image {
        file {
          url
        }
      }
      description {
        description
      }
      reference
      variants {
        size {
          name
        }
        name
        code
      }
    }
  }
`

export default ProductTemplate
