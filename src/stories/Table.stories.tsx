import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Table from '../components/table';
import '../components/table/style/index.less';

export default {
  title: 'Singtel/Table',
  component: Table,
} as ComponentMeta<typeof Table>;

/***************************************/


/***************************************/

const Template: ComponentStory<typeof Table> = (args) => {
  return (<Table {...args} />)
};
export const selectionCheckboxTable = Template.bind({});
  

selectionCheckboxTable.args = {
  columns : [
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
      title: 'mobile',
      dataIndex: 'mobile',
      key: 'mobile',
    },
  ],
  data : [
    { name: 'Jack1', age: 38, address: 'some where', key: '1',mobile:'99933342' },
    { name: 'Rose', age: 26, address: 'some where', key: '2',mobile:'89237782' },
  ],
  rowSelection: {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    type:'checkbox'
  }
}

export const selectionRadioTable = Template.bind({});
  

selectionRadioTable.args = {
  columns : [
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
      title: 'mobile',
      dataIndex: 'mobile',
      key: 'mobile',
    },
  ],
  data : [
    { name: 'Jack1', age: 38, address: 'some where', key: '1',mobile:'99933342' },
    { name: 'Rose', age: 26, address: 'some where', key: '2',mobile:'89237782' },
  ],
  rowSelection: {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    type:'radio'
  }
}



