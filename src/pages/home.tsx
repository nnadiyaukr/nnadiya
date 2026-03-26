import { Slider } from '@/components/slider';
import { About } from '@/components/about';
import { Directions } from '@/components/directions';
import { Principles } from '@/components/principles';
import { Invite } from '@/components/invite/invite';
import { Download } from '@/components/download';

const HomePage = () => (
    <>
        <Slider />
        <About />
        <Directions />
        <Principles />
        <Download />
        <Invite />
    </>
);

export default HomePage;
