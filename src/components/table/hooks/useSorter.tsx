import React,{useState,useCallback,useRef} from 'react';
import { isMobile } from '../../../utils';
import type {
  Key,
  SortOrder
} from '../tableInterface';

type sortStateType={
  sortFn?:()=>void;
  sortOrder?:SortOrder | null;
  sorted?:boolean;
}

export interface SortState {
  transformSorterColumns?: (colums)=>any;
  onSort?:(defaultSort:SortOrder,sortFn:()=>any)=>any
  key?: Key;
  sortStates?:sortStateType
  
}

interface IuseSorterProps{
  defaultSort?:SortOrder | null;
}
//TODO Type supplyment
export default function useSorter(props?:IuseSorterProps): SortState {
  // TODO: warning params
  const isMb=isMobile()
  const isSortedRef=useRef(false)
  const [sortStates, setsortStates] = useState({setOrder:'',sortFn:null,sorted:isSortedRef.current});

  const onSort=(defaultSort:SortOrder,sortFn:()=>any)=>{
    const isSorted=isSortedRef.current;
    isSortedRef.current=!isSortedRef.current;
    setsortStates({
      setOrder:defaultSort,
      sortFn:sortFn,
      sorted:!isSorted
    })
  }

  const transformSorterColumns = useCallback(
    (mergedColumns) => {
      let cloneColumns=[...mergedColumns];
      if(isMb){
        return cloneColumns
      }
      return cloneColumns.map((item)=>{
        if(item?.sorter){
          if(item?.sortDirections){
            return {
              ...item,
              title:<div className='arrowTitleContainer'  onClick={()=>onSort(item?.defaultSortOrder || item?.sortDirections[0],item.sorter)}>
              <span>{item.title}</span>
              <span className='singleArrowContainer'>
                {
                  item?.sortDirections[0]==='descend'?
                    <img className="singleArrow" src="/assets/img/sorting-down.svg" alt="" />
                  : <img className="singleArrow" src="/assets/img/sorting-up.svg" alt="" />
                }
              </span>  
            </div>
            }
            // item.title=()
          }else if(item?.defaultSortOrder){
            return {
              ...item,
              title:<div className='arrowTitleContainer' onClick={()=>onSort(item?.defaultSortOrder || item?.sortDirections[0],item.sorter)}>
              <span>{item.title}</span>
              <span className='singleArrowContainer'>
                <img className="singleArrow" src="/assets/img/sorting-netural.svg" alt="" />
              </span>  
            </div>
            }
          }
        }else{
          return item
        }
      })
    },
    [isMb],
  );
  
  return {transformSorterColumns,sortStates}
};


export const getSortData=(data,sortStates)=>{
  const {sortFn}=sortStates;
  const cloneData=[...data];
  return sortFn ? cloneData.sort(sortFn) : cloneData
}
