import React,{useState,useMemo} from 'react';
import './index.less';

export interface ICheckBoxProps {
  data?:Array<any>;
  onChange?:(event:any)=>void;
  // value:string;
  checked?:boolean;
  label?:string;
  value:string;
}

export default function CheckBox (props: ICheckBoxProps) {
  const { checked, onChange,label,data,value } = props;
  const [checkedState, setcheckedState] = useState(false);
  const handleChange=(ev)=>{
    onChange && onChange(ev)
    const checked=ev.target.checked
    setcheckedState(checked)
  }
  return (
    <div>
      <span className='singtel-input-checkbox-container'>
        <input
          className='singtel-input-checkbox'
          type="checkbox"
          value={value}
          checked={checked===undefined?checkedState:checked}
          onChange={handleChange}
        />
        <label htmlFor="singtel-input-checkboxId"></label>
        <span>{label}</span>
      </span>
    </div>
  );
}
