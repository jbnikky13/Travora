export type NigerianAirline={name:string;iata:string;bookingMode:"api"|"affiliate";bookingUrl?:string};
const AIRLINES:NigerianAirline[]=[
{name:"Air Peace",iata:"P4",bookingMode:"affiliate"},
{name:"Arik Air",iata:"W3",bookingMode:"affiliate"},
{name:"Aero Contractors",iata:"AJ",bookingMode:"affiliate"},
{name:"Ibom Air",iata:"QI",bookingMode:"affiliate"},
{name:"Azman Air",iata:"ZQ",bookingMode:"affiliate"},
{name:"Dana Air",iata:"9J",bookingMode:"affiliate"},
{name:"Green Africa Airways",iata:"Q9",bookingMode:"affiliate"},
{name:"Max Air",iata:"VM",bookingMode:"affiliate"},
{name:"United Nigeria Airlines",iata:"UN",bookingMode:"affiliate"},
{name:"ValueJet",iata:"VJ",bookingMode:"affiliate"},
{name:"XEJet",iata:"4X",bookingMode:"affiliate"}
];
export function carrierDirectory(){return AIRLINES;}
export function configuredNigerianCarriers(){return AIRLINES.filter(x=>x.bookingMode==="api");}
export async function searchNigeria(){return [];}
export function affiliateAirlines(){return AIRLINES.filter(x=>x.bookingMode==="affiliate");}
