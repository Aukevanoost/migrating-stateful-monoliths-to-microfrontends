// app/api/component/route.tsx
import ServerComponent from '@/app/components/test.server'
import { renderToString } from 'react-dom/server';

export async function GET() {
  return new Response(
    renderToString(
      <ServerComponent />
    ),
    {
      headers: {
        'Content-Type': 'text/html',
        'x-component-api': 'true'
      },
    }
  )
}