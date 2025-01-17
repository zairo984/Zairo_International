import Slider from '@/components/Slider';
import 'animate.css';
import Expertise from '@/components/Expertise';
import MessageSection from '@/components/MessageSection';
import Team from '@/components/Team';

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
      </section>
        
    </main>
  );
}
