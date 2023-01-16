import * as React from 'react';
import ConciseTable from './ConciseTable';
import type { TableProps } from './ConciseTable';

function Table<RecordType extends object = any>(
  props: TableProps<RecordType>,
) {

  return <ConciseTable<RecordType> {...props} />;
}

export default Table;
