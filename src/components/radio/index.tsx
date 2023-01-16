import React,{useState} from 'react';
import './index.less';

export interface IRadioProps {
  onChange?:(event:any)=>void;
  checked?:boolean;
  label?:string
}

export default function Radio (props: IRadioProps) {
  const { checked, onChange,label } = props;
  const [checkedState, setcheckedState] = useState(false);
  const handleClick=(args)=>{
    checked===undefined && setcheckedState(!checkedState)
    onChange && onChange(args)
  }
  const handleChange=(args)=>{
    onChange && onChange(args)
  }
  return (
    <div className='singtel-radio'>
      <span className='singtel-input-radio-container' onClick={handleClick}>
          <input
            className='singtel-input-radio'
            type="radio"
            checked={checked===undefined?checkedState:checked}
            onChange={handleChange}
          />
          <label htmlFor="singtel-input-radioId"></label>
        </span>          
        <span className='singtel-label'>{ label }</span>
    </div>
  );
}
