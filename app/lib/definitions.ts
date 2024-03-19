export type Room = {
  roomNumber: number;
  roomType: string;
  hasMinibar: boolean;
  vacant: boolean;
  bookings: Booking[];
  currentBooking: Booking | null;
};

export type Booking = {
  bookingReference: string;
  guestName: string;
  startDate: string;
  endDate: string;
};
