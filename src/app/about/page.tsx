import Image from "next/image";
import about from "../../images/about.jpg";
// import ceo from "../../images/ceo.webp";
import about1 from "../../images/about1.jpg";
import about2 from "../../images/about2.jpg";

const About = () => {
  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <div className="w-full h-[20rem] relative">
        <Image
          src={about || "/placeholder.svg"}
          alt="About Zairo International"
          className="h-full w-full object-cover opacity-85"
          priority
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-40 py-16">
        <h1 className="text-3xl md:text-4xl text-black font-medium mb-8">
          We are Zairoites
        </h1>
        
        {/* Company Description */}
        <div className="space-y-6 text-gray-600">
          <p className="text-sm md:text-base">
            Zairo International has been existing since quite some
            time and has come out as a successful online venture. We
            were able to make the most out of small opportunities we
            got and grew big by overcoming challenges and adversity
            of different business lines. We have now established a
            successful chain of suppliers, customers, clients and
            experts. We are proud to disclose that Vacation Saga
            runs as a successful property rental business. It has
            helped people to get some of the most outstanding rental
            properties in the foreign countries of the world.
            Additionally, we have Tech tunes for web development and
            digital marketing ventures. We provide the best of
            online marketing and web development under the same
            brand. Our services do not end here itself. We also have
            shopobar as a successful E-Commerce venture that can
            bring you some amazing stuff to buy. Our brand named
            cordscraft is there to deliver you the best leather
            based products online and travelobar is an upcoming
            project that we will soon disclose.
          </p>
          <p className="text-sm md:text-base">
            We are accessible round clock through our website and
            help desk services. We believe in absolute
            professionalism and increased efficiency. Our work
            excellence can be seen in the form of our business
            ventures. Each of our pursuits has been successful
            enough to create a wide range of clients and customers.
          </p>
          <p className="text-sm md:text-base">
            We constantly receive opportunities to expand our brands
            and customers from different parts of the world. We
            believe in delivering the best products and services
            that happen to create a difference.
          </p>
          <p className="text-sm md:text-base">
            Zairo International is always open for communication and
            feedbacks. We allow customers to get in direct touch
            with us through our websites. We entertain reservations
            and appointments through simple procedures. Our future
            ventures are still in pipeline and expected to become a
            part of our current operations soon.
          </p>
          <p className="text-sm md:text-base">
            We believe in giving a practical shape to business ideas
            and creating a mark in the world. Our involvement in a
            multitude of business projects clearly shows our
            diligence and efficiency. Our continuous growth and
            ability to meet different challenges has given us
            constant sales boost in each of our ventures. We know no
            bounds when it comes to satisfying our customers and
            giving them exactly what they need. No matter whether it
            is about the best digital marketing services or giving
            fully furnished rental Apartments at unbeatable prices,
            we Excel equally in all the given fields.
          </p>
          <p className="text-sm md:text-base">
            Our motive is not only to make profit but also to create
            a connection with the Global audience. We understand
            that having a physical store comes with a lot of
            limitations. That is why we have online ventures that
            remain approachable 24x7.
          </p>
          <p className="text-sm md:text-base">
            Zairo International aims at solving customer
            requirements and problems in the minimum possible time
            period. We provide the best information and also guide
            people through video based messages. We have an aim to
            Cater worldwide audiences through our multiple online
            Ventures. Our online presence not only gives profit to
            us but also benefits the ones who get in touch with us.
            We serve people across the countries and never create
            boundation because of a geographical physical location.
          </p>
        </div>

        {/* Mission and Industries Section */}
        <div className="mt-16">
          <div className="space-y-12">
            {/* First Grid Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="order-2 md:order-1">
                <Image
                  src={about1}
                  alt="Our Mission"
                  className="rounded-lg shadow-md w-full h-auto object-cover"
                />
              </div>
              <div className="order-1 md:order-2 space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                  OUR MISSION
                </h2>
                <p className="text-gray-600 text-sm md:text-base tracking-wide leading-relaxed">
                  Zairo International has been a continuously
                  growing company and it has a mission to
                  boost further. We aim to refurbish our
                  research and development to bring more
                  economies to our endeavors. We target to
                  become the leading online solution for
                  Digital Marketing property rent in online
                  shopping and Leather goods. Our goal is to
                  deliver 100% customer satisfaction along
                  with guiding them to have the best from us.
                  We also aim to educate yourself even better
                  to understand the customer requirements.
                </p>

                <h3 className="text-2xl font-semibold text-gray-800 pt-4">
                  Industries we serve
                </h3>
                <ul className="space-y-4 text-gray-600 text-sm md:text-base">
                  <li>
                    <strong className="font-medium text-gray-800">
                      Travel
                    </strong>
                    <p className="mt-1">
                      We have a good experience in the
                      travelling domain. Vacation saga
                      generates revenue through online
                      bookings and organic traffic.
                    </p>
                  </li>
                  <li>
                    <strong className="font-medium text-gray-800">
                      Digital Marketing
                    </strong>
                    <p className="mt-1">
                      We provide web development, SEO,
                      content writing, and all types of
                      digital marketing services.
                    </p>
                  </li>
                  <li>
                    <strong className="font-medium text-gray-800">
                      E-commerce
                    </strong>
                    <p className="mt-1">
                      Shopobar from Zairo International
                      provides product listing and pages
                      for online sales.
                    </p>
                  </li>
                  <li>
                    <strong className="font-medium text-gray-800">
                      Leather
                    </strong>
                    <p className="mt-1">
                      Our unique handcrafted leather
                      products can be purchased from Cords
                      Craft online shop.
                    </p>
                  </li>
                  <li>
                    <strong className="font-medium text-gray-800">
                      Technology
                    </strong>
                    <p className="mt-1">
                      Zairo International provides
                      technical solutions through BPO
                      services online.
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            {/* Second Grid Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                  OUR VISION
                </h2>
                <div className="text-gray-600 text-sm md:text-base space-y-4">
                  <p className="tracking-wide leading-relaxed">
                    Zairo International aims to be the leader of the world by managing multiple ventures under one group. We have laid the foundation of higher standards and follow it stronger than ever. Our pillars of professionalism and truthfulness have given as much success in a very short time period. Our vision is to become the agency that offers the best digital marketing Solution, rental properties, leather products and online shopping items at reasonable possible prices. We have a common set of values for each of our ventures and that is how we pursue business. We believe in prompt Service Delivery and execute tasks as team work.
                  </p>
                  <p className="tracking-wide leading-relaxed">
                    We are ready to take risk and exercise decision making. Our farsightedness gives us correct direction and proper growth. We believe in continuous growth and to supply our clients with best services in every aspect.
                  </p>
                </div>
              </div>
              <div>
                <Image
                  src={about2 || "/placeholder.svg"}
                  alt="Our Vision"
                  className="rounded-lg shadow-md w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Third Grid Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <Image
                  src={about2}
                  alt="Our Goals"
                  className="rounded-lg shadow-md w-full h-auto object-cover"
                />
              </div>
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                  OUR GOALS
                </h2>
                <ul className="text-gray-600 text-sm md:text-base space-y-2 list-disc pl-5">
                  <li>To keep cost of operations low and sustainable</li>
                  <li>To expand the existing business and open new ventures</li>
                  <li>To improve in the existing business fields</li>
                  <li>To improve research and development</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;