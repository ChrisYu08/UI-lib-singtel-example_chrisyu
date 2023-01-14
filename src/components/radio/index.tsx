import React,{useState} from 'react';
import './index.less';

export interface IRadioProps {
  onChange?:(event:any)=>void;
  checked?:boolean;
  label?:string
}

export default function Radio (props: IRadioProps) {
  const { checked, onChange,label } = props;
  const [checkedState, setcheckedState] = useState();
  const handleChange=(ev)=>{
    onChange(ev)
  }
  return (
    <div>
      <span className='singtel-input-radio-container'>
          <input
            className='singtel-input-radio'
            type="radio"
            checked={checked===undefined?checkedState:checked}
            onChange={handleChange}
          />
          <label htmlFor="singtel-input-radioId"></label>
          <span>{ label }</span>
        </span>
    </div>
  );
}
