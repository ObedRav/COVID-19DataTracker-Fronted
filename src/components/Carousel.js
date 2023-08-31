import { Carousel, IconButton, Select, Option, Button } from '@material-tailwind/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useStates } from '@/hooks/useDataFetching';
import { validateForm } from '@/utils/validations';
import FirstImage from '../../public/images/first-image.jpeg';
import SecondImage from '../../public/images/second-image.jpeg';
import ThirdImage from '../../public/images/third-image.jpeg';
import Image from 'next/image';

const minDate = '2020-01-13';
const maxDate = '2021-03-02';

const CarouselInicio = ({ className }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [errors, setErrors] = useState({});

  const router = useRouter();
  const states = useStates();
  // Include USA
  states['United States'] = 'United States';

  const SendInformation = async () => {
    const fieldNames = ['selectedState', 'selectedDate'];
    const errors = validateForm(selectedState, selectedDate, fieldNames);

    if (Object.keys(errors).length === 0) {
      setErrors({});

      router.push({
        pathname: '/records',
        query: {
          selectedState,
          selectedDate
        }
      });
    } else {
      setErrors(errors);
    }
  };

  return (
    <div className={`relative rounded-xl mx-20 ${className}`}>
      <Carousel
        className='rounded-xl hidden lg:flex'
        autoplay
        loop
        autoplayDelay={10000}
        prevArrow={({ handlePrev }) => (
          <IconButton
            variant='text'
            color='white'
            size='lg'
            onClick={handlePrev}
            className='!absolute top-2/4 left-4 -translate-y-2/4'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={2}
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18'
              />
            </svg>
          </IconButton>
        )}
        nextArrow={({ handleNext }) => (
          <IconButton
            variant='text'
            color='white'
            size='lg'
            onClick={handleNext}
            className='!absolute top-2/4 !right-4 -translate-y-2/4'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={2}
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3'
              />
            </svg>
          </IconButton>
        )}
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className='absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2'>
            {new Array(length).fill('').map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                  activeIndex === i ? 'w-8 bg-white' : 'w-4 bg-white/50'
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
      >
        <Image
          src={FirstImage}
          alt='image 1'
          className='h-full w-full object-cover opacity-50'
          priority
        />
        <Image
          src={SecondImage}
          alt='image 2'
          className='h-full w-full object-cover opacity-50'
          priority
        />
        <Image
          src={ThirdImage}
          alt='image 3'
          className='h-full w-full object-cover opacity-50'
          priority
        />
      </Carousel>
      {/* Form  lg > */}
      <div className='hidden lg:block lg:absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-md'>
        <div className='flex items-center justify-center mb-4'>
          <h1 className='text-3xl xl:text-4xl font-bold select-none capitalize text-center'>Explore COVID-19 Data</h1>
        </div>

        <p className='text-sm text-center mb-4 select-none'>
          Choose between viewing data for the entire United States or selecting a specific state and date.
        </p>

        <div className='mb-4'>
          <Select label='Select State' onChange={setSelectedState} error={errors.selectedState}>
            {Object.keys(states).map((state) => (
              <Option key={state} value={state}>
                {state}
              </Option>
            ))}
          </Select>
          {errors.selectedState && <p className='text-red-500'>{errors.selectedState}</p>}
        </div>

        <input
          type='date'
          min={minDate}
          max={maxDate}
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className={`border ${errors.selectedDate ? 'border-red-500' : 'border-gray-300'} px-3 py-2 rounded-md w-full`}
        />
        {errors.selectedDate && <p className='text-red-500'>{errors.selectedDate}</p>}

        <div className='flex items-center justify-center mt-4'>
          <Button variant='gradient' onClick={SendInformation}>Go</Button>
        </div>
      </div>

      {/** Form  */}
      <div className='relative lg:hidden bg-white p-8 rounded-lg shadow-md'>
        <div className='flex items-center justify-center mb-4'>
          <h1 className='text-2xl font-bold select-none capitalize text-center md:text-4xl'>Explore COVID-19 Data</h1>
        </div>

        <p className='text-sm text-center mb-4 select-none md:text-lg'>
          Choose between viewing data for the entire United States or selecting a specific state and date.
        </p>

        <div className='mb-4'>
          <Select label='Select State or US' onChange={setSelectedState} error={errors.selectedState}>
            {Object.keys(states).map((state) => (
              <Option key={state} value={state}>
                {state}
              </Option>
            ))}
          </Select>
          {errors.selectedState && <p className='text-red-500'>{errors.selectedState}</p>}
        </div>

        <input
          type='date'
          min={minDate}
          max={maxDate}
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className={`border ${errors.selectedDate ? 'border-red-500' : 'border-gray-300'} px-3 py-2 rounded-md w-full`}
        />
        {errors.selectedDate && <p className='text-red-500'>{errors.selectedDate}</p>}

        <div className='flex items-center justify-center mt-4'>
          <Button variant='gradient' onClick={SendInformation}>Go</Button>
        </div>

      </div>

    </div>
  );
};

export default CarouselInicio;
