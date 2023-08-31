import { Select, Option, Button, Spinner } from '@material-tailwind/react';
import React, { useState, useEffect, useRef } from 'react';
import Layout from '@/components/Layout';
import { useStates } from '@/hooks/useDataFetching';
import { createChart2 } from '@/utils/charts';
import { fetchApiData } from '@/utils/api';
import { validateForm } from '@/utils/validations';

const states = () => {
  const [selectedState, setSelectedState] = useState('');
  const [shouldRenderChart, setShouldRenderChart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dates, setDates] = useState([]);
  const [totalCasesData, setTotalCasesData] = useState([]);
  const [totalDeathsData, setTotalDeathsData] = useState([]);
  const [totalHospitalizeCurrently, setTotalHospitalizeCurrently] = useState([]);
  const [totalTestingData, setTotalTestingData] = useState([]);
  const [inIcuCurrentlyData, setInIcuCurrentlyData] = useState([]);
  const [onVentilatorCurrentlyData, setOnVentilatorCurrentlyData] = useState([]);
  const [errors, setErrors] = useState({});

  const canvasRef1 = useRef();
  const canvasRef2 = useRef();
  const canvasRef3 = useRef();
  const states = useStates();

  const handleSearch = async () => {
    const fieldNames = ['selectedState'];
    const errors = validateForm(selectedState, null, fieldNames);

    if (Object.keys(errors).length === 0) {
      setErrors({});
      setShouldRenderChart(false);
      setLoading(true);

      try {
        const stateCode = states[selectedState];
        const data = await fetchApiData(`states/${stateCode}/daily`);

        if (data) {
          const dates = data.map((entry) => entry.date);
          const totalCasesData = data.map((entry) => entry.total_cases);
          const totalDeathsData = data.map((entry) => entry.total_deaths);
          const totalHospitalizeCurrently = data.map((entry) => entry.hospitalized_currently);
          const totalTestingData = data.map((entry) => entry.total_testing);
          const inIcuCurrentlyData = data.map((entry) => entry.in_icu_currently);
          const onVentilatorCurrentlyData = data.map((entry) => entry.on_ventilator_currently);

          setDates(dates.reverse());
          setTotalCasesData(totalCasesData.reverse());
          setTotalDeathsData(totalDeathsData.reverse());
          setTotalHospitalizeCurrently(totalHospitalizeCurrently.reverse());
          setTotalTestingData(totalTestingData.reverse());
          setInIcuCurrentlyData(inIcuCurrentlyData.reverse());
          setOnVentilatorCurrentlyData(onVentilatorCurrentlyData.reverse());

          setShouldRenderChart(true);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching State data:', error);
      }
    } else {
      setErrors(errors);
    }
  };

  useEffect(() => {
    if (shouldRenderChart) {
      createChart2(
        canvasRef1,
        canvasRef2,
        canvasRef3,
        dates,
        totalCasesData,
        totalTestingData,
        totalDeathsData,
        totalHospitalizeCurrently,
        inIcuCurrentlyData,
        onVentilatorCurrentlyData,
        6
      );
    }
  }, [shouldRenderChart]);

  return (
    <>
      <Layout>
        {/** Form  */}
        <div className='relative bg-white py-12 px-4 my-8 mx-2 lg:px-36 lg:mx-12 rounded-lg shadow-md'>
          <div className='flex items-center justify-center mb-4'>
            <h1 className='text-2xl font-bold select-none capitalize text-center md:text-4xl'>Explore COVID-19 Data</h1>
          </div>

          <h3 className='text-xl text-center font-bold mb-6'>Select State</h3>

          <div className='mb-4 px-12'>
            <Select label='Select State' onChange={setSelectedState} error={errors.selectedState}>
              {Object.keys(states).map((state) => (
                <Option key={state} value={state}>
                  {state}
                </Option>
              ))}
            </Select>
            {errors.selectedState && <p className='text-red-500'>{errors.selectedState}</p>}
          </div>

          <div className='flex items-center justify-center mt-4'>
            <Button variant='gradient' onClick={handleSearch}>Search</Button>
          </div>

        </div>

        {/** Conditionally render when Information.total_cases is truthy  */}
        {shouldRenderChart
          ? (
            // Show charts when not loading
            <div className='flex flex-col items-center justify-center rounded-lg border my-12'>
              <h2 className='mt-12 text-xl md:text-3xl font-bold'>COVID-19 Statistics for {selectedState}</h2>
              <canvas className='rounded-lg border my-12' ref={canvasRef1} />
              <canvas className='rounded-lg border my-12' ref={canvasRef2} />
              <canvas className='rounded-lg border my-12' ref={canvasRef3} />
            </div>
            ) : (loading && (
              <div className='flex items-center justify-center my-12'>
                <Spinner className='h-12 w-12' />
              </div>
            ))}

        <p className='capitalize text-center font-semibold text-gray-500'>Last Updated: September 30, 2021</p>

      </Layout>
    </>
  );
};

export default states;
