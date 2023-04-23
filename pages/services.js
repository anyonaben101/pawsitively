import Service from "@/components/Service";

function services({ services }) {

    return (<>
        <div style={{
            // linear gradient from #0073ff to #00c4ff
            backgroundImage: "linear-gradient(90deg, #0073ff 0%, #00c4ff 100%)",
        }}>

            <div className="container">
                <h1 className="py-4 text-light">Explore our services!</h1>
                {services.map((service) => (
                    <div key={service.id}>
                        <Service service={service} />
                    </div>
                ))}
            </div>
            <div className='py-5'></div>
            <div className='py-5'></div>
        </div>
    </>);
}

export async function getStaticProps() {
    const services = [
        {
            id: 1,
            title: "Dog walking",
            description: "We offer professional dog walking services for busy pet owners who want to ensure their furry friends get the exercise they need. Our experienced and reliable dog walkers will take your pup on regular walks around your neighborhood or local park, so you can have peace of mind knowing your dog is getting the attention and exercise they need."
        },
        {
            id: 2,
            title: "Pet sitting",
            description: "If you're planning a vacation or have to be away from home for an extended period, our pet sitting service can provide your furry friends with the care and attention they deserve. Our pet sitters are experienced and compassionate caregivers who will make sure your pets are fed, played with, and well-cared for while you're away."
        },
        {
            id: 3,
            title: "Grooming",
            description: "At our pet care center, we understand how important grooming is to the health and happiness of your pets. That's why we offer professional grooming services to keep your pets looking and feeling their best. From haircuts and baths to nail trims and ear cleaning, we'll make sure your pets are clean and comfortable."
        },
        {
            id: 4,
            title: "Boarding",
            description: "When you need to leave town, our pet boarding service provides a safe and comfortable environment for your pets to stay. We offer spacious accommodations, plenty of playtime, and personalized attention to ensure your pets are happy and healthy while you're away."
        },
        {
            id: 5,
            title: "Training",
            description: " If you're looking to teach your pet new skills or overcome behavioral issues, our professional training services can help. We offer a variety of training programs for dogs of all ages and breeds, including obedience training, potty training, and specialized training for therapy animals or service dogs."
        }
    ];

    return {
        props: {
            services,
        }
    }
}

export default services;