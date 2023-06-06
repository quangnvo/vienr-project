import { allVhattps } from 'contentlayer/generated'
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { breadcrums } from '@/components/breadcrums'
import { blogAvatar } from '@/components/blog/blog-avatar'
import { blogTitle } from '@/components/blog/blog-title'
import { blogDate } from '@/components/blog/blog-date'
import { blogTag } from '@/components/blog/blog-tag'
import { blogContent } from '@/components/blog/blog-content'

interface BlogProps {
    params: {
        slug: string[]
    }
}

// ---------- Get Blog from Params ----------
async function getBlogFromParams(params: BlogProps["params"]) {
    const slug = params?.slug?.join("/")
    const blog = allVhattps.find((item) => item.slugAsParams === slug)
    if (!blog) { null }
    return blog
}

// ---------- Generate Metadata ----------
export async function generateMetadata({ params }: BlogProps): Promise<Metadata> {
    const blog = await getBlogFromParams(params)
    if (!blog) { return {} }
    return {
        title: blog.title,
        description: blog.description,
    }
}

//  ---------- Generate staticparams ----------
export async function generateStaticParams(): Promise<BlogProps["params"][]> {
    return allVhattps.map((item) => ({
        slug: item.slugAsParams.split("/"),
    }))
}


export default async function BlogPage({ params }: BlogProps) {
    const blog = await getBlogFromParams(params)

    if (!blog) { notFound() }

    return (
        <section id='blogpage' className='container py-20'>

            {/* Breadcrums */}
            {breadcrums({
                block1: {
                    hrefName: "/fsms",
                    blockName: "FSMS"
                },
                block2: {
                    hrefName: "/fsms/vhattp",
                    blockName: "Văn hóa ATTP"
                }
            })}

            {/* Date, title, avatar, tags */}
            {blogDate(blog)}
            {blogTitle(blog)}
            {blogAvatar(blog)}
            {blogTag({
                blog: blog,
                isAppearedOnMobile: true
            })}

            <hr className="my-4" />

            {/* Content */}
            {blogContent(blog)}
        </section>
    )
}