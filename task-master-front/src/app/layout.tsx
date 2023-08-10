export const metadata = {
  title: 'Task Master',
  description: 'Brian Varela Gómez',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
