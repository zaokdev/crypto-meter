import { StepBack } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Back() {
  return (
    <Link href="/"><StepBack></StepBack></Link>
  )
}
