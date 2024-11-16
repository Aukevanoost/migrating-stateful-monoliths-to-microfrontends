import { headers } from 'next/headers'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = await headers();
  const isComponentAPI = headersList.get('x-component-api') === 'true'

  if (isComponentAPI) {
    return <>{children}</>
  }

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}