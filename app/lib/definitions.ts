/**
 * The full definition of a room that the server returns.
 */
export type Room = {
  roomNumber: number;
  roomType: string;
  hasMinibar: boolean;
  isVacant: boolean;
  bookings: Booking[];
  currentBooking: Booking | null;
};

/**
 * The fields needed to create or update a room.
 */
export type RoomUpsert = Pick<Room, 'roomNumber' | 'roomType' | 'hasMinibar'>;

export type Booking = {
  bookingReference: string;
  guestName: string;
  startDate: string;
  endDate: string;
};

/**
 * Wrapper type for the structure of API responses according to the HATEOAS principle.
 */
export type HATEOAS<T> = T & {
  _links: {
    self: {
      href: string;
    };
    [key: string]: {
      href: string;
    };
  };
};

export type RoomHATEOAS = HATEOAS<Room>;
