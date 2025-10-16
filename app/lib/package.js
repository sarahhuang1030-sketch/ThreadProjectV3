// lib/package.js
import db from "./database.js";

// 获取所有有效套餐（未过期）
export async function getAllpackageDetails() {
  try {
    const [packages] = await db.query(
      "SELECT * FROM packages WHERE PkgEndDate >= CURRENT_DATE"
    );
    return packages || []; // 确保返回数组
  } catch (error) {
    console.error("Error fetching packages:", error);
    return [];
  }
}

// 获取所有过期套餐（移除 id 参数）
export async function getExpiredPackages() {
  try {
    const [packages] = await db.query(
      "SELECT * FROM packages WHERE PkgStartDate <= CURRENT_DATE"
    );
    return packages || [];
  } catch (error) {
    console.error("Error fetching expired packages:", error);
    return [];
  }
}
