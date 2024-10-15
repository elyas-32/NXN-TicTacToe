import { useState } from "react";
export default function NumInput({readOnly, input, plusNumInputHandler, minusNumInputHandler, changeNumInputHandler, target, title}) {  
  return (
    <div className="flex flex-col text-center gap-1">
    <label htmlFor="">{title} :</label>
    <div className="flex gap-1">
      <div className="p-2 transition-[background] duration-200 cursor-pointer hover:bg-[#0d0d22] hover:border-2 text-white rounded-lg size-8 flex justify-center items-center border border-white"
      onClick={()=>{minusNumInputHandler(target)}}
    >
        -
      </div>
      <input
      onChange={()=>changeNumInputHandler(e, target)}
      type="number"
      readOnly={readOnly}
      id='input'
        value={input}
        className="w-[55px] rounded-lg bg-slate-950 border text-center outline-none focus:border-2 "
        />
      <div className="p-2 transition-[background] duration-200 cursor-pointer hover:bg-[#0d0d22] hover:border-2 text-white rounded-lg size-8 flex justify-center items-center border border-white"
        onClick={()=>plusNumInputHandler(target)}
        >
        +
      </div>
    </div>
    </div>
  );
}