"use client"

import { useLanguage } from "../context/languagecontext"

export default function LanguageSwitcher(){
    const {locale, setLocale} = useLanguage();
    
    return(
     <div className="d-flex gap-2">
    <button onClick={()=> setLocale("es")}>ES</button>
     <button onClick={()=> setLocale("en")}>EN</button>
     </div>
    )
}