import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button
} from '@material-tailwind/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';

function formatNumberWithDots (number) {
  return number.toLocaleString(); // Format number with dot separators
}

function HorizontalGeneralCard ({ Date, TotalCases, TotalDeaths, TotalTesting, Text, className, Img }) {
  const router = useRouter();

  return (
    <motion.div
    className={`mb-4 ${className}`}
    initial={{ opacity: 0, y: 100 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    viewport={{ once: true }}
    >
      <Card className='w-full max-w-[48rem] flex-row'>
        <CardHeader
          shadow={false}
          floated={false}
          className='m-0 w-2/5 shrink-0 rounded-r-none'
        >
          <Image
            src={Img}
            alt='card-image'
            className='h-full w-full object-cover'
            priority
          />
        </CardHeader>
        <CardBody>
          <Typography variant='h6' color='gray' className='mb-1 uppercase'>
            {Date}
          </Typography>
          <Typography variant='h4' color='blue-gray' className='mb-2'>
            {Text}
          </Typography>
          <Typography color='gray' className='font-normal'>
            Total Cases: {formatNumberWithDots(TotalCases)}
          </Typography>
          <Typography color='gray' className='font-normal'>
            Total Deaths: {formatNumberWithDots(TotalDeaths)}
          </Typography>
          <Typography color='gray' className='font-normal'>
            Total Testing: {formatNumberWithDots(TotalTesting)}
          </Typography>
          <a href='#' className='inline-block'>
            <Button
              variant='text' className='flex items-center gap-2' onClick={() => {
                router.push({
                  pathname: '/records',
                  query: {
                    selectedState: Text,
                    selectedDate: Date
                  }
                });
              }}
            >
              Learn More
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
                className='h-4 w-4'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'
                />
              </svg>
            </Button>
          </a>
        </CardBody>
      </Card>
    </motion.div>
  );
}

export default HorizontalGeneralCard;
