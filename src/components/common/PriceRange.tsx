"use client"
import { useState } from "react";
import { getTrackBackground, Range } from "react-range";
// prop type 
type IProps = {
   STEP: number;
   MIN: number;
   MAX: number;
   values: number[];
   handleChanges: (val: number[]) => void
}
const PriceRange = ({MIN,MAX,values,handleChanges }: IProps) => {
   return (
      <div style={{
         zoom:1.33
      }}>
         <Range
            step={1}
            min={MIN}
            max={MAX}
            values={values}
            onChange={(vals) => handleChanges(vals)}
            renderTrack={({ props, children }) => (
               <div
                  {...props}
                  key='track'
                  style={{
                     ...props.style,
                     height: '4px',
                     width: '100%',
                     borderRadius: "10px",
                     background: getTrackBackground({
                        values: values,
                        colors: ["#fff", "#000", "#1B1819"],
                        min: MIN,
                        max: MAX
                     }),
                  }}
               >
                  {children}
               </div>
            )}
            renderThumb={({ props, index }) => (
               <div
                  {...props}
                  key={`thumb-${index}`}
                  className="ui-input"
                  style={{
                     ...props.style,
                     height: '20px',
                     width: '20px',
                     backgroundColor: "#fff",
                     outline: "none",
                     borderRadius: "50px",
                     border: "2px solid #000",
                  }}
               />
            )}
         />
      </div>

   );
};


export default PriceRange;