import React,{useState} from 'react';
import Table from '../components/table/Table';
import Radio from '../components/radio';
import '../components/table/style/index.less';
import './index.less';

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
    title: 'Mobile',
    dataIndex: 'mobile',
    key: 'mobile',
  },
];

const data = [
  { name: 'Jack1', age: 38, address: 'some where', key: '1',mobile:'1111' },
  { name: 'Rose', age: 26, address: 'some where', key: '2',mobile:'2222' },
];

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  }
};


export default function SintelTable (props: ITryProps) {
  const [curType, setcurType] = useState<'checkbox' | 'radio'>('checkbox');
  const [theme, settheme] = useState<'purple' | 'orange'>('purple');
  const handleChange=(type:'checkbox' | 'radio')=>{
    console.log(type)
    setcurType(type)
  }
  const handleThemeChange=(type:'purple' | 'orange')=>{
    console.log(type)
    settheme(type)
  }
  return (
    <div>
      <h1>This is an example for client side usage</h1>
      <h1>The library design and architecture can check with the code and storybook</h1>
      <div>
        <div className='radioContainer'>
          <Radio checked={curType==='checkbox'} onChange={()=>handleChange('checkbox')} label='checkbox' />
          <Radio checked={curType==='radio'} onChange={()=>handleChange('radio')} label='radio' />
        </div>
        <div className='radioContainer'>
          <Radio checked={theme==='purple'} onChange={()=>handleThemeChange('purple')} label='purple' />
          <Radio checked={theme==='orange'} onChange={()=>handleThemeChange('orange')} label='orange' />
        </div>
      </div>
      <Table 
        rowSelection={{
          type: curType,
          ...rowSelection,
        }}
        columns={columns} 
        data={data} 
        theme={theme}
      />
    </div>
  );
}
