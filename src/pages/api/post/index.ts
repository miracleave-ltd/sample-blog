import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
const createPost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { title, content } = req.body

  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      published: true,
    },
  })
  res.json(result)
}

export default createPost