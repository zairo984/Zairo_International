import Slider from '@/components/Slider';
import 'animate.css';
import Expertise from '@/components/Expertise';
import MessageSection from '@/components/MessageSection';
import Team from '@/components/Team';
import Projects from './Projects';
import Blogs from '@/components/Blogs';

export default function Home() {

  return (
    <main>
      <section>
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
        
      </section>
        
    </main>
  );
}
