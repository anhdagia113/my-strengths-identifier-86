
import { Transaction } from "@/api/services/transaction.service";
import { toast } from "sonner";
import * as XLSX from 'xlsx';

// Helper functions for transactions
export const getStatusText = (status: string) => {
  switch (status) {
    case "COMPLETED":
      return "Đã hoàn thành";
    case "PENDING":
      return "Đang xử lý";
    case "FAILED":
      return "Thất bại";
    case "REFUNDED":
      return "Hoàn tiền";
    default:
      return status;
  }
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case "COMPLETED":
      return "text-green-500";
    case "PENDING":
      return "text-yellow-500";
    case "FAILED":
      return "text-red-500";
    case "REFUNDED":
      return "text-purple-500";
    default:
      return "";
  }
};

export const applyFilters = (
  transactions: Transaction[] | undefined,
  query: string,
  status: "all" | "COMPLETED" | "PENDING" | "FAILED" | "REFUNDED",
  dates: { from: Date | undefined; to: Date | undefined }
): Transaction[] => {
  if (!transactions) return [];
  
  let filtered = [...transactions];
  
  // Apply search filter
  if (query.trim() !== "") {
    filtered = filtered.filter((transaction) =>
      transaction.description?.toLowerCase().includes(query.toLowerCase()) ||
      transaction.transactionId?.toLowerCase().includes(query.toLowerCase())
    );
  }
  
  // Apply status filter
  if (status !== "all") {
    filtered = filtered.filter((transaction) => transaction.status === status);
  }
  
  // Apply date filter
  if (dates.from) {
    const fromDate = new Date(dates.from);
    fromDate.setHours(0, 0, 0, 0);
    
    const toDate = dates.to ? new Date(dates.to) : new Date(dates.from);
    toDate.setHours(23, 59, 59, 999);
    
    filtered = filtered.filter(transaction => {
      const transactionDate = new Date(transaction.paymentDate);
      return transactionDate >= fromDate && transactionDate <= toDate;
    });
  }
  
  return filtered;
};

export const exportToExcel = (transactions: Transaction[]) => {
  const wb = XLSX.utils.book_new();
  
  // Format data for export
  const formattedData = transactions.map(tx => ({
    'Mã giao dịch': tx.transactionId,
    'Ngày': format(new Date(tx.paymentDate), "dd/MM/yyyy"),
    'Mô tả': tx.description,
    'Số tiền': tx.amount,
    'Trạng thái': getStatusText(tx.status),
    'Phương thức': tx.paymentMethod
  }));
  
  const ws = XLSX.utils.json_to_sheet(formattedData);
  XLSX.utils.book_append_sheet(wb, ws, "Transactions");
  XLSX.writeFile(wb, "transactions.xlsx");
  toast.success("Đã xuất file Excel thành công!");
};

export const exportToCSV = (transactions: Transaction[]) => {
  // Format data for export
  const formattedData = transactions.map(tx => ({
    'Mã giao dịch': tx.transactionId,
    'Ngày': format(new Date(tx.paymentDate), "dd/MM/yyyy"),
    'Mô tả': tx.description,
    'Số tiền': tx.amount,
    'Trạng thái': getStatusText(tx.status),
    'Phương thức': tx.paymentMethod
  }));
  
  const ws = XLSX.utils.json_to_sheet(formattedData);
  const csv = XLSX.utils.sheet_to_csv(ws);
  
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  
  link.setAttribute("href", url);
  link.setAttribute("download", "transactions.csv");
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  toast.success("Đã xuất file CSV thành công!");
};

// Helper to format dates in exports
const format = (date: Date, formatStr: string) => {
  return new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(date);
};
