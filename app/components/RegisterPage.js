"use client";
import { UserRegisterAction } from "../lib/action";
import { useState } from "react";
import { Abril_Fatface } from "next/font/google";
import { useRouter } from "next/navigation";
const abrilFatface = Abril_Fatface({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-abril-fatface", // Optional: for CSS variable usage
});
export default function RegisterPage({ customers }) {
  //  const customers = await getCustomers();
  const [CustFirstName, setFirstname] = useState("");
  const [CustLastName, setLastname] = useState("");
  const [CustAddress, setAddress] = useState("");
  const [CustCity, setCity] = useState("");
  const [CustProv, setProv] = useState("");
  const [CustPostal, setPostal] = useState("");
  const [CustCountry, setCountry] = useState("");
  const [CustHomePhone, setHomePhone] = useState("");
  const [CustBusPhone, setBusPhone] = useState("");
  const [CustEmail, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const result = await UserRegisterAction(formData);

    if (result.success) {
      setMessage("Registration successful! Redirecting...");
      setTimeout(() => {
        router.push("/login");
      }, 1500); // ✅ delay before redirect
    } else {
      setMessage("Registration failed. Please try again.");
    }
  };

  const patterns = {
    //allows letters (uppercase and lowercase), accents, and hyphens, and requires at least two characters.
    CustFirstName: /^[a-zA-Z\u00C0-\u00FF'-]{2,}$/,
    CustLastName: /^[a-zA-Z\u00C0-\u00FF'-]{2,}$/,
    CustHomePhone: /^(\(?\d{3}\)?[\s\-]?)?\d{3}[\s\-]?\d{4}$/,
    CustBusPhone: /^(\(?\d{3}\)?[\s\-]?)?\d{3}[\s\-]?\d{4}$/,
    CustEmail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    CustAddress: /^[0-9]+\s+[A-Za-z\s]+$/,
    //\d{4}          # Exactly 4 digits
    //[\s\-]?        # Optional space or hyphen
    //  year: /^y[1-4]$/,
    CustPostal: /^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/i,
  };

  const validate = (field, value) => {
    try {
      const trimmed = value?.trim();
      const messages = {
        CustFirstName: "Please enter your first name.",
        CustLastName: "Please enter your last name.",
        CustAddress: "Please enter your address.",
        CustCity: "Please enter your city.",
        CustProv: "Please select your province.",
        CustPostal: "Postal code must follow Canadian format (e.g., T2N 1N4).",
        CustCountry: "Please enter your country.",
        CustHomePhone: "Phone number must be at least 10 digits.",
        CustBusPhone: "Phone number must be at least 10 digits.",
        CustEmail: "Please enter your email (e.g. example@example.com).",
      };

      if (!trimmed) {
        setErrors((prev) => ({
          ...prev,
          [field]: messages[field] || `${field} is required.`,
        }));
      } else if (patterns[field] && !patterns[field].test(trimmed)) {
        setErrors((prev) => ({
          ...prev,
          [field]: messages[field],
        }));
      } else {
        setErrors((prev) => ({ ...prev, [field]: null }));
      }
    } catch (err) {
      console.error(`Validation error for ${field}:`, err);
      setErrors((prev) => ({
        ...prev,
        [field]: `Error validating ${field}`,
      }));
    }
  };

  //   useEffect(() => {
  //     async function WeatherFetching() {
  //       try {
  //         setLoading(true);
  //         setWeatherError(null);
  //         const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  //         const res = await fetch(url);
  //         if (!res.ok) throw new Error(`HTTP ${res.status}`);
  //         const json = await res.json();
  //         setData(json);
  //       } catch (e) {
  //         if (e.name === "AbortError") return;
  //         setWeatherError(e.message);
  //       } finally {
  //         setLoading(false);
  //       }
  //     }

  //     if (city) {
  //       WeatherFetching();
  //     }
  //   }, [city]);

  // Optional: Debug output
  // useEffect(() => {
  //   console.log("Weather data:", data);
  //   console.log("Loading:", loading);
  //   console.log("Error:", weatherError);
  // }, [data, loading, weatherError]);

  return (
    <>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* <h1 className="text-3xl font-bold text-gray-900 mb-6">
          New Customer Registration
        </h1> */}

        <form
          // action={UserRegisterAction}
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow mb-8"
        >
          <h2
            className={`${abrilFatface.className} text-xl font-semibold mb-4 text-secondary`}
          >
            New Customer Registration
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name *
              </label>
              <input
                name="CustFirstName"
                onChange={(e) => {
                  setFirstname(e.target.value);
                  validate("CustFirstName", e.target.value);
                }}
                onBlur={() => validate("CustFirstName", CustFirstName)}
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {errors.CustFirstName && (
                <span className="error">{errors.CustFirstName}</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name *
              </label>
              <input
                onChange={(e) => {
                  setLastname(e.target.value);
                  validate("CustLastName", e.target.value);
                }}
                onBlur={() => validate("CustLastName", CustLastName)}
                name="CustLastName"
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {errors.CustLastName && (
                <span className="error">{errors.CustLastName}</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Home Phone *
              </label>
              <input
                onChange={(e) => {
                  setHomePhone(e.target.value);
                  validate("CustHomePhone", e.target.value);
                }}
                onBlur={() => validate("CustHomePhone", CustHomePhone)}
                name="CustHomePhone"
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {errors.CustHomePhone && (
                <span className="error">{errors.CustHomePhone}</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Phone *
              </label>
              <input
                onChange={(e) => {
                  setBusPhone(e.target.value);
                  validate("CustBusPhone", e.target.value);
                }}
                onBlur={() => validate("CustBusPhone", CustBusPhone)}
                name="CustBusPhone"
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {errors.CustBusPhone && (
                <span className="error">{errors.CustBusPhone}</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                  validate("CustEmail", e.target.value);
                }}
                onBlur={() => validate("CustEmail", CustEmail)}
                name="CustEmail"
                type="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {errors.CustEmail && (
                <span className="error">{errors.CustEmail}</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Street *
              </label>
              <input
                onChange={(e) => {
                  setAddress(e.target.value);
                  validate("CustAddress", e.target.value);
                }}
                onBlur={() => validate("CustAddress", CustAddress)}
                name="CustAddress"
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />{" "}
              {errors.CustAddress && (
                <span className="error">{errors.CustAddress}</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City *
              </label>
              <input
                onChange={(e) => {
                  setCity(e.target.value);
                  validate("CustCity", e.target.value);
                }}
                onBlur={() => validate("CustCity", CustCity)}
                //   value={city}
                name="CustCity"
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />{" "}
              {errors.CustCity && (
                <span className="error">{errors.CustCity}</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Province *
              </label>
              <input
                onChange={(e) => {
                  setProv(e.target.value);
                  validate("CustProv", e.target.value);
                }}
                onBlur={() => validate("CustProv", CustProv)}
                name="CustProv"
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {errors.CustProv && (
                <span className="error">{errors.CustProv}</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country *
              </label>
              <input
                onChange={(e) => {
                  setCountry(e.target.value);
                  validate("CustCountry", e.target.value);
                }}
                onBlur={() => validate("CustCountry", CustCountry)}
                name="CustCountry"
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {errors.CustCountry && (
                <span className="error">{errors.CustCountry}</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Postal Code *
              </label>
              <input
                onChange={(e) => {
                  setPostal(e.target.value);
                  validate("CustPostal", e.target.value);
                }}
                onBlur={() => validate("CustPostal", CustPostal)}
                name="CustPostal"
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {errors.CustPostal && (
                <span className="error">{errors.CustPostal}</span>
              )}
            </div>
          </div>
          <div className="flex justify-end mt-6">
            {message && (
              <div className="mt-4 p-3 bg-green-100 text-green-800 rounded text-center">
                {message}
              </div>
            )}
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Register
            </button>
          </div>
        </form>
        {/* <div>
          {" "}
          {loading && <p>Loading weather...</p>}
          {weatherError && <p>Error: {weatherError}</p>}
          {data && (
            <div>
              <h2>{data.name}</h2>
              <p>{data.weather[0].description}</p>
              <p>Temperature: {data.main.temp}°C</p>
            </div>
          )}
        </div> */}
      </div>
    </>
  );
}
