import {getRequestConfig} from 'next-intl/server'

export default getRequestConfig(async ({locale}) => ({
    messages: 
    {
     ...(await import(`./locales/${locale}/header.json`)).default,
     ...(await import(`./locales/${locale}/footer.json`)).default,
     ...(await import(`./locales/${locale}/contactus.json`)).default,
     ...(await import(`./locales/${locale}/homepage.json`)).default,
     ...(await import(`./locales/${locale}/vacation.json`)).default,
     ...(await import(`./locales/${locale}/vacationbooking.json`)).default
    }

}));