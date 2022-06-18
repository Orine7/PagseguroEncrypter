import type { NextApiRequest, NextApiResponse } from 'next'
import useSWR from 'swr'

type Data = {
  success: boolean
  challenge_ts: string
  hostname: string
  score: number
  action: string
  errors: any[]
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { data, error } = useSWR(`/api/recaptcha`, fetcher)

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  }
}
