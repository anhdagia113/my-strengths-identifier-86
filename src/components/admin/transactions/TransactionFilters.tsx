
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Search, Calendar, FileDown, FileText } from "lucide-react";
import { format } from "date-fns";

interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

interface TransactionFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: "all" | "COMPLETED" | "PENDING" | "FAILED" | "REFUNDED";
  setStatusFilter: (status: "all" | "COMPLETED" | "PENDING" | "FAILED" | "REFUNDED") => void;
  dateRange: DateRange;
  handleDateRangeChange: (range: DateRange) => void;
  handleClearFilters: () => void;
  handleExportExcel: () => void;
  handleExportCSV: () => void;
  handlePrint: () => void;
}

const TransactionFilters = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  dateRange,
  handleDateRangeChange,
  handleClearFilters,
  handleExportExcel,
  handleExportCSV,
  handlePrint
}: TransactionFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Tìm kiếm..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Select value={statusFilter} onValueChange={setStatusFilter}>
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
      <Button onClick={handleClearFilters} variant="outline">
        Xóa bộ lọc
      </Button>
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
  );
};

export default TransactionFilters;
