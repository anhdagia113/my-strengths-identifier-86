
import { useState } from "react";
import { Calendar, Clock, Info, Plus, Search, Trash2, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { format, addDays } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Mock data for staff
const staffMembers = [
  { id: "1", name: "Nguyễn Văn A", role: "Chuyên viên spa" },
  { id: "2", name: "Trần Thị B", role: "Chuyên viên spa" },
  { id: "3", name: "Lê Minh C", role: "Bác sĩ da liễu" },
  { id: "4", name: "Phạm Thanh D", role: "Kỹ thuật viên" },
];

// Mock data for schedules
const initialSchedules = [
  {
    id: "1",
    staffId: "1",
    staffName: "Nguyễn Văn A",
    date: new Date(2023, 9, 15),
    timeSlots: ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00"],
    status: "active",
  },
  {
    id: "2",
    staffId: "2",
    staffName: "Trần Thị B",
    date: new Date(2023, 9, 15),
    timeSlots: ["09:00", "10:00", "11:00", "13:00", "14:00"],
    status: "active",
  },
  {
    id: "3",
    staffId: "3",
    staffName: "Lê Minh C",
    date: new Date(2023, 9, 16),
    timeSlots: ["13:00", "14:00", "15:00", "16:00"],
    status: "active",
  },
  {
    id: "4",
    staffId: "1",
    staffName: "Nguyễn Văn A",
    date: new Date(2023, 9, 16),
    timeSlots: ["08:00", "09:00", "10:00", "11:00"],
    status: "active",
  },
];

// Available time slots
const availableTimeSlots = [
  "08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"
];

const AdminSchedule = () => {
  const [schedules, setSchedules] = useState(initialSchedules);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const [filteredStaffId, setFilteredStaffId] = useState<string>("");
  
  // New schedule state
  const [newSchedule, setNewSchedule] = useState({
    staffId: "",
    date: new Date(),
    timeSlots: [] as string[],
  });

  // Handle add schedule
  const handleAddSchedule = () => {
    if (!newSchedule.staffId) {
      toast.error("Vui lòng chọn nhân viên!");
      return;
    }
    
    if (newSchedule.timeSlots.length === 0) {
      toast.error("Vui lòng chọn ít nhất một khung giờ!");
      return;
    }

    // Check if schedule already exists for this staff and date
    const existingScheduleIndex = schedules.findIndex(
      s => s.staffId === newSchedule.staffId && 
      s.date.toDateString() === newSchedule.date.toDateString()
    );

    if (existingScheduleIndex >= 0) {
      // Update existing schedule
      const updatedSchedules = [...schedules];
      updatedSchedules[existingScheduleIndex] = {
        ...updatedSchedules[existingScheduleIndex],
        timeSlots: newSchedule.timeSlots
      };
      setSchedules(updatedSchedules);
      toast.success("Cập nhật lịch làm việc thành công!");
    } else {
      // Add new schedule
      const staffMember = staffMembers.find(s => s.id === newSchedule.staffId);
      const newScheduleItem = {
        id: Date.now().toString(),
        staffId: newSchedule.staffId,
        staffName: staffMember?.name || "",
        date: new Date(newSchedule.date),
        timeSlots: [...newSchedule.timeSlots],
        status: "active"
      };
      setSchedules([...schedules, newScheduleItem]);
      toast.success("Thêm lịch làm việc thành công!");
    }
    
    setIsAddDialogOpen(false);
    resetNewSchedule();
  };

  // Reset new schedule form
  const resetNewSchedule = () => {
    setNewSchedule({
      staffId: "",
      date: new Date(),
      timeSlots: [],
    });
  };

  // Toggle time slot selection
  const toggleTimeSlot = (timeSlot: string) => {
    if (newSchedule.timeSlots.includes(timeSlot)) {
      setNewSchedule({
        ...newSchedule,
        timeSlots: newSchedule.timeSlots.filter(t => t !== timeSlot)
      });
    } else {
      setNewSchedule({
        ...newSchedule,
        timeSlots: [...newSchedule.timeSlots, timeSlot].sort()
      });
    }
  };

  // Get schedules for the selected date
  const getSchedulesForDate = () => {
    return schedules.filter(
      s => s.date.toDateString() === date.toDateString() && 
      (filteredStaffId === "" || s.staffId === filteredStaffId)
    );
  };

  // Delete a schedule
  const deleteSchedule = (scheduleId: string) => {
    setSchedules(schedules.filter(s => s.id !== scheduleId));
    toast.success("Đã xóa lịch làm việc!");
  };

  // Open add schedule dialog
  const openAddDialog = () => {
    resetNewSchedule();
    setIsAddDialogOpen(true);
  };

  // Get staff schedule info
  const getStaffScheduleInfo = (staffId: string, date: Date) => {
    const staffSchedule = schedules.find(
      s => s.staffId === staffId && s.date.toDateString() === date.toDateString()
    );
    return staffSchedule;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Quản lý lịch làm việc</h1>
        <Button onClick={openAddDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Thêm lịch làm việc
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Chọn ngày
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={(date) => date && setDate(date)}
                className="rounded-md border"
                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                initialFocus
              />
              
              <div className="mt-4 space-y-2">
                <Label htmlFor="filter-staff">Lọc theo nhân viên</Label>
                <Select 
                  value={filteredStaffId} 
                  onValueChange={setFilteredStaffId}
                >
                  <SelectTrigger id="filter-staff">
                    <SelectValue placeholder="Tất cả nhân viên" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tất cả nhân viên</SelectItem>
                    {staffMembers.map(staff => (
                      <SelectItem key={staff.id} value={staff.id}>
                        {staff.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <div className="p-4 mt-4 bg-muted rounded-md space-y-2">
                  <h3 className="font-medium flex items-center">
                    <Info className="h-4 w-4 mr-2" />
                    Thông tin lịch làm việc
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Ngày: {format(date, "dd/MM/yyyy")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Số nhân viên làm việc: {getSchedulesForDate().length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Lịch làm việc: {format(date, "dd/MM/yyyy")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {getSchedulesForDate().length > 0 ? (
                <div className="space-y-4">
                  {getSchedulesForDate().map((schedule) => (
                    <div key={schedule.id} className="p-4 border rounded-md">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{schedule.staffName}</div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteSchedule(schedule.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {schedule.timeSlots.map((timeSlot) => (
                          <Badge key={timeSlot} variant="outline" className="px-3 py-1">
                            <Clock className="h-3 w-3 mr-1" />
                            {timeSlot}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Calendar className="h-10 w-10 mx-auto opacity-20 mb-2" />
                  <p>Không có lịch làm việc nào cho ngày này</p>
                  <Button variant="outline" className="mt-4" onClick={openAddDialog}>
                    <Plus className="mr-2 h-4 w-4" />
                    Thêm lịch làm việc
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Schedule Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Thêm lịch làm việc</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="staff">Chọn nhân viên <span className="text-destructive">*</span></Label>
              <Select 
                value={newSchedule.staffId} 
                onValueChange={(value) => setNewSchedule({...newSchedule, staffId: value})}
              >
                <SelectTrigger id="staff">
                  <SelectValue placeholder="Chọn nhân viên" />
                </SelectTrigger>
                <SelectContent>
                  {staffMembers.map(staff => (
                    <SelectItem key={staff.id} value={staff.id}>
                      {staff.name} - {staff.role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Chọn ngày <span className="text-destructive">*</span></Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !newSchedule.date && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {newSchedule.date ? format(newSchedule.date, "PPP") : <span>Chọn ngày</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={newSchedule.date}
                    onSelect={(date) => date && setNewSchedule({...newSchedule, date})}
                    initialFocus
                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Chọn khung giờ làm việc <span className="text-destructive">*</span></Label>
              <div className="grid grid-cols-3 gap-2">
                {availableTimeSlots.map(timeSlot => (
                  <Button
                    key={timeSlot}
                    type="button"
                    variant={newSchedule.timeSlots.includes(timeSlot) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleTimeSlot(timeSlot)}
                  >
                    {timeSlot}
                  </Button>
                ))}
              </div>
              {newSchedule.staffId && newSchedule.date && (
                <>
                  {getStaffScheduleInfo(newSchedule.staffId, newSchedule.date) && (
                    <p className="text-xs text-amber-600 mt-2">
                      <Info className="h-3 w-3 inline mr-1" />
                      Nhân viên này đã có lịch làm việc cho ngày này. Lịch mới sẽ ghi đè lên lịch cũ.
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Hủy
            </Button>
            <Button type="button" onClick={handleAddSchedule}>
              Lưu lịch làm việc
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminSchedule;
