import { Slider } from '@/components/slider';
import { About } from '@/components/about';
import { Directions } from '@/components/directions';
import { Principles } from '@/components/principles';
import { Invite } from '@/components/invite/invite';

const HomePage = () => (
    <>
        <Slider />
        <About />
        <Directions />
        <Principles />
        <Invite />
    </>
)

export default HomePage;