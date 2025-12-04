'use client'
import {createContext, useContext, useState, useEffect} from "react"

const LanguageContext = createContext({
    locale:'en', 
    setLocale: () => {},
    t: (key) => key
});

export function LanguageProvider({children}){
    const [locale, setLocale] = useState("en");
    const [translation, setTranslation]=useState({});
    useEffect (() =>{
    
        //load the translation base on the current locale
        //import (`\/locales/${locale}/header.json`)
       
      Promise.all([
  import(`../locales/${locale}/header.json`).then(m => ({ prefix: "header", data: m.default })),
  import(`../locales/${locale}/footer.json`).then(m => ({ prefix: "footer", data: m.default })),
  import(`../locales/${locale}/homepage.json`).then(m => ({ prefix: "homepage", data: m.default })),
  import(`../locales/${locale}/contactus.json`).then(m => ({ prefix: "contactus", data: m.default })),
  import(`../locales/${locale}/vacation.json`).then(m => ({ prefix: "vacation", data: m.default })),
  import(`../locales/${locale}/vacationbooking.json`).then(m => ({ prefix: "vacationbooking", data: m.default }))
])
  .then((files) => {
    const merged = {};

    // Flatten & prefix keys like header.loading, footer.about etc.
    files.forEach(({ prefix, data }) => {
      Object.entries(data).forEach(([key, value]) => {
        merged[`${prefix}.${key}`] = value;
      });
    });

    setTranslation(merged);
  })
  .catch(err => console.error("Failed to translate:", err));

        

    }, [locale]);
    const t = (key) => translation[key] || key;

    return (
        <LanguageContext.Provider value={{locale, setLocale, t}}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
  return useContext(LanguageContext);
}