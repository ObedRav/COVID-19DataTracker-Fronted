import { useState, useEffect } from 'react';
import { fetchApiData } from '@/utils/api';

/**
 * The `useUsData` function fetches and returns various data related to COVID-19 in the US, including
 * dates, total cases, total deaths, current hospitalizations, and total testing data.
 * @returns The function `useUsData` returns an array containing the following values in order:
 * `dates`, `totalCasesData`, `totalDeathsData`, `totalHospitalizeCurrently`, `totalTestingData`.
 */
export function useUsData () {
  const [dates, setDates] = useState([]);
  const [totalCasesData, setTotalCasesData] = useState([]);
  const [totalDeathsData, setTotalDeathsData] = useState([]);
  const [totalHospitalizeCurrently, setTotalHospitalizeCurrently] = useState([]);
  const [totalTestingData, setTotalTestingData] = useState([]);

  useEffect(() => {
    async function fetchUsData () {
      try {
        const data = await fetchApiData('us/daily');
        if (data) {
          const dates = data.map((entry) => entry.date);
          const totalCasesData = data.map((entry) => entry.total_cases);
          const totalDeathsData = data.map((entry) => entry.total_deaths);
          const totalHospitalizeCurrently = data.map((entry) => entry.hospitalized_currently);
          const totalTestingData = data.map((entry) => entry.total_testing);

          setDates(dates);
          setTotalCasesData(totalCasesData);
          setTotalDeathsData(totalDeathsData);
          setTotalHospitalizeCurrently(totalHospitalizeCurrently);
          setTotalTestingData(totalTestingData);

          console.log(dates, totalCasesData, totalDeathsData, totalHospitalizeCurrently, totalTestingData);
        }
      } catch (error) {
        console.error('Error fetching US data:', error);
      }
    }

    fetchUsData();
  }, []);

  return [dates, totalCasesData, totalDeathsData, totalHospitalizeCurrently, totalTestingData];
}

/**
 * The `useTopsUsData` function is a custom React hook that fetches and returns the tops US data from
 * an API.
 * @returns The `topsUSData` array is being returned.
 */
export function useTopsUsData () {
  const [topsUSData, setTopsUSData] = useState([]);

  useEffect(() => {
    async function fetchTopsUsData () {
      try {
        const data = await fetchApiData('us/tops');
        if (data) {
          setTopsUSData(data);
        }
      } catch (error) {
        console.error('Error fetching tops US data:', error);
      }
    }

    fetchTopsUsData();
  }, []);

  return topsUSData;
}

/**
 * The `useTopsStatesData` function is a custom React hook that fetches and returns the top states data
 * from an API.
 * @returns The `topsStatesData` array is being returned.
 */
export function useTopsStatesData () {
  const [topsStatesData, setTopsStatesData] = useState([]);

  useEffect(() => {
    async function fetchTopsStatesData () {
      try {
        const data = await fetchApiData('states/tops');
        if (data) {
          setTopsStatesData(data);
        }
      } catch (error) {
        console.error('Error fetching tops states data:', error);
      }
    }

    fetchTopsStatesData();
  }, []);

  return topsStatesData;
}

/**
 * The `useFetchStates` function is a custom React hook that fetches and returns state data from an
 * API.
 * @returns The `states` object is being returned.
 */
export function useStates () {
  const [states, setStates] = useState({});

  useEffect(() => {
    async function fetchStatesData () {
      try {
        const options = await fetchApiData('states');
        setStates(options);
      } catch (error) {
      }
    }

    fetchStatesData();
  }, []);
  return states;
}
