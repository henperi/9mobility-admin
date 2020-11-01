import React from 'react';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { generateShortId } from '../../../utils/generateShortId';
import { Spinner } from '../Spinner';
import { Text } from '../Text';
import { Style } from './styles';

interface ISimpleTableProps
  extends React.TableHTMLAttributes<HTMLTableElement> {
  columns?: string[];
  data?: (string | number | Date | React.FC | JSX.Element)[][];
  scrollable?: boolean;
  loading?: boolean;
  onRowClick?: (() => void)[] | (() => void);
}

export const SimpleTable: React.FC<ISimpleTableProps> = (props) => {
  const { columns, data, loading, onRowClick, onClick, ...rest } = props;

  const handleRowClick = (i: number) => {
    if (typeof onRowClick === 'object') {
      onRowClick[i] && onRowClick[i]();
    }

    if (typeof onRowClick === 'function') {
      onRowClick();
    }
  };

  return (
    <Style.Table {...rest}>
      <Thead>
        <Tr>
          {columns?.map((name) => (
            <Th key={generateShortId()}>
              <Text variant="lighter" weight={700} size={14}>
                {name}
              </Text>
            </Th>
          ))}
        </Tr>
      </Thead>
      {loading ? (
        <div style={{ minHeight: '150px' }}>
          <Spinner isFixed />
        </div>
      ) : (
        <Tbody>
          {data?.map((row, i) => (
            <Tr
              key={generateShortId()}
              style={{ cursor: onRowClick && 'pointer' }}
              onClick={() => handleRowClick(i)}
            >
              {row.map((item) => (
                <Td key={generateShortId()}>
                  <Text variant="lighter" weight={400} size={14}>
                    {item}
                  </Text>
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      )}
    </Style.Table>
  );
};
