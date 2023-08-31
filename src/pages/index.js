import Carousel from '@/components/Carousel';
import HorizontalCard from '@/components/HorizontalGeneralCard';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import { Button } from '@material-tailwind/react';
import { useEffect, useRef, useState } from 'react';
import { createChart } from '@/utils/charts';
import { useUsData, useTopsUsData, useTopsStatesData } from '@/hooks/useDataFetching';
import { motion, AnimatePresence } from 'framer-motion';
import TransitionEffect from '@/components/TransitionEffect';
import usa1 from '../../public/images/usa1.webp';
import usa2 from '../../public/images/usa2.jpeg';
import usa3 from '../../public/images/usa3.webp';
import state1 from '../../public/images/california1.webp';
import state2 from '../../public/images/california2.jpeg';
import state3 from '../../public/images/california3.jpeg';

function TypingAnimation({ text, delay }) {
  const characters = text.split('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, delay);

    return () => clearTimeout(timeout);
  }, [currentIndex]);

  return (
    <div>
      {characters.slice(0, currentIndex).map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
}


export default function Home () {
  const router = useRouter();
  const [dates, totalCasesData, totalDeathsData, totalHospitalizeCurrently, totalTestingData] = useUsData();
  const topsUS = useTopsUsData();
  const topsStates = useTopsStatesData();

  // Ref to the charts
  const canvasRef1 = useRef();
  const canvasRef2 = useRef();

  // List of images for rotation
  const stateImages = {
    'United States': [usa1, usa2, usa3],
    California: [state1, state2, state3]
  };

  useEffect(() => {
    const datasets1 = [
      {
        label: 'Total Cases',
        data: totalCasesData,
        backgroundColor: 'rgba(54, 162, 235, 0.4)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      },
      {
        label: 'Total Testing',
        data: totalTestingData,
        backgroundColor: 'rgba(120, 99, 132, 0.4)',
        borderColor: 'rgba(120, 99, 132, 1)',
        borderWidth: 1
      }
    ];

    const datasets2 = [
      {
        label: 'Total Deaths',
        data: totalDeathsData,
        backgroundColor: 'rgba(54, 162, 235, 0.4)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      },
      {
        label: 'Hospitalized Currently',
        data: totalHospitalizeCurrently,
        backgroundColor: 'rgba(120, 99, 132, 0.4)',
        borderColor: 'rgba(120, 99, 132, 1)',
        borderWidth: 1
      }
    ];
    createChart('linear', canvasRef1.current, 'bar', dates, datasets1, 'COVID-19 Cases Over Time', 20);
    createChart('linear', canvasRef2.current, 'line', dates, datasets2, 'COVID-19 Deaths Over Time', 20);
  }, [dates, totalCasesData, totalTestingData, totalDeathsData, totalHospitalizeCurrently]);

  return (
    <>
      <TransitionEffect />

      <Carousel className='my-4' />
      <Layout>
        {/** Historical Records for the US */}
        <div className='grid w-full grid-cols-8 gap-16 mb-12 mt-12 md:mt-24 lg:mt-36 sm:gap-8'>
          <div className='col-span-4 flex flex-col items-start justify-center xl:col-span-4 sm:order-2 sm:col-span-8'>
          <div className='text-2xl font-bold mb-6 md:text-4xl lg:text-5xl'>
            <AnimatePresence mode='wait'>
              <TypingAnimation text="Historical Records for the United States" delay={20} />
            </AnimatePresence>
          </div>
          <div className='mb-6'>
            <AnimatePresence mode='wait'>
              <TypingAnimation text="Explore COVID-19 data for different dates." delay={20} />
            </AnimatePresence>
          </div>
            <Button
              variant='gradient' onClick={() => {
                router.push({
                  pathname: '/records',
                  query: {
                    selectedState: 'United States'
                  }
                });
              }}
            >Select Date
            </Button>
          </div>

          <div className='col-span-4 flex flex-col items-end justify-between xl:col-span-4 sm:order-2 sm:col-span-8'>
            {topsUS.map((record, index) => {
              const stateName = 'United States'; // Modify this based on your data
              const images = stateImages[stateName];
              const imageIndex = index % images.length; // Calculate index for image rotation
              const imageSrc = images[imageIndex];

              return (
                <HorizontalCard
                  Date={record.date}
                  TotalCases={record.total_cases}
                  TotalDeaths={record.total_deaths}
                  TotalTesting={record.total_testing}
                  Text='United States'
                  Img={imageSrc}
                  key={index}
                />
              );
            })}
          </div>
        </div>

        {/** Historical Records for states */}
        <div className='grid w-full grid-cols-8 gap-16 mb-28 mt-12 md:mt-24 lg:mt-36 sm:gap-8'>
          <div className='col-span-4 flex flex-col items-start justify-center xl:col-span-4 sm:order-2 sm:col-span-8'>
            <div className='text-2xl font-bold mb-6 md:text-4xl lg:text-5xl'>
              <AnimatePresence mode='wait'>
                <TypingAnimation text="Historical Records for a Specific State" delay={35} />
              </AnimatePresence>
            </div>
            <div className='mb-6'>
              <AnimatePresence mode='wait'>
                <TypingAnimation text="Explore COVID-19 data for different dates." delay={35} />
              </AnimatePresence>
            </div>
            <Button
              variant='gradient' onClick={() => {
                router.push({
                  pathname: '/records'
                });
              }}
            >Select Date
            </Button>
          </div>

          <div className='col-span-4 flex flex-col items-end justify-between xl:col-span-4 sm:order-2 sm:col-span-8'>
            {topsStates.map((state, index) => {
              const stateName = 'California'; // Modify this based on your data
              const images = stateImages[stateName];
              const imageIndex = index % images.length; // Calculate index for image rotation
              const imageSrc = images[imageIndex];

              return (
                <HorizontalCard
                  Date={state.date}
                  TotalCases={state.total_cases}
                  TotalDeaths={state.total_deaths}
                  TotalTesting={state.total_testing}
                  Text={state.stateName}
                  Img={imageSrc} // Pass the image source
                  key={index}
                />
              );
            })}
          </div>
        </div>

        <div className='w-full my-12'>
          <h1 className='text-3xl text-center font-semibold md:text-5xl'>COVID-19 Data Visualization</h1>
          <p className='text-center my-6'>Visualize COVID-19 data from the United States.</p>

          {/** Graphs */}
          <canvas className='rounded-lg border my-12' ref={canvasRef1} />
          <canvas className='rounded-lg border my-12' ref={canvasRef2} />
        </div>

        <p className='capitalize text-center font-semibold text-gray-500'>Stay informed and stay safe. Follow official guidelines and take necessary precautions to combat COVID-19.</p>

      </Layout>
    </>
  );
}
