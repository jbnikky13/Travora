import { NextResponse } from "next/server";

type SearchBody={origin:string;destination:string;departureDate:string;returnDate?:string;travellers?:number;tripType?:string;cabin?:string};

async function searchDuffel(body:SearchBody,token:string){
 const slices:any[]=[{origin:body.origin.trim().toUpperCase(),destination:body.destination.trim().toUpperCase(),departure_date:body.departureDate}];
 if(body.tripType==="round_trip"){if(!body.returnDate)throw new Error("Return date is required for a round trip.");slices.push({origin:body.destination.trim().toUpperCase(),destination:body.origin.trim().toUpperCase(),departure_date:body.returnDate});}
 const count=Math.max(1,Math.min(9,Number(body.travellers)||1));
 const response=await fetch("https://api.duffel.com/air/offer_requests",{method:"POST",headers:{"Authorization":"Bearer "+token,"Duffel-Version":"v2","Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify({data:{slices,passengers:Array.from({length:count},()=>({type:"adult"})),cabin_class:body.cabin||"economy",return_offers:true}}),cache:"no-store"});
 const data=await response.json(); if(!response.ok)throw new Error(data?.errors?.[0]?.message||"Duffel search failed.");
 return (data.data?.offers||[]).map((offer:any)=>({...offer,provider_source:"duffel"}));
}

async function searchTravelport(body:SearchBody,token:string){
 const response=await fetch(process.env.TRAVELPORT_SEARCH_URL||"https://api.travelport.com/flight/search",{method:"POST",headers:{"Authorization":"Bearer "+token,"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify(body),cache:"no-store"});
 if(!response.ok)throw new Error("Travelport search failed.");
 const data=await response.json(); return (data.offers||data.data?.offers||[]).map((offer:any)=>({...offer,provider_source:"travelport"}));
}

export async function POST(request:Request){
 try{
  const body=await request.json() as SearchBody;
  if(!body.origin||!body.destination||!body.departureDate)return NextResponse.json({error:"Origin, destination and departure date are required."},{status:400});
  const offers:any[]=[]; const errors:string[]=[];
  if(process.env.DUFFEL_ACCESS_TOKEN){try{offers.push(...await searchDuffel(body,process.env.DUFFEL_ACCESS_TOKEN));}catch(e:any){errors.push(e.message);}}
  if(process.env.TRAVELPORT_ACCESS_TOKEN){try{offers.push(...await searchTravelport(body,process.env.TRAVELPORT_ACCESS_TOKEN));}catch(e:any){errors.push(e.message);}}
  if(!process.env.DUFFEL_ACCESS_TOKEN&&!process.env.TRAVELPORT_ACCESS_TOKEN)return NextResponse.json({error:"No flight provider is configured. Add DUFFEL_ACCESS_TOKEN or TRAVELPORT_ACCESS_TOKEN in Vercel."},{status:503});
  return NextResponse.json({offers,providers:[process.env.DUFFEL_ACCESS_TOKEN?"duffel":null,process.env.TRAVELPORT_ACCESS_TOKEN?"travelport":null].filter(Boolean),provider_errors:errors});
 }catch(e:any){return NextResponse.json({error:e?.message||"Unable to search flights right now."},{status:500});}
}