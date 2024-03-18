'use server';

import Axios from 'axios';
import { Room } from './definitions';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// This is temporary until @types/react-dom is updated
export type State = {
  errors?: {
    roomNumber?: string[];
    roomType?: string[];
  };
  message?: string | null;
};

const BASE_URL = 'http://localhost:8080';

const RoomFormSchema = z.object({
  roomNumber: z.coerce
    .number({
      invalid_type_error: 'Bitte eine Zimmernummer eingeben',
    })
    .gt(0, 'Zimmernummer muss größer als 0 sein.'),
  roomType: z.string({
    invalid_type_error: 'Bitte eine Zimmergröße wählen',
  }),
  hasMinibar: z.boolean(),
});

export async function fetchRooms(): Promise<Room[]> {
  return Axios.get<Room[]>(`${BASE_URL}/room/all`)
    .then((res) => res.data)
    .catch((error) => {
      console.error('There was an error fetching rooms', error);
      throw new Error('Failed to fetch rooms');
    });
}

export async function fetchRoomByNumber(
  roomNumber: string | number,
): Promise<Room | undefined> {
  return Axios.get<Room>(`${BASE_URL}/room/${roomNumber}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error(`There was an error fetching room ${roomNumber}`, error);
      throw new Error('Failed to fetch room');
    });
}

export async function createRoom(prevState: State, formData: FormData) {
  const fieldValidation = RoomFormSchema.safeParse({
    roomNumber: formData.get('roomNumber'),
    roomType: formData.get('roomType'),
    hasMinibar: formData.get('hasMinibar') === 'on',
  });
  if (!fieldValidation.success) {
    return <State>{
      errors: fieldValidation.error.flatten().fieldErrors,
      message: 'Bitte Eingaben überprüfen.',
    };
  }
  const room: Room = fieldValidation.data;
  console.log('New room:', room);
  await Axios.post<Room>(`${BASE_URL}/room`, room).catch((error) => {
    console.error('There was an error creating the room', error);
    return {
      message: 'Fehler beim Erstellen des Zimmers',
    };
  });

  // Revalidate the cache for the home page and redirect the user
  revalidatePath('/');
  redirect('/');
}

export async function updateRoom(
  roomNumber: number,
  prevState: State,
  formData: FormData,
) {
  const fieldValidation = RoomFormSchema.safeParse({
    roomNumber: formData.get('roomNumber'),
    roomType: formData.get('roomType'),
    hasMinibar: formData.get('hasMinibar') === 'on',
  });
  if (!fieldValidation.success) {
    return <State>{
      errors: fieldValidation.error.flatten().fieldErrors,
      message: 'Bitte Eingaben überprüfen.',
    };
  }
  const room: Room = fieldValidation.data;
  console.log('Updated room:', room);
  await Axios.put<Room>(`${BASE_URL}/room/${room.roomNumber}`, room).catch(
    (error) => {
      console.error('There was an error updating the room', error);
      return {
        message: 'Fehler beim Aktualisieren des Zimmers',
      };
    },
  );

  // Revalidate the cache for the home page and redirect the user
  revalidatePath('/');
  redirect('/');
}

export async function deleteRoom(roomNumber: number) {
  await Axios.delete(`${BASE_URL}/room/${roomNumber}`).catch((error) => {
    console.error(`There was an error deleting room ${roomNumber}`, error);
    throw new Error('Failed to delete room');
  });
  revalidatePath('/');
}
