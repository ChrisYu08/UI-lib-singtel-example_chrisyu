import * as React from 'react';
import ConciseTable from './ConciseTable';
import type { TableProps } from './ConciseTable';

function Table<RecordType extends object = any>(
  props: TableProps<RecordType>,
) {
  const renderTimesRef = React.useRef(0);
  renderTimesRef.current += 1;

  return <ConciseTable<RecordType> {...props} />;
}

export default Table;
