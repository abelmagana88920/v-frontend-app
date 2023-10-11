import { useState, useEffect } from 'react';
import { data, getMake, getModel, getBadge, commonVehicles, titleCase } from './utils';

function App() {

  const [optionMakes, setOptionMakes] = useState([] as any);
  const [optionModels, setOptionModels] = useState([] as any);
  const [optionBadges, setOptionBadges] = useState([] as any);

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

  function handleSetCommonVehicle(vehicle: any) {
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
      <form method="POST" action="http://localhost:4000/upload">
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
            <div><input type="file" /> </div>
            <div> <input type="submit" value="Submit" /></div>
          </>
        )}

      </form>

      <h2>Select a Vehicle</h2>
      {commonVehicles.map((vehicle: any, index)=>(
        <button key={index} className='commonVehicleButtons' onClick={()=>handleSetCommonVehicle(vehicle)}>
          {titleCase(vehicle.make)} {vehicle.model} {vehicle.badge}
        </button>
      ))}
    </div>
  );
}

export default App;
