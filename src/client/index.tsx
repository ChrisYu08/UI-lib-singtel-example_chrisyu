import * as React from 'react';
import Table from '../components/table/Table';
import '../components/table/style/index.less';

export interface ITryProps {
}

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: '40%',
    sorter: (a: { name: string | any[]; }, b: { name: string | any[]; }) => a?.name?.length - b?.name?.length,
    sortDirections: ['descend'],
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: '20%',
    defaultSortOrder: 'descend',
    sorter: (a: { age: number; }, b: { age: number; }) => a.age - b.age,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    width: '20%',
  },
  {
    title: 'Operations',
    dataIndex: 'operations',
    key: 'operations',
  },
];

const data = [
  { name: 'Jack1', age: 38, address: 'some where', key: '1',operations:'qwe' },
  { name: 'Rose', age: 26, address: 'some where', key: '2',operations:'aaa' },
];

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  }
};

export default function SintelTable (props: ITryProps) {
  return (
    <div>
      {/* <CheckBox
        onChange={(e)=>{console.log(e)}}
      /> */}
      <Table 
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        columns={columns} 
        data={data} 
      />
    </div>
  );
}
