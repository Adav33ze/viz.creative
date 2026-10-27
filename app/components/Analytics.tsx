import Script from 'next/script'

export default function Analytics() {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? 'G-FFZM1273ED'
  if (!id || !/^G-[A-Z0-9]+$/.test(id)) return null

  return (
    <>
      <Script id="google-analytics-config" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${id}');
      `}</Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
    </>
  )
}
