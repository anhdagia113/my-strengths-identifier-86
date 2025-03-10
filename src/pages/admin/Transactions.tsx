
import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Calendar, FileDown, FileText } from "lucide-react";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useReactToPrint } from 'react-to-print';
import * as XLSX from 'xlsx';
import { toast } from "sonner";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface Transaction {
  id: number;
  transactionId: string;
  amount: number;
  paymentDate: string;
  status: "COMPLETED" | "PENDING" | "FAILED" | "REFUNDED";
  paymentMethod: string;
  description: string;
}

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
  const { data: transactions, isLoading, isError } = useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const response = await axios.get<Transaction[]>('/api/payments');
      return response.data;
    }
  });

  useEffect(() => {
    if (transactions) {
      setFilteredTransactions(transactions);
    }
  }, [transactions]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    applyFilters(query, statusFilter, dateRange);
  };

  const handleStatusFilterChange = (value: "all" | "COMPLETED" | "PENDING" | "FAILED" | "REFUNDED") => {
    setStatusFilter(value);
    applyFilters(searchQuery, value, dateRange);
  };

  const handleDateRangeChange = (range: { from: Date | undefined; to: Date | undefined }) => {
    setDateRange(range);
    applyFilters(searchQuery, statusFilter, range);
  };

  const applyFilters = (
    query: string, 
    status: "all" | "COMPLETED" | "PENDING" | "FAILED" | "REFUNDED",
    dates: { from: Date | undefined; to: Date | undefined }
  ) => {
    if (!transactions) return;
    
    let filtered = [...transactions];
    
    // Apply search filter
    if (query.trim() !== "") {
      filtered = filtered.filter((transaction) =>
        transaction.description.toLowerCase().includes(query.toLowerCase()) ||
        transaction.transactionId.toLowerCase().includes(query.toLowerCase())
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
    
    setFilteredTransactions(filtered);
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const handleExportExcel = () => {
    const wb = XLSX.utils.book_new();
    
    // Format data for export
    const formattedData = filteredTransactions.map(tx => ({
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

  const handleExportCSV = () => {
    // Format data for export
    const formattedData = filteredTransactions.map(tx => ({
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

  const getStatusText = (status: string) => {
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

  const getStatusColor = (status: string) => {
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

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-[400px]">Đang tải dữ liệu...</div>;
  }

  if (isError) {
    return <div className="flex justify-center items-center min-h-[400px]">Đã xảy ra lỗi khi tải dữ liệu</div>;
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
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm..."
                className="pl-8"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="COMPLETED">Đã hoàn thành</SelectItem>
                <SelectItem value="PENDING">Đang xử lý</SelectItem>
                <SelectItem value="FAILED">Thất bại</SelectItem>
                <SelectItem value="REFUNDED">Hoàn tiền</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex flex-col w-full sm:w-auto">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {dateRange.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "dd/MM/yyyy")} -{" "}
                          {format(dateRange.to, "dd/MM/yyyy")}
                        </>
                      ) : (
                        format(dateRange.from, "dd/MM/yyyy")
                      )
                    ) : (
                      <span>Chọn khoảng thời gian</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    initialFocus
                    mode="range"
                    defaultMonth={new Date()}
                    selected={dateRange}
                    onSelect={handleDateRangeChange}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <Button onClick={handleExportExcel}>
              <FileDown className="mr-2 h-4 w-4" />
              Xuất Excel
            </Button>
            <Button onClick={handleExportCSV}>
              <FileText className="mr-2 h-4 w-4" />
              Xuất CSV
            </Button>
            <Button onClick={handlePrint}>
              In báo cáo
            </Button>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã giao dịch</TableHead>
                  <TableHead>Ngày</TableHead>
                  <TableHead>Mô tả</TableHead>
                  <TableHead>Số tiền</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Phương thức</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.transactionId}</TableCell>
                      <TableCell>{format(new Date(transaction.paymentDate), "dd/MM/yyyy")}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>{transaction.amount.toLocaleString()} VNĐ</TableCell>
                      <TableCell>
                        <span className={getStatusColor(transaction.status)}>
                          {getStatusText(transaction.status)}
                        </span>
                      </TableCell>
                      <TableCell>{transaction.paymentMethod}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6">
                      Không có dữ liệu giao dịch phù hợp với bộ lọc
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminTransactions;
