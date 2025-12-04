"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "@/app/context/usercontext";

export default function BookingPage() {
  const { user, loading } = useUser();
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
  const searchParams = useSearchParams();

  // Package parameters from URL
  const packageId = searchParams.get("packageId");
  const price = searchParams.get("price");
  const pkgName = searchParams.get("name");

  // Package details state
  const [packageDetails, setPackageDetails] = useState({
    PackageId: packageId,
    PkgName: pkgName || "Loading...",
    PkgBasePrice: parseInt(price),
    PkgStartDate: null,
    PkgEndDate: null,
  });

  // 主旅行者状态
  const [primaryTraveler, setPrimaryTraveler] = useState({
    CustFirstName: "",
    CustLastName: "",
    CustEmail: "",
    CustHomePhone: "",
    CustAddress: "",
    CustCity: "",
    CustProv: "",
    CustPostal: "",
    CustCountry: "",
  });

  // 附加旅行者状态
  const [additionalTravelers, setAdditionalTravelers] = useState([]);

  // 预订信息状态
  const [bookingInfo, setBookingInfo] = useState({
    TripStart: "",
    TripEnd: "",
    PackageId: packageId,
  });

  // UI states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const isFormValid = () => {
    const requiredFields = [
      "CustFirstName",
      "CustLastName",
      "CustAddress",
      "CustCity",
      "CustProv",
      "CustPostal",
      "CustCountry",
      "CustHomePhone",
      "CustEmail",
    ];

    return requiredFields.every((field) => {
      const value = primaryTraveler[field]?.trim();
      return value && !errors[field];
    });
  };

  // 获取套餐详情
  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        // 模拟API响应
        const mockData = {
          PackageId: packageId,
          PkgName: pkgName || "Summer Vacation Package",
          PkgBasePrice: parseInt(price),
          PkgStartDate: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
          ).toISOString(), // 7天后
          PkgEndDate: new Date(
            Date.now() + 14 * 24 * 60 * 60 * 1000
          ).toISOString(), // 14天后
        };

        setPackageDetails({
          ...mockData,
          PkgStartDate: new Date(mockData.PkgStartDate),
          PkgEndDate: new Date(mockData.PkgEndDate),
        });

        // 设置默认旅行日期
        setBookingInfo((prev) => ({
          ...prev,
          TripStart: new Date(mockData.PkgStartDate)
            .toISOString()
            .split("T")[0],
          TripEnd: new Date(mockData.PkgEndDate).toISOString().split("T")[0],
        }));
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load package details. Please try again later.");
      }
    };

    fetchPackageDetails();
  }, [packageId, price, pkgName]);

  //getting information from our context
  useEffect(() => {
    if (user) {
      setPrimaryTraveler({
        CustFirstName: user.CustFirstName || "",
        CustLastName: user.CustLastName || "",
        CustEmail: user.CustEmail || "",
        CustHomePhone: user.CustHomePhone || "",
        CustAddress: user.CustAddress || "",
        CustCity: user.CustCity || "",
        CustProv: user.CustProv || "",
        CustPostal: user.CustPostal || "",
        CustCountry: user.CustCountry || "",
      });
    }
  }, [user]);

  const patterns = {
    //allows letters (uppercase and lowercase), accents, and hyphens, and requires at least two characters.
    CustFirstName: /^[a-zA-Z\u00C0-\u00FF'-]{2,}$/,
    CustLastName: /^[a-zA-Z\u00C0-\u00FF'-]{2,}$/,
    CustHomePhone: /^(\(?\d{3}\)?[\s\-]?)?\d{3}[\s\-]?\d{4}$/,
    // CustBusPhone: /^(\(?\d{3}\)?[\s\-]?)?\d{3}[\s\-]?\d{4}$/,
    CustEmail: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
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
        //  CustBusPhone: "Phone number must be at least 10 digits.",
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

  // 验证必要参数是否存在
  if (!packageId || !price) {
    return (
      <div className="mx-auto max-w-4xl p-6 text-center text-red-600">
        <h1 className="mb-4 text-2xl font-bold">Invalid Booking Request</h1>
        <p className="mb-4">
          Missing required package information. Please return to the packages
          page and try again.
        </p>
        <Link
          href="/vacation-package"
          className="rounded bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700"
        >
          Return to Packages
        </Link>
      </div>
    );
  }

  // 添加旅行者
  const addTraveler = () => {
    setAdditionalTravelers([
      ...additionalTravelers,
      {
        CustFirstName: "",
        CustLastName: "",
        CustEmail: "",
        CustHomePhone: "",
      },
    ]);
  };

  // 移除旅行者
  const removeTraveler = (index) => {
    setAdditionalTravelers(additionalTravelers.filter((_, i) => i !== index));
  };

  // 处理主旅行者信息变化
  const handlePrimaryTravelerChange = (e) => {
    const { name, value } = e.target;
    setPrimaryTraveler((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 处理附加旅行者信息变化
  const handleAdditionalTravelerChange = (index, field, value) => {
    const updatedTravelers = [...additionalTravelers];
    updatedTravelers[index] = { ...updatedTravelers[index], [field]: value };
    setAdditionalTravelers(updatedTravelers);
  };

  // 处理预订信息变化
  const handleBookingInfoChange = (e) => {
    const { name, value } = e.target;
    setBookingInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 格式化日期显示
  const formatDate = (date) => {
    if (!date) return "Not specified";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // 处理表单提交
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // 验证主旅行者信息
      if (
        !primaryTraveler.CustFirstName ||
        !primaryTraveler.CustLastName ||
        !primaryTraveler.CustEmail
      ) {
        throw new Error(
          "Please fill in all required primary traveler information"
        );
      }

      // 验证附加旅行者
      const invalidTraveler = additionalTravelers.find(
        (traveler) =>
          !traveler.CustFirstName ||
          !traveler.CustLastName ||
          !traveler.CustEmail
      );

      if (invalidTraveler) {
        throw new Error("Please fill in all required traveler information");
      }

      // 验证旅行日期
      if (!bookingInfo.TripStart || !bookingInfo.TripEnd) {
        throw new Error("Please select valid travel dates");
      }

      // 计算总价
      const totalPrice =
        packageDetails.PkgBasePrice * (additionalTravelers.length + 1);

      // 构建预订数据
      const bookingData = {
        primaryTraveler: {
          ...primaryTraveler,
          CustBusPhone: primaryTraveler.CustBusPhone || "",
          CustomerId: Math.floor(Math.random() * 10000), // 临时ID
          PackageId: packageDetails.PackageId,
          CustProv: primaryTraveler.CustProv.slice(0, 2).toUpperCase() || "NA",

          BasePrice: packageDetails.PkgBasePrice,
        },
        additionalTravelers,
        packageId: packageDetails.PackageId,
        totalPrice,
        travelDates: {
          start: bookingInfo.TripStart,
          end: bookingInfo.TripEnd,
        },
      };

      console.log("Booking Data:", bookingData);

      // 这里应该是实际的API调用
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.error || "Booking failed");
      }

      // 模拟成功提交
      setTimeout(() => {
        setSuccess(true);
        setIsSubmitting(false);
      }, 1000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred during booking"
      );
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="mx-auto max-w-4xl rounded-lg border border-green-400 bg-green-100 p-6 text-green-700">
        <h2 className="mb-4 text-2xl font-bold">Booking Successful!</h2>
        <p className="mb-4">
          Your booking has been confirmed. We will contact you shortly with more
          details.
        </p>
        <Link
          href="/"
          className="inline-block rounded bg-green-600 px-6 py-2 text-white hover:bg-green-700"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h1 className="mb-6 text-3xl font-bold">
          Booking: {packageDetails.PkgName}
        </h1>

        {/* 套餐详情 */}
        <div className="rounded-lg bg-gray-50 p-6">
          <h2 className="mb-4 text-xl font-semibold">Package Details</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Package Name
              </label>
              <p className="mt-1 block w-full rounded-md border-gray-300 bg-white p-2 shadow-sm">
                {packageDetails.PkgName}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Price per Person</p>
              <p className="font-medium text-green-600">
                ${packageDetails.PkgBasePrice.toLocaleString()}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <p className="mt-1 block w-full rounded-md border-gray-300 bg-white p-2 shadow-sm">
                {formatDate(packageDetails.PkgStartDate)}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <p className="mt-1 block w-full rounded-md border-gray-300 bg-white p-2 shadow-sm">
                {formatDate(packageDetails.PkgEndDate)}
              </p>
            </div>
          </div>
        </div>

        {/* 主旅行者信息 */}
        <div className="rounded-lg bg-gray-50 p-6">
          <h2 className="mb-4 text-xl font-semibold">Primary Traveler *</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name *
              </label>
              <input
                type="text"
                name="CustFirstName"
                value={primaryTraveler.CustFirstName}
                //  onChange={handlePrimaryTravelerChange}
                onChange={(e) => {
                  handlePrimaryTravelerChange(e);

                  setFirstname(e.target.value);
                  validate("CustFirstName", e.target.value);
                }}
                onBlur={() =>
                  validate("CustFirstName", primaryTraveler.CustFirstName)
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
              {errors?.CustFirstName && (
                <span className="error text-red-600">
                  {errors.CustFirstName}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name *
              </label>
              <input
                type="text"
                name="CustLastName"
                value={primaryTraveler.CustLastName}
                //  onChange={handlePrimaryTravelerChange}
                onChange={(e) => {
                  handlePrimaryTravelerChange(e);
                  setLastname(e.target.value);
                  validate("CustLastName", e.target.value);
                }}
                onBlur={() =>
                  validate("CustLastName", primaryTraveler.CustLastName)
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
              {errors?.CustLastName && (
                <span className="error text-red-600">
                  {errors.CustLastName}
                </span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email *
              </label>
              <input
                type="email"
                name="CustEmail"
                value={primaryTraveler.CustEmail}
                //  onChange={handlePrimaryTravelerChange}
                onChange={(e) => {
                  handlePrimaryTravelerChange(e);
                  setEmail(e.target.value);
                  validate("CustEmail", e.target.value);
                }}
                onBlur={() => validate("CustEmail", primaryTraveler.CustEmail)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
              {errors?.CustEmail && (
                <span className="error text-red-600">{errors.CustEmail}</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone *
              </label>
              <input
                type="tel"
                name="CustHomePhone"
                value={primaryTraveler.CustHomePhone}
                // onChange={handlePrimaryTravelerChange}
                onChange={(e) => {
                  handlePrimaryTravelerChange(e);
                  setHomePhone(e.target.value);
                  validate("CustHomePhone", e.target.value);
                }}
                onBlur={() =>
                  validate("CustHomePhone", primaryTraveler.CustHomePhone)
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
              {errors?.CustHomePhone && (
                <span className="error text-red-600">
                  {errors.CustHomePhone}
                </span>
              )}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                name="CustAddress"
                value={primaryTraveler.CustAddress}
                //   onChange={handlePrimaryTravelerChange}
                onChange={(e) => {
                  handlePrimaryTravelerChange(e);
                  setAddress(e.target.value);
                  validate("CustAddress", e.target.value);
                }}
                onBlur={() =>
                  validate("CustAddress", primaryTraveler.CustAddress)
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {errors?.CustAddress && (
                <span className="error text-red-600">{errors.CustAddress}</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                name="CustCity"
                value={primaryTraveler.CustCity}
                //  onChange={handlePrimaryTravelerChange}
                onChange={(e) => {
                  handlePrimaryTravelerChange(e);
                  setCity(e.target.value);
                  validate("CustCity", e.target.value);
                }}
                onBlur={() => validate("CustCity", primaryTraveler.CustCity)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {errors?.CustCity && (
                <span className="error text-red-600">{errors.CustCity}</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Province/State
              </label>
              <select
                type="text"
                name="CustProv"
                value={primaryTraveler.CustProv}
                //  onChange={handlePrimaryTravelerChange}
                onChange={(e) => {
                  handlePrimaryTravelerChange(e);
                  setProv(e.target.value);
                  validate("CustProv", e.target.value);
                }}
                onBlur={() => validate("CustProv", primaryTraveler.CustProv)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                style={{ height: "46px" }}
              >
                <option value="">Select Province</option>
                <option value="AB">Alberta</option>
                <option value="BC">British Columbia</option>
                <option value="ON">Ontario</option>
                <option value="QC">Quebec</option>
                <option value="MB">Manitoba</option>
                {/* Add others as needed */}
              </select>
              {errors?.CustProv && (
                <span className="error text-red-600">{errors.CustProv}</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Postal Code
              </label>
              <input
                type="text"
                name="CustPostal"
                value={primaryTraveler.CustPostal}
                //  onChange={handlePrimaryTravelerChange}
                onChange={(e) => {
                  handlePrimaryTravelerChange(e);
                  setPostal(e.target.value);
                  validate("CustPostal", e.target.value);
                }}
                onBlur={() =>
                  validate("CustPostal", primaryTraveler.CustPostal)
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {errors?.CustPostal && (
                <span className="error text-red-600">{errors.CustPostal}</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <input
                type="text"
                name="CustCountry"
                value={primaryTraveler.CustCountry}
                // onChange={handlePrimaryTravelerChange}
                onChange={(e) => {
                  handlePrimaryTravelerChange(e);
                  setCountry(e.target.value);
                  validate("CustCountry", e.target.value);
                }}
                onBlur={() =>
                  validate("CustCountry", primaryTraveler.CustCountry)
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {errors?.CustCountry && (
                <span className="error text-red-600">{errors.CustCountry}</span>
              )}
            </div>
          </div>
        </div>

        {/* 附加旅行者 */}
        <div className="rounded-lg bg-gray-50 p-6">
          <h2 className="mb-4 text-xl font-semibold">
            Future Feature...Additional Travelers
          </h2>
          <p className="mb-4 text-gray-600">
            Add additional travelers sharing this booking. Each traveler will be
            charged the full package price.
          </p>

          {additionalTravelers.map((traveler, index) => (
            <div
              key={index}
              className="mb-4 rounded-lg border border-gray-200 bg-white p-4"
            >
              <div className="mb-4 flex items-center justify-between">
                <h4 className="font-medium">Traveler {index + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeTraveler(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={traveler.CustFirstName}
                    onChange={(e) =>
                      handleAdditionalTravelerChange(
                        index,
                        "CustFirstName",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={traveler.CustLastName}
                    onChange={(e) =>
                      handleAdditionalTravelerChange(
                        index,
                        "CustLastName",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={traveler.CustEmail}
                    onChange={(e) =>
                      handleAdditionalTravelerChange(
                        index,
                        "CustEmail",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={traveler.CustHomePhone}
                    onChange={(e) =>
                      handleAdditionalTravelerChange(
                        index,
                        "CustHomePhone",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addTraveler}
            className="mt-4 rounded bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700"
          >
            Add Another Traveler
          </button>
        </div>

        {/* 错误信息 */}
        {error && (
          <div className="rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
            {error}
          </div>
        )}

        {/* 总价 */}
        <div className="rounded-lg bg-gray-50 p-6 text-right">
          <h2 className="text-xl font-semibold">
            Total Price: $
            {(
              packageDetails.PkgBasePrice *
              (additionalTravelers.length + 1)
            ).toLocaleString()}
          </h2>
          <p className="text-gray-600">
            {additionalTravelers.length + 1} traveler(s) at $
            {packageDetails.PkgBasePrice.toLocaleString()} each
          </p>
        </div>

        {/* 表单操作 */}
        <div className="flex justify-between">
          <Link
            href="/vacation-package"
            className="rounded bg-gray-300 px-6 py-2 text-gray-800 hover:bg-gray-400"
          >
            Back to Packages
          </Link>
          <button
            type="submit"
            disabled={isSubmitting || !isFormValid()}
            className="disabled:opacity-50 rounded bg-indigo-600 px-8 py-2 text-white hover:bg-indigo-700"
          >
            {isSubmitting ? "Processing..." : "Confirm Booking"}
          </button>
        </div>
      </form>
    </div>
  );
}
