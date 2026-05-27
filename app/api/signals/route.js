/**
 * app/api/signals/route.js
 *
 * WHY THIS FILE EXISTS NOW (even with no real backend):
 *
 * This is a Next.js Route Handler. When a client calls GET /api/signals,
 * this function runs on the SERVER — not in the browser.
 *
 * Having this stub here means:
 *   1. The URL /api/signals is already reserved for this purpose
 *   2. The response shape is documented as a contract
 *   3. Swapping static data for a real DB query is a one-line change
 *
 * CURRENT STATE: Returns static data (same as lib/data/signals.js)
 *
 * FUTURE STATE (when you add a database):
 *   import { db } from '@/lib/db'
 *   const signals = await db.signals.findMany({ orderBy: { createdAt: 'desc' }, take: 20 })
 *   return Response.json(signals)
 *
 * FUTURE STATE (when you add WebSockets for live signals):
 *   This REST endpoint becomes a "catch-up" endpoint — new clients
 *   fetch recent signals here, then subscribe to a WS stream for live ones.
 *
 * AUTHENTICATION FUTURE:
 *   import { getServerSession } from 'next-auth'
 *   const session = await getServerSession()
 *   if (!session) return new Response('Unauthorized', { status: 401 })
 */

import { SIGNALS_DATA } from '../../nexus/lib/data/signals'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')  // e.g. /api/signals?type=whale

  const signals = type
    ? SIGNALS_DATA.filter(s => s.type === type)
    : SIGNALS_DATA

  return NextResponse.json({
    signals,
    meta: {
      total: signals.length,
      timestamp: new Date().toISOString(),
      // Future: add pagination, cursor-based, etc.
    }
  })
}

// Future: POST to create a signal (admin/system use)
// export async function POST(request) {
//   const body = await request.json()
//   const signal = await db.signals.create({ data: body })
//   return NextResponse.json(signal, { status: 201 })
// }
