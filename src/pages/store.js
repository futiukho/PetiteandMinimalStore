 
import React from 'react'
import {graphql, useStaticQuery } from 'gatsby'

import Layout from '../components/layout'

const Store = () => {

  const {
    allContentfulCountry: { edges }
  } = useStaticQuery(graphql`
    {
      allContentfulCountry(
        sort: { fields: name }
        filter: { node_locale: { eq: "en-US" } }
      ) {
        edges {
          node {
            name
            marketId
            defaultLocale
            code
          }
        }
      }
    }
  `)

  return (
    <Layout>
        <div className="store">
        <h1>Choose your region:</h1>
        {edges.map((country, index) => {
              const href = `/${country.node.code.toLowerCase()}/${country.node.defaultLocale.toLowerCase()}`
                
              return (
                <div key={index}  >
                    <a title={country.node.name} href={href}>
                       <h2 className="country"> {country.node.name} </h2>
                    </a>  
                </div>
              )
            })}
        </div>
    </Layout>
    )
}

// export const query = graphql `
//  {
//   allContentfulProduct {
//     edges {
//       node {
//         id
//         name
//         image {
//           fluid {
//             tracedSVG
//             sizes
//           }
//         }
//       }
//     }
//   }
// }
// `

export default Store