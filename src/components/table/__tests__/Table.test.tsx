import React from 'react';
import { screen, cleanup } from "@testing-library/react";
import Table from '..';
import {render} from '../../../tests/utils';



describe('Table',()=>{
  afterEach(() => {
    cleanup();
  });
  const data = [
    { name: 'Jack1', age: 38, address: 'some where', key: '1',mobile:'1122' },
    { name: 'Rose', age: 26, address: 'some where', key: '2',mobile:'2211' },
  ];
  it('renders JSX correctly for plain table', () => {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: '40%',
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        width: '20%',
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        width: '20%',
      },
      {
        title: 'Mobile',
        dataIndex: 'mobile',
        key: 'mobile',
      },
    ];
      const { asFragment } = render(
        <Table data={data} columns={columns} />,
      );
      expect(asFragment().firstChild).toMatchSnapshot();
    }
  )
  it('renders JSX correctly for sorted table', () => {
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
        title: 'mobile',
        dataIndex: 'mobile',
        key: 'mobile',
      },
    ];
    const { asFragment } = render(
      <Table data={data} columns={columns} />,
    );
    expect(asFragment().firstChild).toMatchSnapshot();
  }
)
it('renders JSX correctly for selection table', () => {
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
      title: 'mobile',
      dataIndex: 'mobile',
      key: 'mobile',
    },
  ];
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    }
  };

  const { asFragment } = render(
    <Table
      rowSelection={{
        type: 'checkbox',
        ...rowSelection,
      }}
      columns={columns} 
      data={data} 
    />,
  );

  expect(asFragment().firstChild).toMatchSnapshot();
  }
)
})