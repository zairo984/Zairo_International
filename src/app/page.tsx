import Slider from '@/components/Slider';
import 'animate.css';
import Expertise from '@/components/Expertise';
import MessageSection from '@/components/MessageSection';

export default function Home() {

  return (
    <main>
      <section>
        <Slider />
        <MessageSection/>
        <Expertise/>
      </section>
        
    </main>
  );
}
