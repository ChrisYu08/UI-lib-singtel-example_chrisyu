import React,{useCallback} from 'react';
import warning from '../../../utils/warning';
import Checkbox from '../../checkbox';
import Radio from '../../radio';
import { isMobile } from '../../../utils';
import {TableRowSelection} from '../tableInterface';

//TODO Type supplement
export interface IuseSelectionProps<RecordType> {
  rowSelection:TableRowSelection<RecordType>;
  updateData:(data,key?:string)=>void;
}

export const SELECTION_COLUMN = {} as const;

export default function useSelection<RecordType> (props: IuseSelectionProps<RecordType>) {
  const {rowSelection,updateData}=props;
  const {type,onChange}=rowSelection;
  const isMb = isMobile();
  
  
  const transformSelectionColumns = useCallback(
    (columns) => {
      if (!rowSelection) {
        warning(
          !columns.includes(SELECTION_COLUMN),
          'Table',
          '`rowSelection` is not config but `SELECTION_COLUMN` exists in the `columns`.',
        );

        return columns.filter(col => col !== SELECTION_COLUMN);
      }
      let cloneColumns = [...columns];
      let selectionColumns=[{
        title:'',
        key:'selection',
        dataIndex:'selection',
        width:32,
        render: (val,record) => (
        <div className='chooseColumn' onClick={(event)=>{
          updateData(record.key)
          onChange(record.key,record)
        }}>
          <span>{
            type==='checkbox'?<Checkbox checked={record?.checked} value={record.key} />:<Radio checked={record?.checked} />
            }</span>
        </div>
      )
      }]
      cloneColumns=[...selectionColumns,...cloneColumns];
      // cloneColumns[0]={
      //   ...cloneColumns[0],
      //   render: (val,record) => <div className='chooseColumn' onClick={(event)=>{
      //     updateData(record.key)
      //     onChange(record.key,record)
      //   }}>
      //     <span>{
      //       type==='checkbox'?<Checkbox checked={record?.checked} value={record.key} />:<Radio checked={record?.checked} />
      //       }</span>
      //     <span>{val}</span>
      //   </div>
      // }

      return cloneColumns;
    },
    [rowSelection, type],
  );

  const transformData = useCallback(
    (param:{key?:string,data?:Array<any>} ) => {
      const {key,data}=param;
      let cloneData=[...data];
      if(type==='checkbox'){
        return cloneData.map(item=>{
          if(item?.key===key){
            item.checked=!Boolean(item.checked)
            return item
          }else{
            return {...item,checked:Boolean(item.checked)}
          }
        })
      }else if(type==='radio'){
        return cloneData.map(item=>{
          if(item?.key===key){
            item.checked=true
            return item
          }else{
            return {...item,checked:false}
          }
        })
      }
    },
    [type],
  );
  return {transformSelectionColumns,transformData}
}
