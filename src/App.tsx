import { useState, useEffect } from 'react';
import { data, getMake, getModel, getBadge, commonVehicles, titleCase } from './utils';
import type { VehicleType } from './type';

function App() {

  const [optionMakes, setOptionMakes] = useState<string[]>([]);
  const [optionModels, setOptionModels] = useState<string[]>([]);
  const [optionBadges, setOptionBadges] = useState<string[]>([]);

  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [badge, setBadge] = useState('');

  function handleChangeMake(make: string) {
    setMake(make);
    setModel('');
    setBadge('');
    setOptionModels(getModel(data, make));
  }

  function handleChangeModel(model:string) {
    setModel(model);
    setBadge('');
    setOptionBadges(getBadge(data, make, model));
  }

  function handleChangeBadge(badge: string) {
    setBadge(badge);
  }

  function handleSetCommonVehicle(vehicle: VehicleType) {
    setMake(vehicle.make);
    setOptionModels(getModel(data, vehicle.make));

    setModel(vehicle.model);
    setOptionBadges(getBadge(data, vehicle.make, vehicle.model));
   
    setBadge(vehicle.badge);
  }

  useEffect(()=>{
    setOptionMakes(getMake(data));
  },[])

  return (
    <div>
      <h1>Drill Down Form</h1>
      <form method="POST" action="http://localhost:4000/upload" encType="multipart/form-data" >
        <select name="make" onChange={(e)=>handleChangeMake(e.target.value)} value={make}>
          <option disabled value=''>make</option>
          {optionMakes.map((make: string, index: number)=>
           <option key={index} value={make}>{titleCase(make)}</option>
          )}
        </select>
        {!!make && (
          <select name="model" onChange={(e)=>handleChangeModel(e.target.value)} value={model}>
          <option disabled value=''>model</option>
          {optionModels.map((model: string, index: number)=>
           <option key={index}>{model}</option>
          )}
          </select>
        )}
        {!!model && (
           <select name="badge" onChange={(e)=>handleChangeBadge(e.target.value)} value={badge}>
            <option disabled value=''>badge</option>
            {optionBadges.map((badge: string, index: number)=>
              <option key={index}>{badge}</option>
            )}
          </select>
        )}

        {!!badge && (
          <>
            <div className="logbookText">Upload Logbook:</div>
            <div><input name="file" type="file" accept=".txt" /> </div>
            <div> <input type="submit" value="Submit" /></div>
          </>
        )}

      </form>

      <h2>Select a Vehicle</h2>
      {commonVehicles.map((vehicle: VehicleType, index)=>(
        <button key={index} className='commonVehicleButtons' onClick={()=>handleSetCommonVehicle(vehicle)}>
          {titleCase(vehicle.make)} {vehicle.model} {vehicle.badge}
        </button>
      ))}
    </div>
  );
}

export default App;
