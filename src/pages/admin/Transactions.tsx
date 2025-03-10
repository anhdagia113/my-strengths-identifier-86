
import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useReactToPrint } from 'react-to-print';
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import TransactionService, { Transaction } from "@/api/services/transaction.service";
import TransactionTable from "@/components/admin/transactions/TransactionTable";
import TransactionFilters from "@/components/admin/transactions/TransactionFilters";
import { 
  getStatusText, 
  getStatusColor, 
  applyFilters, 
  exportToExcel, 
  exportToCSV 
} from "@/components/admin/transactions/TransactionUtils";

const AdminTransactions = () => {
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "COMPLETED" | "PENDING" | "FAILED" | "REFUNDED"
  >("all");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  
  const printRef = useRef<HTMLDivElement>(null);

  // Fetch transactions from backend
  const { data: transactions, isLoading, isError, refetch } = useQuery({
    queryKey: ['transactions'],
    queryFn: TransactionService.getAllTransactions
  });

  useEffect(() => {
    if (transactions) {
      setFilteredTransactions(transactions);
    }
  }, [transactions]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    const filtered = applyFilters(transactions, query, statusFilter, dateRange);
    setFilteredTransactions(filtered);
  };

  const handleStatusFilterChange = (value: "all" | "COMPLETED" | "PENDING" | "FAILED" | "REFUNDED") => {
    setStatusFilter(value);
    const filtered = applyFilters(transactions, searchQuery, value, dateRange);
    setFilteredTransactions(filtered);
  };

  const handleDateRangeChange = (range: { from: Date | undefined; to: Date | undefined }) => {
    setDateRange(range);
    const filtered = applyFilters(transactions, searchQuery, statusFilter, range);
    setFilteredTransactions(filtered);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setDateRange({ from: undefined, to: undefined });
    if (transactions) {
      setFilteredTransactions(transactions);
    }
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "Danh sách giao dịch",
    onAfterPrint: () => toast.success("Đã in báo cáo thành công!"),
  });

  const handleExportExcel = () => {
    exportToExcel(filteredTransactions);
  };

  const handleExportCSV = () => {
    exportToCSV(filteredTransactions);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-2">Đang tải dữ liệu...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[400px]">
        <div className="text-red-500 mb-2">Đã xảy ra lỗi khi tải dữ liệu</div>
        <Button onClick={() => refetch()}>Thử lại</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6" ref={printRef}>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Giao dịch</h1>
        <p className="text-muted-foreground">
          Quản lý tất cả các giao dịch của bạn ở đây
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Danh sách giao dịch</CardTitle>
          <CardDescription>
            Xem và quản lý các giao dịch của bạn
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TransactionFilters 
            searchQuery={searchQuery}
            setSearchQuery={handleSearchChange}
            statusFilter={statusFilter}
            setStatusFilter={handleStatusFilterChange}
            dateRange={dateRange}
            handleDateRangeChange={handleDateRangeChange}
            handleClearFilters={handleClearFilters}
            handleExportExcel={handleExportExcel}
            handleExportCSV={handleExportCSV}
            handlePrint={handlePrint}
          />
          
          <TransactionTable 
            transactions={filteredTransactions}
            getStatusText={getStatusText}
            getStatusColor={getStatusColor}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminTransactions;
