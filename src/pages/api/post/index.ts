import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import prisma from '@/lib/prisma'

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
const createPost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { title, content } = req.body

  const session = await getSession({ req })
  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      // author: { connect: { email: session?.user?.email ?? undefined } },
      published: true,
    },
  })
  res.json(result)
}

export default createPost