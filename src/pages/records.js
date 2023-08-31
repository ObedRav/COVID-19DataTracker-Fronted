import { Select, Option, Button } from '@material-tailwind/react';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useStates } from '@/hooks/useDataFetching';
import { fetchApiData } from '@/utils/api';
import { createChart1 } from '@/utils/charts';
import { validateForm } from '@/utils/validations';
import TransitionEffect from '@/components/TransitionEffect';
import Layout from '@/components/Layout';
import HorizontalSpecificCard from '@/components/HorizontalSpecificCard';

const minDate = '2020-01-13';
const maxDate = '2021-03-02';

const Records = () => {
  const router = useRouter();
  const states = useStates();
  // Include USA
  states['United States'] = 'United States';

  const { selectedState: querySelectedState, selectedDate: querySelectedDate } = router.query;
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [Information, setInformation] = useState({});
  const [errors, setErrors] = useState({});

  const canvasRef = useRef(null);


  useEffect(() => {
    if (querySelectedState && querySelectedDate) {
      setSelectedState(querySelectedState);
      setSelectedDate(querySelectedDate);
    }
  }, [querySelectedState, querySelectedDate]);

  async function fetchData () {
    const fieldNames = ['selectedState', 'selectedDate'];
    const errors = validateForm(selectedState, selectedDate, fieldNames);

    if (Object.keys(errors).length === 0) {
      try {
        let url;
        if (selectedState === 'United States') {
          url = `us/daily/${selectedDate}`;
        } else {
          const stateCode = states[selectedState];
          url = `states/${stateCode}/${selectedDate}`;
        }

        const data = await fetchApiData(url);
        setInformation(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      setErrors(errors);
    }
  }

  useEffect(() => {
    createChart1(canvasRef, Information, 600);
    setErrors({});
  }, [Information]);

  return (
    <>
      <TransitionEffect />

      <Layout>
        {/** Form  */}
        <div className='relative bg-white py-12 px-4 my-8 mx-2 lg:px-36 lg:mx-12 rounded-lg shadow-md'>
          <div className='flex items-center justify-center mb-4'>
            <h1 className='text-2xl font-bold select-none capitalize text-center md:text-4xl'>Explore COVID-19 Data</h1>
          </div>

          <h3 className='text-xl text-center font-bold mb-6'>Select Date and State or US</h3>

          <div className='mb-4 px-12'>
            <Select label='Select State or US' onChange={setSelectedState} error={errors.selectedState}>
              {Object.keys(states).map((state) => (
                <Option key={state} value={state}>
                  {state}
                </Option>
              ))}
            </Select>
            {errors.selectedState && <p className='text-red-500'>{errors.selectedState}</p>}
          </div>

          <div className='mb-4 px-12'>
            <input
              type='date'
              min={minDate}
              max={maxDate}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className={`border ${errors.selectedDate ? 'border-red-500' : 'border-gray-300'} px-3 py-2 rounded-md w-full`}
            />
            {errors.selectedDate && <p className='text-red-500'>{errors.selectedDate}</p>}
          </div>

          <div className='flex items-center justify-center mt-4'>
            <Button variant='gradient' onClick={fetchData}>Search</Button>
          </div>

        </div>

        {/** Conditionally render when Information.total_cases is truthy  */}
        {Information.total_cases && (
          <>
            {/** Historical Records */}
            <div className='grid w-full grid-cols-8 gap-16 mb-28 mt-12 md:mt-24 lg:mt-36 sm:gap-8'>
              <div className='col-span-4 flex flex-col items-start justify-center xl:col-span-4 sm:order-2 sm:col-span-8'>
                <p className='text-2xl font-bold mb-6 md:text-4xl lg:text-5xl'>Information</p>
                <p className='mb-6 capitalize'>COVID-19 Statistics for {Information?.stateName ?? 'The United States'} in the selected Date</p>
              </div>

              <div className='col-span-4 flex flex-col items-end justify-between xl:col-span-4 sm:order-2 sm:col-span-8'>
                <HorizontalSpecificCard Text='Total Cases' Number={Information.total_cases} />
                <HorizontalSpecificCard Text='Total Testing' Number={Information.total_testing} />
                <HorizontalSpecificCard Text='Hospitalized Currently' Number={Information.hospitalized_currently} />
                <HorizontalSpecificCard Text='In Icu Currently' Number={Information.in_icu_currently} />
                <HorizontalSpecificCard Text='On Ventilator Currently' Number={Information.on_ventilator_currently} />
                <HorizontalSpecificCard Text='Total Deaths' Number={Information.total_deaths} />
              </div>
            </div>

            <div className='flex items-center justify-center rounded-lg border my-12'>
              {/* Bar Graph */}
              <canvas id='12BarChart' className='rounded-lg border my-12' ref={canvasRef} />
            </div>
          </>
        )}

        <p className='capitalize text-center font-semibold text-gray-500'>Last Updated: September 30, 2021</p>

      </Layout>
    </>
  );
};

export default Records;
