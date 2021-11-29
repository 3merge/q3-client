import React from 'react';
import {
  Table as MuiTable,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Box,
  Container,
} from '@material-ui/core';
import { first } from 'lodash';
import { useTranslation } from 'q3-ui-locale';
import withHeader from '../withHeader';
import useStyle from './styles';

const Table = ({ data }) => {
  const { root } = useStyle();
  const { t } = useTranslation('labels');

  return (
    <Container maxWidth="xl">
      <Box height="390px" overflow="scroll" my={2}>
        <MuiTable className={root}>
          <TableHead>
            <TableRow>
              {Object.keys(first(data)).map((item) => (
                <TableCell component="th" key={item}>
                  {t(item)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow>
                {Object.values(item).map((v) => (
                  <TableCell key={v}>{t(v)}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </Box>
    </Container>
  );
};

export default withHeader(Table);
