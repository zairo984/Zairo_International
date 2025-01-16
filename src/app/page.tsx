import Slider from '@/components/Slider';
import 'animate.css';
import WOW from 'wowjs';

import MessageSection from '@/components/MessageSection';

export default function Home() {

  return (
    <main>
      <section>
        <Slider />
        <MessageSection/>
      </section>
        
    </main>
  );
}
