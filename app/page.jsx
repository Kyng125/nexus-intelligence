import { redirect } from 'next/navigation'

/**
 * WHY REDIRECT FROM ROOT?
 * The Nexus page lives at /nexus. This keeps the door open for future
 * pages at /dashboard, /docs, /blog etc without any URL conflict.
 * For portfolio purposes, you might change this to render NexusPage
 * directly — but the redirect approach is correct for a multi-product app.
 */
export default function Home() {
  redirect('/nexus')
}
