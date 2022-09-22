import { Skeleton, TableCell, TableRow } from '@mui/material';
import React, { useState } from 'react';

const GatewaysListSkeleton = () => {
  const [rows] = useState([1, 2, 3]);

  return (
    <>
      {rows.map((i) => (
        <TableRow key={`skeleton-${i}`}>
          <TableCell colSpan={4}>
            <Skeleton variant="rounded" width="98%" height={50} sx={{ fontSize: '1rem' }} />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default GatewaysListSkeleton;
