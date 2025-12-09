"use client"

import { useLanguage } from "../context/languagecontext"

export default function LanguageSwitcher(){
    const {locale, setLocale} = useLanguage();
    
    return(
     <div className="d-flex gap-2 justify-content-end text-secondary" >
    <button onClick={()=> setLocale("es")}>ES</button>
     <button onClick={()=> setLocale("en")}>EN</button>
     </div>
    )
}