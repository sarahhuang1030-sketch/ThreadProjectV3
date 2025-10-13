"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 从查询参数中获取 packageId 和 price
  const packageId = searchParams.get("packageId");
  const price = searchParams.get("price");
  const pkgName = searchParams.get("name");

  // 模拟从 API 获取套餐详情（实际项目中替换为真实 API 调用）
  const [packageDetails, setPackageDetails] = useState({
    PackageId: packageId || "",
    PkgName: pkgName || "LOADING...",
    PkgBasePrice: price ? parseInt(price) : 0,
  });

  const [formData, setFormData] = useState({
    CustomerId: Math.floor(Math.random() * 10000),
    CustFirstName: "",
    CustLastName: "",
    CustEmail: "",
    CustPhone: "",
    CustAddress: "",
    CustCity: "",
    CustProv: "",
    CustPostal: "",
    CustCountry: "",
    TripStart: "",
    TripEnd: "",
    Description: "",
    Destination: "",
    BasePrice: price ? parseInt(price) : 0,
    PackageId: packageId || "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // 模拟 API 调用获取套餐详情
  useEffect(() => {
    if (!packageId) return;

    // 替换为实际 API 调用
    const fetchPackageDetails = async () => {
      try {
        // 示例：模拟 API 延迟
        await new Promise((resolve) => setTimeout(resolve, 500));
        setPackageDetails({
          PackageId: packageId,
          PkgName: pkgName || "Summer Vacation Package", // 使用从参数传递的名称
          PkgBasePrice: price ? parseInt(price) : 1999, // 使用从参数传递的价格
        });
      } catch (err) {
        setError("Failed to load package details.");
      }
    };

    fetchPackageDetails();
  }, [packageId, price, pkgName]);

  // 更新表单数据
  useEffect(() => {
    if (packageDetails.PkgBasePrice > 0) {
      setFormData((prev) => ({
        ...prev,
        PackageId: packageId || "",
        BasePrice: packageDetails.PkgBasePrice,
      }));
    }
  }, [packageDetails.PkgBasePrice, packageId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (
        !formData.CustFirstName ||
        !formData.CustLastName ||
        !formData.CustEmail
      ) {
        throw new Error("Please fill in your name and email.");
      }

      // 替换为实际 API 调用
      console.log("Submit booking data:", formData);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 模拟提交延迟

      setSuccess(true);

      setTimeout(() => {
        router.push(`/booking/thank-you?packageId=${packageId}`);
      }, 2000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred during booking."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <div className="text-green-500 text-5xl mb-4">✓</div>
          <h2 className="text-2xl font-bold mb-4">Booking successful!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your reservation, we are processing your request.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Booking {packageDetails.PkgName}
          </h1>

          <div className="mb-8 p-4 bg-blue-50 rounded-lg">
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              Package information
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Package ID</p>
                <p className="font-medium">
                  {packageDetails.PackageId || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Price</p>
                <p className="font-medium text-green-600">
                  ¥{packageDetails.PkgBasePrice.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="CustFirstName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  First name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="CustFirstName"
                  name="CustFirstName"
                  value={formData.CustFirstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="CustLastName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Last name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="CustLastName"
                  name="CustLastName"
                  value={formData.CustLastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="CustEmail"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="CustEmail"
                  name="CustEmail"
                  value={formData.CustEmail}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="CustPhone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="CustPhone"
                  name="CustPhone"
                  value={formData.CustPhone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="CustAddress"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="CustAddress"
                  name="CustAddress"
                  value={formData.CustAddress}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="CustCity"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  City
                </label>
                <input
                  type="text"
                  id="CustCity"
                  name="CustCity"
                  value={formData.CustCity}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="CustProv"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Province
                </label>
                <input
                  type="text"
                  id="CustProv"
                  name="CustProv"
                  value={formData.CustProv}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="CustPostal"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Postal code
                </label>
                <input
                  type="text"
                  id="CustPostal"
                  name="CustPostal"
                  value={formData.CustPostal}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="CustCountry"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Country
                </label>
                <input
                  type="text"
                  id="CustCountry"
                  name="CustCountry"
                  value={formData.CustCountry}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => router.back()}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors"
              >
                Back
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors ${
                  isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Processing..." : "Submit booking"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
