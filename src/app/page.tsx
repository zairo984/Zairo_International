import Slider from '@/components/Slider';
import 'animate.css';
import Expertise from '@/components/Expertise';
import MessageSection from '@/components/MessageSection';
import Team from '@/components/Team';
import Projects from '../components/Projects';
import Blogs from '@/components/Blogs';
import Header from '@/components/Header';
import PageTransition from '@/components/page-transition';
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';

export default function Home() {

  return (
    <PageTransition>
    <main>
      <section>
        {/* <Header/> */}
        <Slider />
        <MessageSection/>
        <Expertise/>
        <section>
          <Team/>
        </section>
        <section>
          <Blogs/>
        </section>
        <section>
          <Projects/>
        </section>
        {/* <section>
          <Footer/>
        </section> */}
      </section>
    </main>
    </PageTransition>
  );
}
