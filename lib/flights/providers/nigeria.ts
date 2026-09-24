export type BookingMode="api"|"gds"|"affiliate";
export type NigerianAirline={name:string;iata:string;country:"NG";directApi?:string;gdsProvider?:string;affiliateUrl?:string;bookingMode:BookingMode};
const AIRLINES:NigerianAirline[]=[
{name:"Air Peace",iata:"P4",country:"NG",bookingMode:"affiliate"},
{name:"Arik Air",iata:"W3",country:"NG",bookingMode:"affiliate"},
{name:"Aero Contractors",iata:"AJ",country:"NG",bookingMode:"affiliate"},
{name:"Ibom Air",iata:"QI",country:"NG",bookingMode:"affiliate"},
{name:"Azman Air",iata:"ZQ",country:"NG",bookingMode:"affiliate"},
{name:"Dana Air",iata:"9J",country:"NG",bookingMode:"affiliate"},
{name:"Green Africa Airways",iata:"Q9",country:"NG",bookingMode:"affiliate"},
{name:"Max Air",iata:"VM",country:"NG",bookingMode:"affiliate"},
{name:"United Nigeria Airlines",iata:"UN",country:"NG",bookingMode:"affiliate"},
{name:"ValueJet",iata:"VJ",country:"NG",bookingMode:"affiliate"},
{name:"XEJet",iata:"4X",country:"NG",bookingMode:"affiliate"}
];
export function carrierDirectory(){return AIRLINES;}
export function configuredNigerianCarriers(){return AIRLINES.filter(x=>x.directApi||x.gdsProvider||x.affiliateUrl);}
export function affiliateAirlines(){return AIRLINES.filter(x=>x.affiliateUrl);}
export function resolveBookingMode(a:NigerianAirline):BookingMode{if(a.directApi)return "api";if(a.gdsProvider)return "gds";return "affiliate";}
export async function searchNigeria(){return [];}
