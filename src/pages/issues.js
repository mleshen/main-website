import React from "react"
import Layout from "../components/layout"
import { graphql, Link } from "gatsby"
import Image from "../components/image"

export const query = graphql`
{
    issue_full_names: allMarkdownRemark {
        distinct(field: frontmatter___issue_full_name)
    },
    metadata: site {
        siteMetadata {
            mediaUrl
        }
    }
}
`
function convertToSlug(Text)
{
    return Text
        .toLowerCase()
        .replace(/ /g,'-')
        .replace(/[^\w-]+/g,'')
        ;
}

export default ({data}) => (
    <Layout>
        <div class="container">
            {/* TODO: Sort the list of issues here so they appear in chronological order */}
            {data.issue_full_names.distinct.map( (issue_full_name, i) => {
                if ((i + 1) % 4 === 0) {
                    return (
                            <div class="row">
                                <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3">
                                    <h2 class="subheader" style={{fontSize: "16px", padding: "0"}}>{issue_full_name}</h2>
                                    <figure>
                                        <Link to={"issue/"+convertToSlug(issue_full_name)} className="no-decoration">
                                            {/* <img class='img-responsive' style={{margin: "0 auto;"}} src={data.metadata.siteMetadata.mediaUrl+'covers/'+convertToSlug(issue_full_name)} alt=""/> */}
                                            <Image name={convertToSlug(issue_full_name)+".png"}/>
                                        </Link>
                                    </figure>
                                </div>
                            </div>)
                } else {
                    return (
                            <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3">
                                <h2 class="subheader" style={{fontSize: "16px", padding: "0"}}>{issue_full_name}</h2>
                                <figure>
                                    <Link to={"issue/"+convertToSlug(issue_full_name)} className="no-decoration">
                                        <img class='img-responsive' style={{margin: "0 auto;"}} src={data.metadata.siteMetadata.mediaUrl+'covers/'+convertToSlug(issue_full_name)} alt=""/>
                                    </Link>
                                </figure>
                            </div>
                        )              
                }
            })}
        </div>
    </Layout>
)