export const data = {
    'ford': {
        'Ranger': ['Raptor', 'Raptor x', 'wildtrak'],
        'Falcon': ['XR6', 'XR6 Turbo', 'XR8'],
        'Falcon Ute': ['XR6', 'XR6 Turbo'],
    },
    'bmw': {
        '130d': ['xDrive 26d', 'xDrive 30d'],
        '240i': ['xDrive 30d', 'xDrive 50d'],
        '320e': ['xDrive 75d', 'xDrive 80d', 'xDrive 85d']
    },
    'tesla': {
        'Model 3': ['Performance', 'Long Range', 'Dual Motor']
    },
}

export const commonVehicles = [
    { make: 'tesla', model: 'Model 3', badge: 'Performance'},
    { make: 'bmw', model: '130d', badge: 'xDrive 26d'},
]

export const titleCase = (str: string)=>{
    return str.toLowerCase().split(' ').map(function(word) {
      return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
  }

export const getDescendantProp = (obj: any, path: any)=> {
    return path.split('.').reduce((acc: any, part: any) => acc && acc[part], obj)
}
 

export const getMake = (data: any)=> {
    return Object.keys(data);
}

export const getModel = (data: any, make: string)=> {
    const values = getDescendantProp(data, make);
    return Object.keys(values);
}

export const getBadge = (data: any, make: string, model:string)=> {
    return getDescendantProp(data, `${make}.${model}`);
}