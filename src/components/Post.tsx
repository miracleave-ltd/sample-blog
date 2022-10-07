import React from "react"
import { Card, CardActionArea, CardContent, Typography } from "@mui/material"
import ReactMarkdown from "react-markdown"
import { useRouter } from "next/router"
import { NextPage } from "next"

export type PostProps = {
  id: string
  title: string
  content: string | null
  published: boolean
}

const Post:NextPage<{ post: PostProps }> = ({ post }) => {
  const router = useRouter()
  return (
    <Card variant="outlined">
      <CardActionArea onClick={() => router.push(`/p/${post.id}`)} >
        <CardContent  sx={{ p: 2 }}>
          <Typography  variant="h5" gutterBottom>
            {post.title}
          </Typography>
          <ReactMarkdown>{post.content!}</ReactMarkdown>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export { Post }
