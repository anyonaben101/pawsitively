import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Team from '@/components/Team'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })


export default function Home() {
    const router = useRouter();

    const members = [
        {
            name: 'Gerardo Ormeno',
            role: 'Backend',
            imagePath: '/images/G.png'
        },
        {
            name: 'Max Fell',
            role: 'Backend',
            imagePath: '/images/M.png'
        },
        {
            name: 'Rose Black',
            role: 'Backend',
            imagePath: '/images/R.png'
        },
        {
            name: 'Adrian Bruno',
            role: 'Frontend',
            imagePath: '/images/A.png'
        },
        {
            name: 'Manuel Rodriquez',
            role: 'Frontend',
            imagePath: '/images/M.png'
        },
        {
            name: 'Zeus Cordeiro',
            role: 'Frontend',
            imagePath: '/images/Z.png'
        }
    ]

    return (
        <>
            <Head>
                <title>Pawsitively - Home</title>
                <meta name="description" content="Get personalized suggestions that your pets will love" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div style={{
                backgroundColor: "#000000",
            }}>
                <div className='container'>
                    <div className='py-5 text-center text-light'>
                        <p className='display-4 font-weight-bold'>Connecting You With The Best For Your Pets</p>
                        <p className='lead'>
                            As pet owners we are always on the lookout for right foods, toys, treats and more for our pets. We hope we can facilitate finding those items that your pet will love!
                        </p>
                        <button className='btn btn-primary btn-lg' onClick={() => router.push('/products')}>Shop Now</button>
                    </div>
                </div>
            </div>
            <div>
                <div className='container py-5'>
                    <div className='row align-items-center'>
                        <div className='col-md-6'>
                            <img src='/images/cat-eating.jpg' className='img-fluid' />
                        </div>
                        <div className='col-md-6'>
                            <h4 className='font-weight-bold'>Get personalized suggestions that your pets will love!</h4>
                            <p className='lead'>We wanted to create an easy to use platform that would give you a chance to find items that would best suit your pets needs.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{
                backgroundColor: "#000000",
            }} className='py-5'>
            </div>
            <div style={{
                // linear gradient from #0073ff to #00c4ff
                backgroundImage: "linear-gradient(90deg, #0073ff 0%, #00c4ff 100%)",
            }}>
                <div className='container'>
                    <div className='row align-items-center'>
                        <div className='col-md-6'>
                            <img src='/images/cat-w-toy.avif' className='img-fluid rounded-sm mt-n3' />
                        </div>
                        <div className='col-md-6 text-light'>
                            <h4 className='font-weight-bold'>Find your pets new favorite food, toys, treats and more!</h4>
                            <p className='lead'>Create a complete profile for your furry friend, including their breed, age, and dietary needs. Then, browse our top recommended products for your pet's specific needs, from food and toys to grooming supplies and health supplements.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{
                backgroundImage: "linear-gradient(90deg, #0073ff 0%, #00c4ff 100%)",
            }} className='py-5'>
            </div>
            <div>
                <div className='container py-4'>
                    <Team members={members} />
                </div>
            </div>
            <div className='py-5'></div>
            <div className='py-5'></div>
        </>
    )
}
