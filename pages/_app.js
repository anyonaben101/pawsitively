import Layout from '@/components/Layout'
import 'toastr/build/toastr.min.css'

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
