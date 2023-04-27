import 'leaflet/dist/leaflet.css';
import './globals.css'

export const metadata = {
  title: 'Climate App',
  description: 'Work sample for riskthinking.ai',
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
