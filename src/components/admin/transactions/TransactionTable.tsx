
import { Transaction } from "@/api/services/transaction.service";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

interface TransactionTableProps {
  transactions: Transaction[];
  getStatusText: (status: string) => string;
  getStatusColor: (status: string) => string;
}

const TransactionTable = ({ 
  transactions, 
  getStatusText, 
  getStatusColor 
}: TransactionTableProps) => {
  return (
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
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
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
  );
};

export default TransactionTable;
