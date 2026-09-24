"use client";

import { useState } from "react";
import { ArrowRight, CalendarDays, CheckCircle2, Clock3, Plane, ShieldCheck, UserRound } from "lucide-react";

const popular = [
  { route: "Lagos → London", meta: "From ₦1,842,000 · 1 stop", price: "₦1,842,000" },
  { route: "Abuja → Dubai", meta: "From ₦1,190,000 · 1 stop", price: "₦1,190,000" },
  { route: "Lagos → Accra", meta: "From ₦420,000 · Direct", price: "₦420,000" },
];

export default function Home() {
  const [trip, setTrip] = useState("Round trip");
  const [origin,setOrigin]=useState("LOS"); const [destination,setDestination]=useState("LHR"); const [departure,setDeparture]=useState(""); const [returnDate,setReturnDate]=useState(""); const [travellers,setTravellers]=useState("1"); const [cabin,setCabin]=useState("economy"); const [offers,setOffers]=useState<any[]>([]); const [searching,setSearching]=useState(false);
  const [message, setMessage] = useState("");

  function searchFlights() {
    setMessage("Enter your travel details to search live flight inventory.");
  }

  return (
    <>
      <header>
        <div className="container nav">
          <a className="brand" href="/">Trav<span>ora</span></a>
          <nav className="navLinks">
            <a href="#flights">Flights</a>
            <a href="#why">Why Travora</a>
            <a href="#manage">Manage booking</a>
          </nav>
          <div className="navActions">
            <button className="btn btnGhost" onClick={() => window.location.href="/auth"}>Sign in</button>
            <button className="btn btnPrimary" onClick={() => window.location.href="/auth"}>Create account</button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container">
            <h1>Find the flight that fits your journey.</h1>
            <p>Search and compare flights, book through trusted travel partners, and keep every reservation in one simple place.</p>

            <div className="searchCard" id="flights">
              <div className="tripTypes">
                {["Round trip", "One way", "Multi-city"].map((item) => (
                  <button key={item} className={`tripType ${trip === item ? "tripTypeActive" : ""}`} onClick={() => setTrip(item)}>{item}</button>
                ))}
              </div>
              <div className="searchGrid">
                <div className="field"><label>From</label><input value={origin} onChange={e=>setOrigin(e.target.value.toUpperCase())} placeholder="LOS" /></div>
                <div className="field"><label>To</label><input value={destination} onChange={e=>setDestination(e.target.value.toUpperCase())} placeholder="LHR" /></div>
                <div className="field"><label>Departure</label><input type="date" value={departure} onChange={e=>setDeparture(e.target.value)} /></div>
                <div className="field"><label>Return</label><input type="date" value={returnDate} onChange={e=>setReturnDate(e.target.value)} disabled={trip==="One way"} /></div><div className="field"><label>Travellers</label><select value={travellers} onChange={e=>setTravellers(e.target.value)}>{[1,2,3,4,5,6,7,8,9].map(n=><option key={n} value={n}>{n} traveller{n>1?"s":""}</option>)}</select></div><div className="field"><label>Cabin</label><select value={cabin} onChange={e=>setCabin(e.target.value)}><option value="economy">Economy</option><option value="premium_economy">Premium economy</option><option value="business">Business</option><option value="first">First</option></select></div>
                <button className="searchBtn" onClick={searchFlights} disabled={searching}>{searching?"Searching…":"Search flights"}</button>
              </div>
              {message && <p style={{color:"#123b65",margin:"14px 2px 0",fontSize:13}}>{message}</p>}{offers.length>0&&<div className="liveResults"><h2>Available flights</h2><div className="cards">{offers.map((o:any)=><article className="card flightResult" key={o.id}><strong>{o.owner?.name||o.owner?.iata_code||"Airline"}</strong><div className="routeMeta">{o.slices?.map((s:any)=>s.segments?.map((g:any)=>g.operating_carrier?.name||g.marketing_carrier?.name||"Flight").join(" → ")).join(" · ")}</div><div className="price">{o.total_currency} {o.total_amount}</div><button className="cardAction" onClick={()=>setMessage("Flight selected. Booking will be enabled after payment setup.")}>Select flight <ArrowRight size={15} style={{verticalAlign:"middle"}}/></button></article>)}</div></div>}
            </div>
          </div>
        </section>

        <section className="section" id="manage">
          <div className="container">
            <h2>Popular flight searches</h2>
            <p className="muted">A preview of the comparison experience. Live airline inventory comes next.</p>
            <div className="cards">
              {popular.map((item) => (
                <article className="card" key={item.route}>
                  <div className="route">{item.route}</div>
                  <div className="routeMeta">{item.meta}</div>
                  <div className="price">{item.price}</div>
                  <button className="cardAction" onClick={() => setMessage(`Search selected: ${item.route}`)}>View flights <ArrowRight size={15} style={{verticalAlign:"middle"}} /></button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="why" style={{background:"#fff"}}>
          <div className="container">
            <h2>Everything around your flight, in one place.</h2>
            <p className="muted">Travora is being built flight-first, with booking and reservation management at its core.</p>
            <div className="features">
              <div className="feature"><div className="featureIcon"><Plane size={20}/></div><h3>Compare flights</h3><p>See routes, stops, timings, baggage and fares together instead of jumping between airline sites.</p></div>
              <div className="feature"><div className="featureIcon"><ShieldCheck size={20}/></div><h3>Book with confidence</h3><p>Use airline and travel-partner booking links first, with direct booking integrations designed for later.</p></div>
              <div className="feature"><div className="featureIcon"><CalendarDays size={20}/></div><h3>Manage every reservation</h3><p>Keep your booking reference, itinerary, passenger details and flight updates tied to your account.</p></div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="card" style={{display:"flex",gap:18,alignItems:"center",flexWrap:"wrap"}}>
              <div className="featureIcon"><UserRound size={20}/></div>
              <div style={{flex:1,minWidth:240}}><h3 style={{margin:"0 0 6px"}}>Your account becomes your travel hub.</h3><p className="muted" style={{margin:0}}>Sign in to save passengers, view bookings and manage upcoming flights.</p></div>
              <div style={{display:"flex",gap:8}}><Clock3 size={18}/><CheckCircle2 size={18}/></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">© 2026 Travora · Flight search, booking and reservation management.</div>
      </footer>
    </>
  );
}