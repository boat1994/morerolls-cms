import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ProjectGrid } from '@/components/projects/ProjectGrid'
import { Container } from '@/components/ui/Container'

import { Project } from '@/payload-types'
import { unstable_cache } from 'next/cache'

export const revalidate = 60; // ISR - revalidate every 60 seconds

const getAllProjects = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise })
    return await payload.find({
      collection: 'projects',
      sort: 'order',
    })
  },
  ['all-projects'],
  { revalidate: 60, tags: ['projects'] }
)

export default async function ProjectsPage() {
  const projects = await getAllProjects()

  return (
    <main className="bg-white min-h-screen pt-24 pb-20">
      <Container>
        <div className="mb-12 mt-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black uppercase tracking-tighter">
         Films
        </h1>
         <p className="text-lg text-black">Cinematic works by More Rolls</p>
        </div>
      </Container>
      <ProjectGrid projects={projects.docs as Project[]} />
    </main>
  )
}
