export type Room = {
  roomNumber: number;
  roomType: string;
  hasMinibar: boolean;
  vacant: boolean;
  bookings: Booking[];
};

export type Booking = {
  bookingReference: string;
  guestName: string;
  startDate: string;
  endDate: string;
};
