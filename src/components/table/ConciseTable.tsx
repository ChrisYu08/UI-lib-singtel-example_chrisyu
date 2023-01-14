import React,{useState,useEffect,useCallback} from 'react';
import classNames from 'classnames';
import {default as RcTable} from 'rc-table';
import type { TableProps as RcTableProps } from 'rc-table/lib/Table';
import type {
  ColumnsType,
  FilterValue,
  SorterResult,
  TableRowSelection,
  ColumnType
} from './tableInterface';
import {getPrefixCls} from '../utils/index';
import useSelection from './hooks/useSelection';
import useSorter,{getSortData} from './hooks/useSorter';
import useMobileSize from './hooks/useMobileSize';

export interface TableProps<RecordType> extends RcTableProps{
  data?: RcTableProps<RecordType>['data'];
  columns?: ColumnsType<RecordType>;

  onChange?: (
    // pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<RecordType> | SorterResult<RecordType>[],
  ) => void;
  rowSelection?: TableRowSelection<RecordType>;
}

function ConciseTable<RecordType extends object = any> (props:TableProps<RecordType>) {
  const {
    style,
    className,
    rowSelection ={},
    // rowKey = 'key',
    // rowClassName,
    columns,
    data
  }=props;
  const [curData, setcurData] = useState<Array<any>>([]);
  const [curColumns, setcurColumns] = useState<Array<any>>([]);
  const [curKey, setcurKey] = useState<string>('');
  const prefixCls = getPrefixCls('table');
  
  const internalRefs = {
    body: React.useRef<HTMLDivElement>(),
  };
  const updateData=(key?:string)=>{
    const newTableData=transformData({key,data:[...data]});
    setcurData(newTableData)
    setcurKey(key)
  }


  const {transformSelectionColumns, transformData} = useSelection({rowSelection,updateData});
  const {transformSorterColumns,sortStates} = useSorter();
  const {transformMobileColumns} = useMobileSize();
  const sortedData = React.useMemo(
    () => {
      return getSortData(data,sortStates)
    },
    [data,sortStates],
  );
  

  const wrapperClassNames = classNames(
    `${prefixCls}-wrapper`,
    className,
  );
  const getRowClassName = useCallback(
    (record,index) => {
      if(record?.checked){
        return 'active'
      }else{
        return ''
      }
    },
    [curKey],
  );

  const init=()=>{
    const pageData=rowSelection?.type?transformData({data:[...data]}):[...data];
    let mergedColumns=columns.some((e:ColumnType<RecordType>)=>e?.sorter)?transformSorterColumns(columns):columns;
    mergedColumns=transformMobileColumns(mergedColumns);
    if(rowSelection?.type) mergedColumns=transformSelectionColumns(mergedColumns);
    setcurData(pageData)
    setcurColumns(mergedColumns)
  }

  useEffect(() => {
    init()
  }, []);

  useEffect(() => {
    const {sorted}= sortStates;
    if(!sorted){
      setcurData([...data])
    }else{
      setcurData(sortedData)
    }
  }, [sortedData]);

  return <div style={style} className={wrapperClassNames}>
    <RcTable<RecordType>
          {...props}
          columns={curColumns}
          data={curData}
          rowClassName={getRowClassName}
          prefixCls={prefixCls}
          internalRefs={internalRefs as any}
        />
  </div> ;
};

export default ConciseTable;