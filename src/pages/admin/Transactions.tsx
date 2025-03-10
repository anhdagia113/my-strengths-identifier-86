
import { useState, useRef } from "react";
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

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: "completed" | "pending" | "failed";
}

const initialTransactions: Transaction[] = [
  {
    id: "1",
    date: "2024-01-01",
    description: "Dịch vụ Chăm sóc da mặt",
    amount: 500000,
    status: "completed",
  },
  {
    id: "2",
    date: "2024-01-05",
    description: "Gội đầu và massage",
    amount: 200000,
    status: "completed",
  },
  {
    id: "3",
    date: "2024-01-10",
    description: "Uốn tóc",
    amount: 800000,
    status: "pending",
  },
  {
    id: "4",
    date: "2024-01-15",
    description: "Nhuộm tóc",
    amount: 700000,
    status: "completed",
  },
  {
    id: "5",
    date: "2024-01-20",
    description: "Cắt tóc",
    amount: 150000,
    status: "completed",
  },
  {
    id: "6",
    date: "2024-01-25",
    description: "Làm móng",
    amount: 300000,
    status: "failed",
  },
];

const AdminTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(
    initialTransactions
  );
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >(transactions);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "completed" | "pending" | "failed"
  >("all");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  
  const printRef = useRef<HTMLDivElement>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredTransactions(transactions);
    } else {
      const filtered = transactions.filter((transaction) =>
        transaction.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredTransactions(filtered);
    }
  };

  const handleStatusFilterChange = (value: "all" | "completed" | "pending" | "failed") => {
    setStatusFilter(value);

    let filtered = [...transactions];

    if (value !== "all") {
      filtered = filtered.filter((transaction) => transaction.status === value);
    }

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((transaction) =>
        transaction.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (dateRange.from) {
      filtered = filtered.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        const afterStartDate = dateRange.from ? transactionDate >= dateRange.from : true;
        const beforeEndDate = dateRange.to ? transactionDate <= dateRange.to : true;
        return afterStartDate && beforeEndDate;
      });
    }

    setFilteredTransactions(filtered);
  };

  const handleDateRangeChange = (range: { from: Date | undefined; to: Date | undefined }) => {
    setDateRange(range);
    
    if (range.from) {
      let filtered = [...transactions];
      
      filtered = filtered.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        
        const afterStartDate = range.from ? transactionDate >= range.from : true;
        
        const beforeEndDate = range.to ? transactionDate <= range.to : true;
        
        return afterStartDate && beforeEndDate;
      });
      
      if (statusFilter !== "all") {
        filtered = filtered.filter((transaction) => transaction.status === statusFilter);
      }
  
      if (searchQuery.trim() !== "") {
        filtered = filtered.filter((transaction) =>
          transaction.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      setFilteredTransactions(filtered);
    } else {
      setFilteredTransactions(transactions);
    }
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const handleExportExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(filteredTransactions);
    XLSX.utils.book_append_sheet(wb, ws, "Transactions");
    XLSX.writeFile(wb, "transactions.xlsx");
    toast.success("Đã xuất file Excel thành công!");
  };

  const handleExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += [
      Object.keys(filteredTransactions[0]).join(","),
      ...filteredTransactions.map((item) => Object.values(item).join(",")),
    ].join("\r\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
    toast.success("Đã xuất file CSV thành công!");
  };

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
                <SelectItem value="completed">Đã hoàn thành</SelectItem>
                <SelectItem value="pending">Đang xử lý</SelectItem>
                <SelectItem value="failed">Thất bại</SelectItem>
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
                  <TableHead>Ngày</TableHead>
                  <TableHead>Mô tả</TableHead>
                  <TableHead>Số tiền</TableHead>
                  <TableHead>Trạng thái</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{format(new Date(transaction.date), "dd/MM/yyyy")}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>{transaction.amount.toLocaleString()} VNĐ</TableCell>
                    <TableCell>
                      {transaction.status === "completed" ? (
                        <span className="text-green-500">Đã hoàn thành</span>
                      ) : transaction.status === "pending" ? (
                        <span className="text-yellow-500">Đang xử lý</span>
                      ) : (
                        <span className="text-red-500">Thất bại</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminTransactions;
