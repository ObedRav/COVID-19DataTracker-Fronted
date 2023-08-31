import {
  Card,
  CardBody,
  Typography
} from '@material-tailwind/react';
import { motion } from 'framer-motion';

function formatNumberWithDots (number) {
  if (number === undefined || number === null) {
    return undefined;
  }

  return number.toLocaleString(); // Format number with dot separators
}

function HorizontalSpecificCard ({ Number, Text, className }) {
  return (
    <motion.div
      className='w-full'
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
    >
      <Card className={`w-full max-w-[48rem] flex-row mb-4 ${className}`}>
        <CardBody>
          <Typography variant='h4' color='blue-gray' className='mb-2'>
            {Text}
          </Typography>
          <Typography color='gray' className='font-normal'>
            {formatNumberWithDots(Number) || 'No registered data'}
          </Typography>
        </CardBody>
      </Card>
    </motion.div>
  );
}

export default HorizontalSpecificCard;
