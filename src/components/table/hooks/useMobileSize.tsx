import React,{useCallback} from 'react';
import { isMobile } from '../../../utils';
import {ColumnsType} from '../tableInterface'


interface useMobileSizeResult<RecordType>{
  transformMobileColumns:(columns:ColumnsType<RecordType>)=>any
}

export default function useMobileSize<RecordType extends object = any> ():useMobileSizeResult<RecordType> {
  const isMb = isMobile();
  const transformMobileColumns = useCallback(
    (columns) => {
      let cloneColumns=[...columns];
      if(isMb){
        if(Number(cloneColumns?.length)>3){
          return [
            {
              title: 'Contract details',
              dataIndex: 'name',
              render:(_:any,record)=>{
                return(
                <ul>
                  {
                    Object.entries(record).filter(e=>e[0]!=='key').map((item,index)=><li key={index}>
                      <span className='head1'>{item[0]}:</span>   <span className='val1'>{item[1] as string}</span>
                    </li>)
                  }
                </ul>
              )}
            },
          ];
        }else{
          return cloneColumns
        }
      }else{
        return cloneColumns
      }
    },
    [isMb],
  );
  return {transformMobileColumns}
}
